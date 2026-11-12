// Sofia fake (c9) aus den Grok-Clips (werk/grok-sofia3): Bild stumm auf 540×960, Stimme als m4a.
// c9_0 = S1a bis kurz nach dem letzten Wort (Schnitt, 0,25 s überblendet) + S1b. Danach: bitrate.swift + idlefilm.swift.
import AVFoundation
setvbuf(stdout, nil, _IONBF, 0)
let W = "/Users/arnebenoist/Documents/Claude Code/Deepfake Challenge/werk/grok-sofia3/"
let P = "/Users/arnebenoist/Documents/Claude Code/Deepfake Challenge/DeepfakeChallenge_v2/assets/"
let schnittS1a = Double(CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "8.0")!
let s = { (x: Double) in CMTime(seconds: x, preferredTimescale: 6000) }
func exportiere(_ a: AVAsset, _ vc: AVVideoComposition?, _ preset: String, _ type: AVFileType, _ out: String) {
  try? FileManager.default.removeItem(atPath: out)
  let x = AVAssetExportSession(asset: a, presetName: preset)!
  x.outputURL = URL(fileURLWithPath: out); x.outputFileType = type; x.shouldOptimizeForNetworkUse = true
  if let vc = vc { x.videoComposition = vc }
  let sem = DispatchSemaphore(value: 0); x.exportAsynchronously { sem.signal() }; sem.wait()
  print((out as NSString).lastPathComponent, x.status == .completed ? "ok" : "FAIL")
}
func nur(_ a: AVAsset, _ typ: AVMediaType) -> AVMutableComposition {
  let c = AVMutableComposition(); let src = a.tracks(withMediaType: typ)[0]
  let t = c.addMutableTrack(withMediaType: typ, preferredTrackID: kCMPersistentTrackID_Invalid)!
  try! t.insertTimeRange(src.timeRange, of: src, at: .zero); return c
}
let einzeln = [("c9_1a", "c9_R1A"), ("c9_1b", "c9_R1B"), ("c9_2a", "c9_R2A"), ("c9_2b", "c9_R2B_take2"), ("c9_idle1", "c9_IDLE1"), ("c9_idle2", "c9_IDLE2")]
for (id, quelle) in einzeln {
  let a = AVURLAsset(url: URL(fileURLWithPath: W + quelle + ".mp4"))
  let ziel = id.hasPrefix("c9_idle") ? W + id + "_540.mp4" : P + "video/\(id).mp4"
  exportiere(nur(a, .video), nil, AVAssetExportPreset960x540, .mp4, ziel)
  if !id.hasPrefix("c9_idle") { exportiere(nur(a, .audio), nil, AVAssetExportPresetAppleM4A, .m4a, P + "stem/\(id).m4a") }
}
// Eröffnung: S1a [0, Schnitt] + S1b, 0,25 s überblendet
let a1 = AVURLAsset(url: URL(fileURLWithPath: W + "c9_S1a.mp4")), a2 = AVURLAsset(url: URL(fileURLWithPath: W + "c9_S1b.mp4"))
let v1 = a1.tracks(withMediaType: .video)[0], v2 = a2.tracks(withMediaType: .video)[0]
let fade = s(0.25), cut = s(schnittS1a), start2 = CMTimeSubtract(cut, fade)
let comp = AVMutableComposition()
let t1 = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
let t2 = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
try! t1.insertTimeRange(CMTimeRange(start: .zero, duration: cut), of: v1, at: .zero)
try! t2.insertTimeRange(v2.timeRange, of: v2, at: start2)
let total = CMTimeAdd(start2, v2.timeRange.duration)
let ins = AVMutableVideoCompositionInstruction(); ins.timeRange = CMTimeRange(start: .zero, duration: total)
let l1 = AVMutableVideoCompositionLayerInstruction(assetTrack: t1); l1.setOpacityRamp(fromStartOpacity: 1, toEndOpacity: 0, timeRange: CMTimeRange(start: start2, duration: fade))
let l2 = AVMutableVideoCompositionLayerInstruction(assetTrack: t2)
ins.layerInstructions = [l1, l2]
let vc = AVMutableVideoComposition(); vc.renderSize = v1.naturalSize; vc.frameDuration = CMTime(value: 1, timescale: 24); vc.instructions = [ins]
exportiere(comp, vc, AVAssetExportPreset960x540, .mp4, P + "video/c9_0.mp4")
let ac = AVMutableComposition()
let at1 = ac.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
let at2 = ac.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
try! at1.insertTimeRange(CMTimeRange(start: .zero, duration: start2), of: a1.tracks(withMediaType: .audio)[0], at: .zero)
try! at2.insertTimeRange(a2.tracks(withMediaType: .audio)[0].timeRange, of: a2.tracks(withMediaType: .audio)[0], at: start2)
exportiere(ac, nil, AVAssetExportPresetAppleM4A, .m4a, P + "stem/c9_0.m4a")
print("c9_0", CMTimeGetSeconds(total), "s")
