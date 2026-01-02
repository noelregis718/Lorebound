export async function recordAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const mediaRecorder = new MediaRecorder(stream)
  const chunks: BlobPart[] = []

  mediaRecorder.ondataavailable = e => chunks.push(e.data)
  mediaRecorder.start()

  return {
    stop: () =>
      new Promise<Blob>((resolve) => {
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/webm" })
          resolve(blob)
        }
        mediaRecorder.stop()
      })
  }
}
