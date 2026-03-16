import { useEffect, useState } from "react";
import VirtualizedTable from "../components/VirtualizedTable";

export default function List() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {

    async function fetchEmployees() {

      try {

        const response = await fetch(
          "https://backend.jotish.in/backend_dev/gettabledata.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: "test",
              password: "123456"
            })
          }
        );

        const data = await response.json();

        const employeesArray = Object.values(data.TABLE_DATA || {});

        setEmployees(employeesArray[0]);

        localStorage.setItem(
          "employees",
          JSON.stringify(employeesArray[0])
        );

      } catch (error) {
        console.error("API Error:", error);
      }

    }

    fetchEmployees();

  }, []);

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px"
      }}
    >

      <div
        style={{
          maxWidth: "1100px",
          margin: "auto"
        }}
      >

        <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            marginBottom: "30px",
            color: "#1f2937"
          }}
        >
          Employee Insights Dashboard
        </h1>


        {/* Card Container */}
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            padding: "20px"
          }}
        >

          <VirtualizedTable data={employees} />

        </div>

      </div>

    </div>

  );
}
