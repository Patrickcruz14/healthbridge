import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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
      const data = await registerUser(form);

      if (data?.error) {
        alert(data.error);
        return;
      }

      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
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
            Create your healthcare account
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <label className="block mb-2 font-medium">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
            required
          />

          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
            required
          />

          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="w-full border border-gray-300 p-3 rounded-lg mb-6"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-3 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}

export default RegisterPage;