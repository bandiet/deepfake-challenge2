// Video neu kodieren mit fester Bitrate (H.264, ohne Ton, faststart). Aufruf: bitrate <kbit/s> <datei.mp4> [...]
// (überschreibt die Dateien; AVAssetExportSession-Presets wählen für kleine Formate unnötig hohe Bitraten)
import AVFoundation
setvbuf(stdout, nil, _IONBF, 0)
let kbps = Int(CommandLine.arguments[1])!
for pfad in CommandLine.arguments.dropFirst(2) {
  let url = URL(fileURLWithPath: pfad), tmp = URL(fileURLWithPath: pfad + ".tmp.mp4")
  try? FileManager.default.removeItem(at: tmp)
  let a = AVURLAsset(url: url); let t = a.tracks(withMediaType: .video)[0]
  let r = try! AVAssetReader(asset: a)
  let o = AVAssetReaderTrackOutput(track: t, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange])
  r.add(o)
  let w = try! AVAssetWriter(outputURL: tmp, fileType: .mp4); w.shouldOptimizeForNetworkUse = true
  let size = t.naturalSize
  let i = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: Int(size.width), AVVideoHeightKey: Int(size.height),
    AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: kbps * 1000, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel, AVVideoMaxKeyFrameIntervalKey: 25]])
  i.transform = t.preferredTransform; i.expectsMediaDataInRealTime = false
  w.add(i); r.startReading(); w.startWriting(); w.startSession(atSourceTime: .zero)
  let sem = DispatchSemaphore(value: 0)
  i.requestMediaDataWhenReady(on: DispatchQueue(label: "q")) {
    while i.isReadyForMoreMediaData {
      if let s = o.copyNextSampleBuffer() { i.append(s) } else { i.markAsFinished(); w.finishWriting { sem.signal() }; return }
    }
  }
  sem.wait()
  let vor = (try! FileManager.default.attributesOfItem(atPath: pfad)[.size] as! Int)
  if w.status == .completed { try! FileManager.default.removeItem(at: url); try! FileManager.default.moveItem(at: tmp, to: url) }
  let nach = (try! FileManager.default.attributesOfItem(atPath: pfad)[.size] as! Int)
  print((pfad as NSString).lastPathComponent, w.status == .completed ? "ok" : "FAIL", vor / 1000, "→", nach / 1000, "KB")
}
