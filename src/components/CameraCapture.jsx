import { useEffect, useRef, useState } from "react"

export default function CameraCapture({ setPhoto }) {

  const videoRef = useRef()

  const [preview, setPreview] = useState(null)
  const [flash, setFlash] = useState(false)

  useEffect(() => {

    async function startCamera() {

      try {

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        })

        videoRef.current.srcObject = stream

      } catch (err) {
        console.error("Camera access error:", err)
      }

    }

    startCamera()

  }, [])


  const capture = () => {

    const video = videoRef.current

    const canvas = document.createElement("canvas")

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")

    ctx.drawImage(video, 0, 0)

    const image = canvas.toDataURL("image/png")

    setPhoto(image)
    setPreview(image)

    // Flash effect
    setFlash(true)
    setTimeout(() => setFlash(false), 150)

  }


  return (

    <div>

      {/* Camera Container */}

      <div
        style={{
          width: "420px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          position: "relative",
          background: "#000"
        }}
      >

        <video
          ref={videoRef}
          autoPlay
          style={{
            width: "100%",
            display: "block"
          }}
        />

        {/* Flash Effect */}

        {flash && (

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "white",
              opacity: 0.7
            }}
          />

        )}

      </div>


      {/* Capture Button */}

      <button
        onClick={capture}
        style={{
          marginTop: "12px",
          padding: "8px 14px",
          borderRadius: "6px",
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500"
        }}
      >
        Capture Photo
      </button>


      {/* Confirmation */}

      {preview && (

        <div style={{ marginTop: "16px" }}>

          <div
            style={{
              color: "#16a34a",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px"
            }}
          >
            ✅ Photo captured successfully
          </div>

          <img
            src={preview}
            alt="captured"
            style={{
              width: "200px",
              borderRadius: "6px",
              border: "1px solid #ddd"
            }}
          />

        </div>

      )}

    </div>

  )
}
