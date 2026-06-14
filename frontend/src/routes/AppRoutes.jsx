import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import ChatbotPage from "../pages/ChatbotPage";
import HistoryPage from "../pages/HistoryPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import FacilitiesPage from "../pages/FacilitiesPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Disease Selection */}
        <Route
          path="/chatbot"
          element={<ChatbotPage />}
        />

        {/* Actual AI Chat */}
        
        <Route
          path="/history"
          element={<HistoryPage />}
        />

        <Route
          path="/facilities"
          element={<FacilitiesPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;