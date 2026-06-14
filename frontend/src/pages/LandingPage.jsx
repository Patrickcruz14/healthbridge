import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-purple-700">
          HealthBridge
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Connecting Filipinos to
          <span className="text-purple-600">
            {" "}Better Healthcare
          </span>
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          HealthBridge uses Artificial Intelligence,
          Retrieval-Augmented Generation (RAG),
          and trusted healthcare information to
          help users understand diseases and access
          reliable healthcare guidance.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-purple-700"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-purple-600 text-purple-600 px-8 py-4 rounded-xl text-lg hover:bg-purple-50"
          >
            Login
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">
              AI Consultation
            </h3>

            <p className="text-gray-600">
              Ask health-related questions and receive
              AI-assisted guidance powered by RAG.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">
              Consultation History
            </h3>

            <p className="text-gray-600">
              Access previous consultations and
              health-related conversations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">
              Health Facilities
            </h3>

            <p className="text-gray-600">
              Discover nearby healthcare centers
              and medical facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Disease Coverage */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Disease Coverage
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">
                Dengue
              </h3>

              <p className="text-gray-600">
                Symptoms, prevention,
                warning signs, and treatment.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">
                Diabetes
              </h3>

              <p className="text-gray-600">
                Risk factors, prevention,
                management, and lifestyle guidance.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">
                Tuberculosis
              </h3>

              <p className="text-gray-600">
                Symptoms, diagnosis,
                treatment, and prevention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Start Your Healthcare Journey Today
        </h2>

        <p className="text-gray-600 mb-8">
          Register now and experience AI-powered
          healthcare assistance.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700"
        >
          Create Account
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>
          © 2026 HealthBridge. AI-Powered Healthcare Information System.
        </p>
      </footer>

    </div>
  );
}

export default LandingPage;