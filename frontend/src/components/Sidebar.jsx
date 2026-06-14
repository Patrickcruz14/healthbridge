import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaRobot,
  FaBookMedical,
  FaHistory,
  FaMapMarkerAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen flex flex-col">

      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-purple-700">
          HealthBridge
        </h1>
      </div>

      <div className="flex-1 p-4">

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 mb-2"
        >
          <FaHome />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/chatbot")}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 mb-2"
        >
          <FaRobot />
          Health Chatbot
        </button>

        <button
          onClick={() => navigate("/education")}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 mb-2"
        >
          <FaBookMedical />
          Health Education
        </button>

        <button
          onClick={() => navigate("/history")}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 mb-2"
        >
          <FaHistory />
          Chat History
        </button>

        <button
          onClick={() => navigate("/facilities")}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 mb-2"
        >
          <FaMapMarkerAlt />
          Facility Locator
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100"
        >
          <FaUser />
          Profile
        </button>

        <hr className="my-6" />

        <h3 className="font-bold text-gray-500 mb-3">
          Diseases
        </h3>

        <button
          onClick={() => {
            localStorage.setItem(
              "selectedDisease",
              "dengue"
            );
            navigate("/chatbot");
          }}
          className="w-full text-left p-3 rounded-lg hover:bg-purple-100 mb-2"
        >
          🦟 Dengue
        </button>

        <button
          onClick={() => {
            localStorage.setItem(
              "selectedDisease",
              "diabetes"
            );
            navigate("/chatbot");
          }}
          className="w-full text-left p-3 rounded-lg hover:bg-purple-100 mb-2"
        >
          🩸 Diabetes
        </button>

        <button
          onClick={() => {
            localStorage.setItem(
              "selectedDisease",
              "tuberculosis"
            );
            navigate("/chatbot");
          }}
          className="w-full text-left p-3 rounded-lg hover:bg-purple-100"
        >
          🫁 Tuberculosis
        </button>

      </div>

      <div className="p-4 border-t">

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;