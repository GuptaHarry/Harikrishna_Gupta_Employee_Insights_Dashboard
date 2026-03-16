export const mergeImages = (photo,signature) => {

  return new Promise((resolve)=>{

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    const img1 = new Image()

    img1.src = photo

    img1.onload = () => {

      canvas.width = img1.width
      canvas.height = img1.height

      ctx.drawImage(img1,0,0)

      const img2 = new Image()

      img2.src = signature

      img2.onload = () => {

        ctx.drawImage(img2,0,0)

        resolve(canvas.toDataURL("image/png"))
      }
    }

  })
}
