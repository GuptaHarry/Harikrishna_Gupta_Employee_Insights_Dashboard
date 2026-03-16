import { useState } from "react"
import CameraCapture from "../components/CameraCapture"
import SignatureCanvas from "../components/SignatrueCanvas"
import { mergeImages } from "../utils/mergeImage"
import { useNavigate } from "react-router-dom"

export default function Details(){

  const [photo,setPhoto] = useState(null)
  const [signature,setSignature] = useState(null)

  const navigate = useNavigate()

  const handleMerge = async () => {

    if(!photo || !signature){
      alert("Capture photo and sign first")
      return
    }

    const merged = await mergeImages(photo,signature)

    localStorage.setItem("auditImage",merged)

    navigate("/analytics")
  }

  return(

    <div
      style={{
        minHeight:"100vh",
        background:"#f5f7fb",
        padding:"20px"
      }}
    >

      <div
        style={{
          maxWidth:"900px",
          margin:"auto"
        }}
      >

        <h1
          style={{
            fontSize:"26px",
            fontWeight:"600",
            marginBottom:"20px",
            color:"#1f2937"
          }}
        >
          Employee Identity Verification
        </h1>

        {/* Verification Card */}

        <div
          style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            boxShadow:"0 4px 12px rgba(0,0,0,0.08)"
          }}
        >

          {/* Step 1 */}
          <div style={{marginBottom:"40px"}}>

            <h3
              style={{
                marginBottom:"12px",
                fontSize:"18px",
                color:"#374151"
              }}
            >
              Step 1 — Capture Photo
            </h3>

            <CameraCapture setPhoto={setPhoto}/>

          </div>


          {/* Step 2 */}
          <div style={{marginBottom:"40px"}}>

            <h3
              style={{
                marginBottom:"12px",
                fontSize:"18px",
                color:"#374151"
              }}
            >
              Step 2 — Sign Below
            </h3>

            <SignatureCanvas setSignature={setSignature}/>

          </div>


          {/* Button */}

          <div style={{textAlign:"right"}}>

            <button
              onClick={handleMerge}
              style={{
                background:"#2563eb",
                color:"white",
                padding:"10px 18px",
                border:"none",
                borderRadius:"6px",
                cursor:"pointer",
                fontSize:"14px",
                fontWeight:"500"
              }}
            >
              Generate Audit Image
            </button>

          </div>

        </div>

      </div>

    </div>

  )
}
