import { useEffect, useState } from "react"
import SalaryChart from "../components/SalaryChart"
import CityMap from "../components/CityMap";

export default function Analytics(){

  const [auditImage,setAuditImage] = useState(null)
  const [employees,setEmployees] = useState([])

  useEffect(()=>{

    const img = localStorage.getItem("auditImage")

    if(img){
      function SetAuditImage (){
      setAuditImage(img);
      }
      SetAuditImage();
    }

    const data = localStorage.getItem("employees")

    if(data){
      function SetEmployees (){
      setEmployees(JSON.parse(data));
    }
    SetEmployees();
  }

  },[])

  return(

    <div
      style={{
        minHeight:"100vh",
        background:"#f5f7fb",
        padding:"40px",
        fontFamily:"Arial"
      }}
    >

      {/* Page Container */}

      <div
        style={{
          maxWidth:"1100px",
          margin:"auto"
        }}
      >

        {/* Page Title */}

        <h1
          style={{
            fontSize:"26px",
            fontWeight:"600",
            marginBottom:"30px",
            color:"#1f2937"
          }}
        >
          Employee Analytics Dashboard
        </h1>


        {/* Audit Image Card */}

        {auditImage && (

          <div
            style={{
              background:"white",
              padding:"25px",
              borderRadius:"10px",
              boxShadow:"0 4px 12px rgba(0,0,0,0.08)",
              marginBottom:"30px"
            }}
          >

            <h3
              style={{
                marginBottom:"15px",
                color:"#374151"
              }}
            >
              Verification Audit Image
            </h3>

            <img
              src={auditImage}
              alt="audit"
              style={{
                width:"350px",
                borderRadius:"8px",
                border:"1px solid #e5e7eb"
              }}
            />

          </div>

        )}


        {/* Salary Chart Card */}

        <div
          style={{
            background:"white",
            padding:"25px",
            borderRadius:"10px",
            boxShadow:"0 4px 12px rgba(0,0,0,0.08)",
            marginBottom:"30px"
          }}
        >

          <SalaryChart employees={employees}/>

        </div>


        {/* Map Card */}

        <div
          style={{
            background:"white",
            padding:"25px",
            borderRadius:"10px",
            boxShadow:"0 4px 12px rgba(0,0,0,0.08)"
          }}
        >

          <h3
            style={{
              marginBottom:"15px",
              color:"#374151"
            }}
          >
            Employee Locations
          </h3>

          <CityMap employees={employees}/>

        </div>

      </div>

    </div>

  )
}
