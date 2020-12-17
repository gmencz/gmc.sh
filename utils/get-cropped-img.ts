import { Crop } from 'react-image-crop'

function getCroppedImg(image: HTMLImageElement, crop: Crop): Promise<string> {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width as number
  canvas.height = crop.height as number
  const ctx = canvas.getContext('2d')

  ctx?.drawImage(
    image,
    (crop.x as number) * scaleX,
    (crop.y as number) * scaleY,
    (crop.width as number) * scaleX,
    (crop.height as number) * scaleY,
    0,
    0,
    crop.width as number,
    crop.height as number,
  )

  let objectURL: string
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('Canvas is empty'))
        return
      }

      objectURL = window.URL.createObjectURL(blob)
      resolve(objectURL)
    }, 'image/jpeg')
  })
}

export { getCroppedImg }
