export default function SalaryChart({employees}){

  if(!employees.length) return null

  const citySalary = {}

  employees.forEach(emp=>{

    const city = emp[2]

    const salary = parseInt(
      emp[5].replace(/[$,]/g,"")
    )

    if(!citySalary[city]){
      citySalary[city] = 0
    }

    citySalary[city] += salary

  })

  const cities = Object.keys(citySalary)

  const maxSalary = Math.max(...Object.values(citySalary))

  const barWidth = 60
  const chartHeight = 260
  const chartWidth = 700

  return(

    <div
      style={{
        width:"100%",
        textAlign:"center"
      }}
    >

      <h3
        style={{
          marginBottom:"20px",
          color:"#374151"
        }}
      >
        Salary Distribution by City
      </h3>


      <svg width={chartWidth} height="320">

        {/* baseline */}

        <line
          x1="40"
          y1={chartHeight}
          x2={chartWidth}
          y2={chartHeight}
          stroke="#e5e7eb"
        />

        {cities.map((city,index)=>{

          const value = citySalary[city]

          const barHeight =
            (value / maxSalary) * chartHeight

          const x = index * 90 + 60

          return(

            <g key={city}>

              {/* Bar */}

              <rect
                x={x}
                y={chartHeight - barHeight}
                width={barWidth}
                height={barHeight}
                rx="6"
                fill="#3b82f6"
              />

              {/* Salary Label */}

              <text
                x={x + barWidth/2}
                y={chartHeight - barHeight - 8}
                textAnchor="middle"
                fontSize="11"
                fill="#374151"
              >
                ${Math.round(value/1000)}k
              </text>

              {/* City Label */}

              <text
                x={x + barWidth/2}
                y={chartHeight + 18}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
              >
                {city}
              </text>

            </g>

          )

        })}

      </svg>

    </div>

  )
}
