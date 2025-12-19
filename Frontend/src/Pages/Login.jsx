import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { loginUser } from "../Services/AuthService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const Login = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({
        email,
        password,
      });
      const role = res.data.user.role;
      if (role === "Warehouse") {
        navigate("/warehouse/dashboard");
      } else {
        navigate("/dealer/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={Login} className="p-6 border rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="w-full mb-3 p-2 border"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2">Login</button>

        <p className="mt-3 text-sm">
          Don’t have an account?{" "}
          <Link className="text-blue-500" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
