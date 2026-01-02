export async function uploadAudio(
  blob: Blob,
  roomId: string,
  userId: string
) {
  const formData = new FormData()
  formData.append("file", blob)

  const res = await fetch(
    `http://localhost:8000/upload-audio?room_id=${roomId}&user_id=${userId}`,
    { method: "POST", body: formData }
  )

  return res.json()
}
