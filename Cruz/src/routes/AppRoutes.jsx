import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Chatbot from '../pages/Chatbot'
import SymptomChecker from '../pages/SymptomChecker'
import FacilityLocator from '../pages/FacilityLocator'
import HealthEducation from '../pages/HealthEducation'
import Profile from '../pages/Profile'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/facility-locator" element={<FacilityLocator />} />
        <Route path="/health-education" element={<HealthEducation />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}