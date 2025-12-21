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

  const [showPassword, setShowPassword] = useState(false);
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

        {/* Name */}
        <input
          className="w-full mb-4 p-3 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Full Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          className="w-full mb-4 p-3 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="email"
          placeholder="Email Address"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password with Eye Toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full p-3 border rounded-lg pr-12
            focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2
            text-gray-500 hover:text-orange-500"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              /* Eye Off */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58M9.88 5.09A9.53 9.53 0 0112 5c5 0 9 7 9 7a17.86 17.86 0 01-3.18 4.16M6.1 6.1C3.9 7.86 2 12 2 12a17.86 17.86 0 004.18 4.82A9.53 9.53 0 0012 19c1.03 0 2.04-.15 3-.43"
                />
              </svg>
            ) : (
              /* Eye */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {/* Role */}
        <select
          className="w-full mb-6 p-3 border rounded-lg bg-white
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Warehouse">Warehouse User</option>
          <option value="Dealer">Truck Dealer</option>
        </select>

        {/* Submit */}
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