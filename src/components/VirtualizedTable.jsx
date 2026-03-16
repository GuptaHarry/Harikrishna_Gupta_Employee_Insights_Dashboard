import { useRef, useState } from "react"
import EmployeeRow from "./EmployeeRow"

export default function VirtualizedTable({ data }) {

  const containerRef = useRef()

  const [scrollTop, setScrollTop] = useState(0)

  const rowHeight = 50
  const containerHeight = 500

  const rows = Array.isArray(data) ? data : []

  const totalHeight = rows.length * rowHeight

  const startIndex = Math.floor(scrollTop / rowHeight)

  const visibleCount = Math.ceil(containerHeight / rowHeight)

  const buffer = 5

  const endIndex = startIndex + visibleCount + buffer

  const visibleRows = rows.slice(startIndex, endIndex)

  return (

    <div
      style={{
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #e5e7eb"
      }}
    >

      {/* Table Header */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1.5fr 1fr 1fr",
          padding: "14px 16px",
          background: "#f9fafb",
          fontWeight: "600",
          fontSize: "14px",
          color: "#374151",
          borderBottom: "1px solid #e5e7eb"
        }}
      >
        <div>ID</div>
        <div>Name</div>
        <div>City</div>
        <div>Salary</div>
      </div>


      {/* Scroll Container */}

      <div
        ref={containerRef}
        style={{
          height: containerHeight,
          overflowY: "auto",
          background: "white"
        }}
        onScroll={(e) => setScrollTop(e.target.scrollTop)}
      >

        <div style={{ height: totalHeight, position: "relative" }}>

          <div
            style={{
              transform: `translateY(${startIndex * rowHeight}px)`
            }}
          >

            {visibleRows.map((emp, index) => {

              const actualIndex = startIndex + index

              return (
                <EmployeeRow
                  key={actualIndex}
                  index={actualIndex}
                  employee={emp}
                />
              )

            })}

          </div>

        </div>

      </div>

    </div>

  )
}
