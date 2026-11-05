import AVFoundation
import AppKit
setvbuf(stdout, nil, _IONBF, 0)
let E = "/Users/arnebenoist/Documents/Claude Code/Deepfake Challenge/werk/echt/"
let O = E + "overgang/"
let P = "/Users/arnebenoist/Documents/Claude Code/Deepfake Challenge/DeepfakeChallenge_v2/assets/"
let R = CGSize(width: 448, height: 780)          // gemeinsames Format: Aurora-Clips oben/unten um 26 px beschnitten
let s = { (x: Double) in CMTime(seconds: x, preferredTimescale: 2400) }
func exportiere(_ a: AVAsset, _ vc: AVVideoComposition?, _ preset: String, _ type: AVFileType, _ out: String) {
  try? FileManager.default.removeItem(atPath: out)
  let x = AVAssetExportSession(asset: a, presetName: preset)!
  x.outputURL = URL(fileURLWithPath: out); x.outputFileType = type; x.shouldOptimizeForNetworkUse = true
  if let vc = vc { x.videoComposition = vc }
  let sem = DispatchSemaphore(value: 0); x.exportAsynchronously { sem.signal() }; sem.wait()
  print((out as NSString).lastPathComponent, x.status == .completed ? "ok" : "FAIL \(String(describing: x.error))")
}
let clipT = CGAffineTransform(translationX: 0, y: -26)
let k = 448.0 / 496.0
let seedT = CGAffineTransform(scaleX: k, y: k)
// Clip + Übergang (0,12 s überblendet)
for id in ["c10_0", "c10_1a", "c10_1b", "c10_2a", "c10_2b"] {
  let ca = AVURLAsset(url: URL(fileURLWithPath: E + "v_\(id).mp4")), ua = AVURLAsset(url: URL(fileURLWithPath: O + "u_\(id).mp4"))
  let cs = ca.tracks(withMediaType: .video)[0], us = ua.tracks(withMediaType: .video)[0]
  let comp = AVMutableComposition()
  let t1 = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
  let t2 = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
  let cd = cs.timeRange.duration, ud = us.timeRange.duration
  let fade = s(0.12)
  try! t1.insertTimeRange(cs.timeRange, of: cs, at: .zero)
  let uStart = CMTimeSubtract(cd, fade)
  try! t2.insertTimeRange(us.timeRange, of: us, at: uStart)
  let total = CMTimeAdd(uStart, ud)
  let ins = AVMutableVideoCompositionInstruction(); ins.timeRange = CMTimeRange(start: .zero, duration: total)
  let l1 = AVMutableVideoCompositionLayerInstruction(assetTrack: t1); l1.setTransform(clipT, at: .zero)
  l1.setOpacityRamp(fromStartOpacity: 1, toEndOpacity: 0, timeRange: CMTimeRange(start: uStart, duration: fade))
  let l2 = AVMutableVideoCompositionLayerInstruction(assetTrack: t2); l2.setTransform(seedT, at: .zero)
  ins.layerInstructions = [l1, l2]
  let vc = AVMutableVideoComposition(); vc.renderSize = R; vc.frameDuration = CMTime(value: 1, timescale: 25); vc.instructions = [ins]
  exportiere(comp, vc, AVAssetExportPresetHighestQuality, .mp4, P + "video/\(id).mp4")
  print("  clip", CMTimeGetSeconds(cd), "gesamt", CMTimeGetSeconds(total))
}
// Idle-Stücke: skaliert, stumm; das Hüsteln als eigener Ton
for (n, f) in [("c10_idleA", "idleA"), ("c10_idleB", "idleB")] {
  let a = AVURLAsset(url: URL(fileURLWithPath: O + f + ".mp4"))
  let src = a.tracks(withMediaType: .video)[0]
  let comp = AVMutableComposition()
  let t = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
  try! t.insertTimeRange(src.timeRange, of: src, at: .zero)
  let ins = AVMutableVideoCompositionInstruction(); ins.timeRange = CMTimeRange(start: .zero, duration: src.timeRange.duration)
  let l = AVMutableVideoCompositionLayerInstruction(assetTrack: t); l.setTransform(seedT, at: .zero); ins.layerInstructions = [l]
  let vc = AVMutableVideoComposition(); vc.renderSize = R; vc.frameDuration = CMTime(value: 1, timescale: 25); vc.instructions = [ins]
  exportiere(comp, vc, AVAssetExportPresetHighestQuality, .mp4, P + "video/\(n).mp4")
  if let at = a.tracks(withMediaType: .audio).first {
    let ac = AVMutableComposition()
    let tt = ac.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
    try! tt.insertTimeRange(at.timeRange, of: at, at: .zero)
    exportiere(ac, nil, AVAssetExportPresetAppleM4A, .m4a, P + "stem/\(n).m4a")
  }
}
