import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../Services/AuthService";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Warehouse",
  });

  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);

      const role = res.data.user.role;

      if (role === "Warehouse") {
        navigate("/warehouse/dashboard");
      } else {
        navigate("/dealer/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={Register} className="p-6 border rounded w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          className="w-full mb-3 p-2 border"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full mb-3 p-2 border"
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full mb-3 p-2 border"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full mb-3 p-2 border"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Warehouse">Warehouse</option>
          <option value="Dealer">Dealer</option>
        </select>

        <button className="w-full bg-black text-white p-2">Register</button>

        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
