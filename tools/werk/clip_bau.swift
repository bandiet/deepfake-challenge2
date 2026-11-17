// Einen Grok-Clip einbauen: Bild stumm (verkleinert auf höchstens 960×540 bzw. 540×960), Stimme als m4a.
// Aufruf: clip_bau <quelle.mp4> <assets-ordner> <id> [nurbild]   → <assets>/video/<id>.mp4 und <assets>/stem/<id>.m4a
// Danach: bitrate 900 <assets>/video/<id>.mp4
import AVFoundation
let A = CommandLine.arguments
let a = AVURLAsset(url: URL(fileURLWithPath: A[1])), P = A[2] + "/", id = A[3], nurBild = A.count > 4
func exportiere(_ a: AVAsset, _ preset: String, _ type: AVFileType, _ out: String) {
  try? FileManager.default.removeItem(atPath: out)
  let x = AVAssetExportSession(asset: a, presetName: preset)!
  x.outputURL = URL(fileURLWithPath: out); x.outputFileType = type; x.shouldOptimizeForNetworkUse = true
  let sem = DispatchSemaphore(value: 0); x.exportAsynchronously { sem.signal() }; sem.wait()
  print((out as NSString).lastPathComponent, x.status == .completed ? "ok" : "FAIL \(String(describing: x.error))")
}
func nur(_ typ: AVMediaType) -> AVMutableComposition {
  let c = AVMutableComposition(); let src = a.tracks(withMediaType: typ)[0]
  let t = c.addMutableTrack(withMediaType: typ, preferredTrackID: kCMPersistentTrackID_Invalid)!
  try! t.insertTimeRange(src.timeRange, of: src, at: .zero); return c
}
exportiere(nur(.video), AVAssetExportPreset960x540, .mp4, P + "video/\(id).mp4")
if !nurBild { exportiere(nur(.audio), AVAssetExportPresetAppleM4A, .m4a, P + "stem/\(id).m4a") }
