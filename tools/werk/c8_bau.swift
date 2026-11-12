// Sofia echt (c8) aus den Grok-Clips (werk/grok-sofia-echt): Bild stumm auf 960×540, Stimme als m4a. Danach idlefilm + bitrate.
// c9_0 = S1a bis kurz nach dem letzten Wort (Schnitt, 0,25 s überblendet) + S1b. Danach: bitrate.swift + idlefilm.swift.
import AVFoundation
setvbuf(stdout, nil, _IONBF, 0)
let W = "/Users/arnebenoist/Documents/Claude Code/Deepfake Challenge/werk/grok-sofia-echt/"
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
let einzeln = [("c8_0", "c8_S1"), ("c8_1a", "c8_R1A"), ("c8_1b", "c8_R1B"), ("c8_2a", "c8_R2A"), ("c8_2b", "c8_R2B"), ("c8_idle1", "c8_IDLE1"), ("c8_idle2", "c8_IDLE2")]
for (id, quelle) in einzeln {
  let a = AVURLAsset(url: URL(fileURLWithPath: W + quelle + ".mp4"))
  let ziel = id.hasPrefix("c8_idle") ? W + id + "_540.mp4" : P + "video/\(id).mp4"
  exportiere(nur(a, .video), nil, AVAssetExportPreset960x540, .mp4, ziel)
  if !id.hasPrefix("c8_idle") { exportiere(nur(a, .audio), nil, AVAssetExportPresetAppleM4A, .m4a, P + "stem/\(id).m4a") }
}
// Intro: der Vlog-Clip läuft stumm im Player
exportiere(nur(AVURLAsset(url: URL(fileURLWithPath: W + "../intro_vlog.mp4")), .video), nil, AVAssetExportPreset960x540, .mp4, P + "video/intro-vlog.mp4")
