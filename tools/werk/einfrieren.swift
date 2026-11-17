// Kurze Stelle in einem Clip durch ein Standbild ersetzen (z. B. ein zu schnelles Blinzeln), Länge bleibt gleich.
// Aufruf: einfrieren <ein.mp4> <aus.mp4> <von s> <bis s> [kbps]  – das Bild bei <von> wird bis <bis> gehalten
import AVFoundation
let A = CommandLine.arguments
let a = AVURLAsset(url: URL(fileURLWithPath: A[1])), von = Double(A[3])!, bis = Double(A[4])!
let kbps = A.count > 5 ? Int(A[5])! : 900
let src = a.tracks(withMediaType: .video)[0], gr = src.naturalSize
let r = try! AVAssetReader(asset: a)
let ro = AVAssetReaderTrackOutput(track: src, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]); r.add(ro)
try? FileManager.default.removeItem(atPath: A[2])
let w = try! AVAssetWriter(outputURL: URL(fileURLWithPath: A[2]), fileType: .mp4); w.shouldOptimizeForNetworkUse = true
let wi = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: gr.width, AVVideoHeightKey: gr.height,
  AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: kbps * 1000, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel]])
wi.transform = src.preferredTransform
let ad = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: wi, sourcePixelBufferAttributes: nil); w.add(wi)
r.startReading(); w.startWriting(); w.startSession(atSourceTime: .zero)
var halt: CVPixelBuffer? = nil, n = 0, ersetzt = 0
while let sb = ro.copyNextSampleBuffer() {
  let t = CMSampleBufferGetPresentationTimeStamp(sb), s = CMTimeGetSeconds(t)
  var pb = CMSampleBufferGetImageBuffer(sb)!
  if s >= von - 0.001 && s < bis - 0.001 { if halt == nil { halt = pb } else { pb = halt!; ersetzt += 1 } }
  while !wi.isReadyForMoreMediaData { usleep(2000) }
  ad.append(pb, withPresentationTime: t); n += 1
}
wi.markAsFinished(); let sem = DispatchSemaphore(value: 0); w.finishWriting { sem.signal() }; sem.wait()
print(w.status == .completed ? "ok" : "FAIL \(String(describing: w.error))", n, "Bilder,", ersetzt, "ersetzt")
