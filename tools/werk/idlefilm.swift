// Idle-Film: Stücke (die alle in der Ausgangshaltung beginnen und enden) hintereinander in eine Datei, damit die
// Idle nie die Datei wechselt. Misst danach, wo das Bild der Ausgangshaltung nahe ist (nah-Fenster für content.js).
// Aufruf: idlefilm <ziel.mp4> <referenz.mp4|png> <schwelle> <stück1.mp4> [stück2.mp4 ...]
import AVFoundation
import AppKit
setvbuf(stdout, nil, _IONBF, 0)
let A = CommandLine.arguments
let ziel = A[1], ref = A[2], schwelle = Float(A[3])!
let stuecke = Array(A.dropFirst(4))
func px(_ cg: CGImage) -> [Float] {
  let W = 64, H = 64
  let ctx = CGContext(data: nil, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W*4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  ctx.draw(cg, in: CGRect(x: 0, y: 0, width: W, height: H))
  let p = ctx.data!.assumingMemoryBound(to: UInt8.self)
  return (0..<W*H).map { (Float(p[$0*4]) + Float(p[$0*4+1]) + Float(p[$0*4+2]))/3 }
}
func d(_ a: [Float], _ b: [Float]) -> Float { var s: Float = 0; for i in 0..<a.count { s += abs(a[i]-b[i]) }; return s/Float(a.count) }
func bild(_ p: String, _ t: Double) -> CGImage {
  if p.hasSuffix(".png") { return NSImage(contentsOfFile: p)!.cgImage(forProposedRect: nil, context: nil, hints: nil)! }
  let g = AVAssetImageGenerator(asset: AVURLAsset(url: URL(fileURLWithPath: p)))
  g.requestedTimeToleranceBefore = .zero; g.requestedTimeToleranceAfter = .zero
  return try! g.copyCGImage(at: CMTime(seconds: t, preferredTimescale: 600), actualTime: nil)
}
let comp = AVMutableComposition()
let vt = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
var at = CMTime.zero
var starts: [Double] = []
for s in stuecke {
  let a = AVURLAsset(url: URL(fileURLWithPath: s)); let src = a.tracks(withMediaType: .video)[0]
  starts.append(CMTimeGetSeconds(at))
  try! vt.insertTimeRange(src.timeRange, of: src, at: at); at = CMTimeAdd(at, src.timeRange.duration)
  vt.preferredTransform = src.preferredTransform
}
try? FileManager.default.removeItem(atPath: ziel)
let x = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetHighestQuality)!
x.outputURL = URL(fileURLWithPath: ziel); x.outputFileType = .mp4; x.shouldOptimizeForNetworkUse = true
let sem = DispatchSemaphore(value: 0); x.exportAsynchronously { sem.signal() }; sem.wait()
let D = CMTimeGetSeconds(at)
print((ziel as NSString).lastPathComponent, x.status == .completed ? "ok" : "FAIL", String(format: "%.2f s", D))
print("starts", starts.map { String(format: "%.2f", $0) }.joined(separator: ", "))
// nah-Fenster im fertigen Film messen
let r = px(bild(ref, 0))
var fenster: [(Double, Double)] = []; var offen: Double? = nil
var t = 0.0; var werte = ""
while t < D - 0.04 {
  let v = d(px(bild(ziel, t)), r); werte += String(format: "%.1f ", v)
  if v <= schwelle { if offen == nil { offen = t } } else if let o = offen { fenster.append((o, t - 0.1)); offen = nil }
  t += 0.1
}
if let o = offen { fenster.append((o, D)) }
print("abstand pro 0,1 s:", werte)
print("nah: [" + fenster.filter { $0.1 - $0.0 >= 0.2 }.map { String(format: "[%.1f, %.1f]", $0.0, $0.1) }.joined(separator: ", ") + "]")
