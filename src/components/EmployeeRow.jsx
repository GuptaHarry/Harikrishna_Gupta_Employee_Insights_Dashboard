import { useNavigate } from "react-router-dom"

export default function EmployeeRow({ employee, index }) {

  const navigate = useNavigate()

  return (

    <div
      onClick={() => navigate(`/details/${index}`)}

      style={{
        height: "50px",
        display: "grid",
        gridTemplateColumns: "80px 1.5fr 1fr 1fr",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid #f1f5f9",
        cursor: "pointer",
        background: index % 2 === 0 ? "#ffffff" : "#fafafa",
        fontSize: "14px",
        color: "#374151",
        transition: "background 0.2s ease"
      }}

      onMouseEnter={(e)=>{
        e.currentTarget.style.background = "#f1f5f9"
      }}

      onMouseLeave={(e)=>{
        e.currentTarget.style.background =
          index % 2 === 0 ? "#ffffff" : "#fafafa"
      }}

    >

      {/* ID */}
      <div
        style={{
          fontWeight: "500",
          color: "#6b7280"
        }}
      >
        {index + 1}
      </div>

      {/* Name */}
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontWeight: "500"
        }}
      >
        {employee[0]}
      </div>

      {/* City */}
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#4b5563"
        }}
      >
        {employee[2]}
      </div>

      {/* Salary */}
      <div
        style={{
          textAlign: "left",
          fontWeight: "500",
          color: "#111827"
        }}
      >
        {employee[5]}
      </div>

    </div>

  )
}
