// Gesichtsbewegung aus einem Video lesen (Apple Vision), z. B. Markus in der rechten Hälfte von intro-live.mp4.
// Aufruf: gesicht_spur <video.mp4> <x0 0..1> <x1 0..1> <aus.json>   – nur der Bildausschnitt x0..x1 wird ausgewertet
// Je Bild: Mitte, Größe, Neigung (roll), Drehung (yaw), Nicken (pitch), Mund offen, Augen offen, Brauen, Lächeln
import AVFoundation
import Vision
let A = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: A[1])), x0 = CGFloat(Double(A[2])!), x1 = CGFloat(Double(A[3])!)
let track = asset.tracks(withMediaType: .video)[0], fps = Double(track.nominalFrameRate)
let r = try! AVAssetReader(asset: asset)
let o = AVAssetReaderTrackOutput(track: track, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]); r.add(o); r.startReading()
var bilder: [[Double]] = []
func mitte(_ p: [CGPoint]) -> CGPoint { CGPoint(x: p.map(\.x).reduce(0, +) / CGFloat(p.count), y: p.map(\.y).reduce(0, +) / CGFloat(p.count)) }
func hoehe(_ p: [CGPoint]) -> CGFloat { (p.map(\.y).max() ?? 0) - (p.map(\.y).min() ?? 0) }
func breite(_ p: [CGPoint]) -> CGFloat { (p.map(\.x).max() ?? 0) - (p.map(\.x).min() ?? 0) }
while let sb = o.copyNextSampleBuffer() {
  let pb = CMSampleBufferGetImageBuffer(sb)!
  let w = CGFloat(CVPixelBufferGetWidth(pb)), h = CGFloat(CVPixelBufferGetHeight(pb))
  let req = VNDetectFaceLandmarksRequest(), rq = VNDetectFaceRectanglesRequest()
  rq.revision = VNDetectFaceRectanglesRequestRevision3
  req.regionOfInterest = CGRect(x: x0, y: 0, width: x1 - x0, height: 1); rq.regionOfInterest = req.regionOfInterest
  try? VNImageRequestHandler(cvPixelBuffer: pb, options: [:]).perform([req, rq])
  guard let f = req.results?.first, let lm = f.landmarks else { bilder.append(bilder.last ?? []); continue }
  let fr = rq.results?.first
  // Punkte in Pixeln des Ausschnitts (y nach unten)
  let roiW = (x1 - x0) * w
  func px(_ r: VNFaceLandmarkRegion2D?) -> [CGPoint] {
    guard let r = r else { return [] }
    return r.pointsInImage(imageSize: CGSize(width: roiW, height: h)).map { CGPoint(x: $0.x, y: h - $0.y) }
  }
  let bb = f.boundingBox   // relativ zum Ausschnitt
  let fh = bb.height * h, fw = bb.width * roiW
  let aL = px(lm.leftEye), aR = px(lm.rightEye), bL = px(lm.leftEyebrow), bR = px(lm.rightEyebrow), lipI = px(lm.innerLips), lipO = px(lm.outerLips), nase = px(lm.noseCrest)
  let augen = mitte(aL + aR), brauen = mitte(bL + bR)
  bilder.append([
    Double((bb.midX * roiW) / roiW), Double(1 - bb.midY), Double(bb.height),
    Double(atan2(mitte(aL).y - mitte(aR).y, mitte(aL).x - mitte(aR).x)), Double(truncating: fr?.yaw ?? 0), Double(truncating: fr?.pitch ?? 0),
    Double(hoehe(lipI) / fh), Double(hoehe(aL) / fh), Double(hoehe(aR) / fh),
    Double((augen.y - brauen.y) / fh), Double(breite(lipO) / fw),
    Double((mitte(nase).x - augen.x) / fw)
  ])
}
let felder = ["x", "y", "gr", "roll", "yaw", "pitch", "mund", "augeL", "augeR", "braue", "breite", "nase"]
let rund = bilder.map { $0.map { (($0 * 1000).rounded() / 1000) } }
let json: [String: Any] = ["fps": fps, "felder": felder, "bilder": rund]
try! JSONSerialization.data(withJSONObject: json).write(to: URL(fileURLWithPath: A[4]))
print(bilder.count, "Bilder,", bilder.filter { $0.isEmpty }.count, "ohne Gesicht")
