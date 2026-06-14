import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginUser(form);

      if (!data.token) {
        alert("Invalid Email or Password");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "username",
        data.username
      );

      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700">
            HealthBridge
          </h1>

          <p className="text-gray-500 mt-2">
            AI-Powered Healthcare Information System
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-3 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Account
          </button>

        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}

export default LoginPage;