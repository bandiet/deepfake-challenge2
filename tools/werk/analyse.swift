// Clips prüfen: Abstand von erstem/letztem Bild zum Referenzbild, Sprechzeit (Pegel), und ab wann das Bild nach dem
// letzten Wort wieder der Ausgangshaltung nahe ist. Aufruf: analyse <referenz.jpg|png> <clip.mp4> [...]
import AVFoundation
import AppKit
setvbuf(stdout, nil, _IONBF, 0)
let W = 48, H = 85
func px(_ cg: CGImage) -> [Float] {
  let ctx = CGContext(data: nil, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W*4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  ctx.interpolationQuality = .medium; ctx.draw(cg, in: CGRect(x: 0, y: 0, width: W, height: H))
  let p = ctx.data!.assumingMemoryBound(to: UInt8.self)
  return (0..<W*H).map { (Float(p[$0*4]) + Float(p[$0*4+1]) + Float(p[$0*4+2]))/3 }
}
func d(_ a: [Float], _ b: [Float]) -> Float { var s: Float = 0; for i in 0..<a.count { s += abs(a[i]-b[i]) }; return s/Float(a.count) }
let ref = px(NSImage(contentsOfFile: CommandLine.arguments[1])!.cgImage(forProposedRect: nil, context: nil, hints: nil)!)
for pfad in CommandLine.arguments.dropFirst(2) {
  let a = AVURLAsset(url: URL(fileURLWithPath: pfad))
  let vt = a.tracks(withMediaType: .video)[0]
  let r = try! AVAssetReader(asset: a)
  let o = AVAssetReaderTrackOutput(track: vt, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]); r.add(o)
  var at: AVAssetReaderTrackOutput? = nil
  if let t = a.tracks(withMediaType: .audio).first {
    at = AVAssetReaderTrackOutput(track: t, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM, AVLinearPCMBitDepthKey: 16, AVLinearPCMIsFloatKey: false, AVLinearPCMIsBigEndianKey: false, AVNumberOfChannelsKey: 1, AVSampleRateKey: 16000]); r.add(at!)
  }
  r.startReading()
  var ds: [Float] = []
  let ctx = CIContext()
  while let s = o.copyNextSampleBuffer(), let pb = CMSampleBufferGetImageBuffer(s) {
    let ci = CIImage(cvPixelBuffer: pb); ds.append(d(px(ctx.createCGImage(ci, from: ci.extent)!), ref))
  }
  var rms: [Double] = []
  if let at = at {
    var buf: [Int16] = []
    while let s = at.copyNextSampleBuffer(), let bb = CMSampleBufferGetDataBuffer(s) {
      let n = CMBlockBufferGetDataLength(bb); var tmp = [Int16](repeating: 0, count: n/2)
      CMBlockBufferCopyDataBytes(bb, atOffset: 0, dataLength: n, destination: &tmp); buf += tmp
    }
    for i in stride(from: 0, to: buf.count - 1600, by: 1600) { var q = 0.0; for j in i..<i+1600 { q += Double(buf[j])*Double(buf[j]) }; rms.append(sqrt(q/1600)) }
  }
  let fps = Double(vt.nominalFrameRate), dauer = Double(ds.count) / fps
  let laut = rms.enumerated().filter { $0.element > 1500 }.map { Double($0.offset) / 10 }
  let sp0 = laut.first ?? 0, sp1 = (laut.last ?? 0) + 0.1
  // nach dem letzten Wort: erstes Bild, das so nah an der Referenz ist wie das Anfangsbild (+0.8)
  let schwelle = ds[0] + 0.8
  var zurueck = -1.0
  for i in Int(sp1 * fps)..<ds.count where ds[i] <= schwelle { zurueck = Double(i) / fps; break }
  var kurve = ""; var t = 0.0; while t < dauer { kurve += String(format: "%.0f ", ds[min(ds.count-1, Int(t*fps))]); t += 1 }
  print(String(format: "%@  %.1f s %dx%d | Anfang %.1f Ende %.1f max %.1f | Sprache %.1f–%.1f s | zurück in Ausgangshaltung ab %.1f s",
    (pfad as NSString).lastPathComponent, dauer, Int(vt.naturalSize.width), Int(vt.naturalSize.height), ds.first!, ds.last!, ds.max()!, sp0, sp1, zurueck))
  print("   Abstand/s: " + kurve)
}
