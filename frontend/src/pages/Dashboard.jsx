import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") ||
    "User";

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Welcome */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back, {username} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            HealthBridge Healthcare Information System
          </p>

        </div>

        {/* Main Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div
            onClick={() =>
              navigate("/chatbot")
            }
            className="cursor-pointer rounded-3xl p-8 text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg hover:scale-105 transition"
          >

            <h2 className="text-3xl font-bold mb-3">
              🤖 Health Chatbot
            </h2>

            <p className="opacity-90">
              Ask healthcare questions using
              our AI-powered assistant.
            </p>

          </div>

          <div
            onClick={() =>
              navigate("/education")
            }
            className="cursor-pointer rounded-3xl p-8 text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:scale-105 transition"
          >

            <h2 className="text-3xl font-bold mb-3">
              📚 Health Education
            </h2>

            <p className="opacity-90">
              Learn from healthcare articles,
              symptoms, prevention and treatment.
            </p>

          </div>

          <div
            onClick={() =>
              navigate("/facilities")
            }
            className="cursor-pointer rounded-3xl p-8 text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:scale-105 transition"
          >

            <h2 className="text-3xl font-bold mb-3">
              📍 Facility Locator
            </h2>

            <p className="opacity-90">
              Find nearby hospitals, clinics,
              and pharmacies.
            </p>

          </div>

        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow p-6 text-center">

            <h2 className="text-4xl font-bold text-purple-600">
              AI
            </h2>

            <p className="text-gray-500 mt-2">
              Healthcare Assistant
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">

            <h2 className="text-4xl font-bold text-blue-600">
              3
            </h2>

            <p className="text-gray-500 mt-2">
              Health Topics
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">

            <h2 className="text-4xl font-bold text-green-600">
              24/7
            </h2>

            <p className="text-gray-500 mt-2">
              AI Support
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">

            <h2 className="text-4xl font-bold text-orange-500">
              RAG
            </h2>

            <p className="text-gray-500 mt-2">
              Knowledge Base
            </p>

          </div>

        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Recent Activity
            </h2>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <span>🤖</span>
                <span>
                  Used Health Chatbot
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span>📍</span>
                <span>
                  Searched Facilities
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span>📚</span>
                <span>
                  Read Health Education
                </span>
              </div>

            </div>

          </div>

          {/* Health Tip */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Health Tip
            </h2>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">

              <p className="text-gray-700">
                Drink enough water,
                maintain a balanced diet,
                exercise regularly,
                and seek professional
                healthcare advice whenever
                symptoms persist.
              </p>

            </div>

          </div>

          {/* HealthBridge */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              About HealthBridge
            </h2>

            <p className="text-gray-600 leading-relaxed">
              HealthBridge is an AI-powered
              healthcare information system
              that combines Retrieval
              Augmented Generation (RAG)
              with curated healthcare
              knowledge to provide accurate
              disease information,
              educational content,
              and healthcare facility
              recommendations.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;