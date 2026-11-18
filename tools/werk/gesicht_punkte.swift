// Gesichtspunkte je Bild (Apple Vision) aus einem Bildausschnitt, für ein Messnetz, das dem Gesicht folgt.
// Aufruf: gesicht_punkte <video.mp4> <x0 0..1> <x1 0..1> <aufhellen EV> <aus.json>
// Dunkle Aufnahmen werden vor der Erkennung aufgehellt. Ausgabe: je Bild die Punkte (x, y relativ zum Ausschnitt, y nach unten)
// oder null, wenn kein Gesicht gefunden wurde.
import AVFoundation
import Vision
import CoreImage
let A = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: A[1])), x0 = CGFloat(Double(A[2])!), x1 = CGFloat(Double(A[3])!), ev = Double(A[4])!
let track = asset.tracks(withMediaType: .video)[0], fps = Double(track.nominalFrameRate)
let r = try! AVAssetReader(asset: asset)
let o = AVAssetReaderTrackOutput(track: track, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]); r.add(o); r.startReading()
let ctx = CIContext()
var bilder: [Any] = [], treffer = 0
while let sb = o.copyNextSampleBuffer() {
  let pb = CMSampleBufferGetImageBuffer(sb)!
  let w = CGFloat(CVPixelBufferGetWidth(pb)), h = CGFloat(CVPixelBufferGetHeight(pb))
  let roi = CGRect(x: x0 * w, y: 0, width: (x1 - x0) * w, height: h)
  let bild = CIImage(cvPixelBuffer: pb).cropped(to: roi).transformed(by: CGAffineTransform(translationX: -roi.minX, y: 0))
    .applyingFilter("CIExposureAdjust", parameters: [kCIInputEVKey: ev])
  let cg = ctx.createCGImage(bild, from: CGRect(origin: .zero, size: roi.size))!
  let req = VNDetectFaceLandmarksRequest()
  try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
  guard let f = req.results?.first, let lm = f.landmarks, let alle = lm.allPoints else { bilder.append(NSNull()); continue }
  treffer += 1
  let p = alle.pointsInImage(imageSize: roi.size).map { [Double(($0.x / roi.width * 1000).rounded()) / 1000, Double(((roi.height - $0.y) / roi.height * 1000).rounded()) / 1000] }
  bilder.append(p)
}
let aus: [String: Any] = ["fps": fps, "bilder": bilder]
try! JSONSerialization.data(withJSONObject: aus).write(to: URL(fileURLWithPath: A[5]))
print(bilder.count, "Bilder,", treffer, "mit Gesicht")
