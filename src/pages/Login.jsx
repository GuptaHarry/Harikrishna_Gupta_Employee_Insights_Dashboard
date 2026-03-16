import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useAuth()

  const navigate = useNavigate()

  const handleLogin = () => {

    const success = login(username, password)

    if (success) {

      navigate("/list")

    } else {

      alert("Invalid credentials")

    }

  }

  return (

    <div style={{ padding: "40px" }}>

    <h1> Harikrishna Gupta Jotish Assigment</h1>
      <h2>Employee Dashboard Login</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  )
}
