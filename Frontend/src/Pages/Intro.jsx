import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>LoadSmart</h1>

      <button onClick={() => navigate("/login")} style={{ margin: "10px" }}>
        Login
      </button>

      <button onClick={() => navigate("/register")} style={{ margin: "10px" }}>
        Register
      </button>
    </div>
  );
}
