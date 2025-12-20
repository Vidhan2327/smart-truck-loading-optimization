import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../Services/AuthService";
import { toast } from "react-toastify";

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
    toast.info("Creating account...");

    try {
      const res = await registerUser(form);

      toast.success("Registration successful 🎉");

      const role = res.data.user.role;
      if (role === "Warehouse") {
        navigate("/warehouse/dashboard");
      } else {
        navigate("/dealer/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-orange-100 via-yellow-50 to-sky-100 px-4">

      <form
        onSubmit={Register}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <input
          className="w-full mb-4 p-3 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Full Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full mb-4 p-3 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="email"
          placeholder="Email Address"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full mb-4 p-3 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full mb-6 p-3 border rounded-lg bg-white
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Warehouse">Warehouse User</option>
          <option value="Dealer">Truck Dealer</option>
        </select>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 
          text-white font-semibold p-3 rounded-lg transition"
        >
          Register
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="text-orange-500 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
