import { useRef, useState } from "react"

export default function SignatureCanvas({setSignature}){

  const canvasRef = useRef()

  const [drawing,setDrawing] = useState(false)

  const start = (e) => {

    setDrawing(true)

    const ctx = canvasRef.current.getContext("2d")

    ctx.beginPath()

    ctx.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY)
  }

  const draw = (e) => {

    if(!drawing) return

    const ctx = canvasRef.current.getContext("2d")

    ctx.lineTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY)

    ctx.stroke()
  }

  const stop = () => {

    setDrawing(false)

    const image = canvasRef.current.toDataURL()

    setSignature(image)
  }

  return(

    <div>

      <h3>Sign Here</h3>

      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{border:"1px solid black"}}

        onMouseDown={start}
        onMouseMove={draw}
        onMouseUp={stop}
      />

    </div>
  )
}
