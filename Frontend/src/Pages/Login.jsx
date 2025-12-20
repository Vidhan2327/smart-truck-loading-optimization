import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../Services/AuthService";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    toast.info("Logging in...");

    try {
      const res = await loginUser({ email, password });
      const role = res.data.user.role;

      toast.success("Login successful 🎉");

      if (role === "Warehouse") {
        navigate("/warehouse/dashboard");
      } else {
        navigate("/dealer/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-orange-100 via-yellow-50 to-sky-100 px-4">

      <form
        onSubmit={Login}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {/* Email */}
        <input
          className="w-full mb-4 p-3 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="email"
          placeholder="Email Address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="w-full mb-6 p-3 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 
          text-white font-semibold p-3 rounded-lg transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="mt-5 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            className="text-orange-500 hover:underline"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
