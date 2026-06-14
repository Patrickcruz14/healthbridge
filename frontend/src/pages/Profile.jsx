import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RiHeartPulseLine, RiRobot2Line, RiHospitalLine,
  RiMapPin2Line, RiBookOpenLine, RiUserLine,
  RiLogoutBoxLine, RiEditLine, RiSaveLine,
  RiLockLine, RiShieldCheckLine, RiCameraLine,
  RiVirusLine, RiLungsLine, RiHeartLine,
  RiDropLine, RiAlertLine, RiCheckLine,
  RiHistoryLine, RiChat1Line
} from 'react-icons/ri'

const navItems = [
  { icon: RiHeartPulseLine, label: 'Dashboard', path: '/dashboard' },
  { icon: RiRobot2Line, label: 'Health Chatbot', path: '/chatbot' },
  { icon: RiHospitalLine, label: 'Symptom Checker', path: '/symptom-checker' },
  { icon: RiMapPin2Line, label: 'Facility Locator', path: '/facility-locator' },
  { icon: RiBookOpenLine, label: 'Health Education', path: '/health-education' },
  { icon: RiUserLine, label: 'Profile', path: '/profile' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Hindi alam']
const sexOptions = ['Lalaki', 'Babae', 'Ibang pagkakakilanlan', 'Ayaw sabihin']

export default function Profile() {
  const navigate = useNavigate()
  const active = '/profile'

  const [editingPersonal, setEditingPersonal] = useState(false)
  const [editingHealth, setEditingHealth] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [saved, setSaved] = useState(false)

  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Juan',
    lastName: 'dela Cruz',
    email: 'juan@email.com',
    age: '28',
    sex: 'Lalaki',
    barangay: 'Batasan Hills',
    city: 'Quezon City',
  })

  const [healthInfo, setHealthInfo] = useState({
    bloodType: 'O+',
    allergies: '',
    denguHistory: false,
    tbHistory: false,
    hypertensionHistory: false,
    currentMedications: '',
  })

  const [passwordInfo, setPasswordInfo] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const handleSave = (section) => {
    setSaved(true)
    if (section === 'personal') setEditingPersonal(false)
    if (section === 'health') setEditingHealth(false)
    if (section === 'password') setEditingPassword(false)
    setTimeout(() => setSaved(false), 2500)
  }

  const inputClass = (editing) =>
    `w-full px-3 py-2.5 rounded-xl text-sm border transition-all outline-none ${
      editing
        ? 'border-[#534AB7] bg-white text-gray-700 focus:ring-2 focus:ring-[#534AB7]/20'
        : 'border-gray-100 bg-gray-50 text-gray-600 cursor-default'
    }`

  return (
    <div className="flex min-h-screen bg-[#F4F3FF] font-sans">

      {/* Sidebar */}
      <div className="w-[240px] shrink-0 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-3"
        style={{ boxShadow: '2px 0 12px rgba(83,74,183,0.06)' }}>
        <div>
          <div className="flex items-center gap-2 px-2 mb-8 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-8 h-8 rounded-full bg-[#534AB7] flex items-center justify-center">
              <RiHeartPulseLine className="text-white text-sm" />
            </div>
            <span className="text-[#534AB7] font-semibold text-base">HealthBridge</span>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item, i) => {
              const isActive = active === item.path
              return (
                <button key={i} onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left relative ${isActive ? 'bg-[#EEEDFE] text-[#534AB7]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#534AB7] rounded-r-full" />}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-[#534AB7]' : 'bg-gray-100'}`}>
                    <item.icon className={`text-sm ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all">
          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <RiLogoutBoxLine className="text-sm" />
          </div>
          Mag-logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <RiUserLine className="text-[#534AB7] text-xl" />
              <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
            </div>
            <p className="text-sm text-gray-400">I-manage ang iyong personal at health information.</p>
          </motion.div>

          {/* Profile Hero Card */}
          <motion.div variants={fadeUp}
            className="rounded-2xl p-6 mb-6 flex items-center gap-6 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #534AB7 0%, #7B6FD4 100%)', boxShadow: '0 8px 24px rgba(83,74,183,0.2)' }}>
            <div className="absolute top-[-30px] right-[-30px] w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute bottom-[-20px] right-[80px] w-28 h-28 rounded-full bg-white/5" />

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center border-2 border-white/30">
                <span className="text-white text-3xl font-bold">
                  {personalInfo.firstName[0]}{personalInfo.lastName[0]}
                </span>
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-md hover:bg-gray-50 transition">
                <RiCameraLine className="text-[#534AB7] text-sm" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 relative z-10">
              <h2 className="text-white font-semibold text-xl">{personalInfo.firstName} {personalInfo.lastName}</h2>
              <p className="text-white/70 text-sm mt-0.5">{personalInfo.email}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-lg">
                  {personalInfo.barangay}, {personalInfo.city}
                </span>
                <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-lg">
                  {personalInfo.age} taong gulang
                </span>
                <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-lg">
                  Blood Type: {healthInfo.bloodType}
                </span>
              </div>
            </div>

            {/* Save toast */}
            {saved && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 right-4 flex items-center gap-2 bg-white text-[#1D9E75] text-xs font-semibold px-3 py-2 rounded-xl shadow-lg">
                <RiCheckLine /> Na-save!
              </motion.div>
            )}
          </motion.div>

          <div className="grid grid-cols-3 gap-6">

            {/* Left Column */}
            <div className="col-span-2 flex flex-col gap-6">

              {/* Personal Info */}
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 border border-gray-100"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <RiUserLine className="text-[#534AB7] text-lg" />
                    <h2 className="text-sm font-semibold text-gray-800">Personal Information</h2>
                  </div>
                  <button
                    onClick={() => editingPersonal ? handleSave('personal') : setEditingPersonal(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${editingPersonal ? 'bg-[#534AB7] text-white' : 'bg-[#EEEDFE] text-[#534AB7] hover:bg-[#534AB7] hover:text-white'}`}>
                    {editingPersonal ? <><RiSaveLine /> I-save</> : <><RiEditLine /> I-edit</>}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">First Name</label>
                    <input
                      value={personalInfo.firstName}
                      onChange={e => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      disabled={!editingPersonal}
                      className={inputClass(editingPersonal)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Last Name</label>
                    <input
                      value={personalInfo.lastName}
                      onChange={e => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      disabled={!editingPersonal}
                      className={inputClass(editingPersonal)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email</label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      disabled={!editingPersonal}
                      className={inputClass(editingPersonal)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Age</label>
                    <input
                      type="number"
                      value={personalInfo.age}
                      onChange={e => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                      disabled={!editingPersonal}
                      className={inputClass(editingPersonal)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Sex</label>
                    <select
                      value={personalInfo.sex}
                      onChange={e => setPersonalInfo({ ...personalInfo, sex: e.target.value })}
                      disabled={!editingPersonal}
                      className={inputClass(editingPersonal)}>
                      {sexOptions.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Barangay</label>
                    <input
                      value={personalInfo.barangay}
                      onChange={e => setPersonalInfo({ ...personalInfo, barangay: e.target.value })}
                      disabled={!editingPersonal}
                      placeholder="e.g. Batasan Hills"
                      className={inputClass(editingPersonal)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">City / Municipality</label>
                    <input
                      value={personalInfo.city}
                      onChange={e => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                      disabled={!editingPersonal}
                      placeholder="e.g. Quezon City"
                      className={inputClass(editingPersonal)}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Health Info */}
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 border border-gray-100"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <RiShieldCheckLine className="text-[#1D9E75] text-lg" />
                    <h2 className="text-sm font-semibold text-gray-800">Health Information</h2>
                  </div>
                  <button
                    onClick={() => editingHealth ? handleSave('health') : setEditingHealth(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${editingHealth ? 'bg-[#1D9E75] text-white' : 'bg-[#E1F5EE] text-[#1D9E75] hover:bg-[#1D9E75] hover:text-white'}`}>
                    {editingHealth ? <><RiSaveLine /> I-save</> : <><RiEditLine /> I-edit</>}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Blood Type</label>
                    <select
                      value={healthInfo.bloodType}
                      onChange={e => setHealthInfo({ ...healthInfo, bloodType: e.target.value })}
                      disabled={!editingHealth}
                      className={inputClass(editingHealth)}>
                      {bloodTypes.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Known Allergies</label>
                    <input
                      value={healthInfo.allergies}
                      onChange={e => setHealthInfo({ ...healthInfo, allergies: e.target.value })}
                      disabled={!editingHealth}
                      placeholder="e.g. Penicillin, Peanuts"
                      className={inputClass(editingHealth)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Current Medications</label>
                    <input
                      value={healthInfo.currentMedications}
                      onChange={e => setHealthInfo({ ...healthInfo, currentMedications: e.target.value })}
                      disabled={!editingHealth}
                      placeholder="e.g. Amlodipine 5mg, Metformin"
                      className={inputClass(editingHealth)}
                    />
                  </div>
                </div>

                {/* Pre-existing conditions */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-3 block">Pre-existing Conditions / History</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { key: 'denguHistory', label: 'Dengue History', icon: RiVirusLine, color: '#1D9E75', bg: '#E1F5EE' },
                      { key: 'tbHistory', label: 'Tuberculosis (TB) History', icon: RiLungsLine, color: '#534AB7', bg: '#EEEDFE' },
                      { key: 'hypertensionHistory', label: 'Hypertension (Mataas na BP)', icon: RiHeartLine, color: '#E65100', bg: '#FFF3E0' },
                    ].map((condition) => (
                      <div
                        key={condition.key}
                        onClick={() => editingHealth && setHealthInfo({ ...healthInfo, [condition.key]: !healthInfo[condition.key] })}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${editingHealth ? 'cursor-pointer' : 'cursor-default'} ${healthInfo[condition.key] ? 'border-transparent' : 'border-gray-100 bg-gray-50'}`}
                        style={healthInfo[condition.key] ? { background: condition.bg, borderColor: condition.color + '40' } : {}}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: healthInfo[condition.key] ? condition.bg : '#F3F4F6' }}>
                          <condition.icon className="text-sm" style={{ color: healthInfo[condition.key] ? condition.color : '#9CA3AF' }} />
                        </div>
                        <span className="text-sm font-medium flex-1"
                          style={{ color: healthInfo[condition.key] ? condition.color : '#6B7280' }}>
                          {condition.label}
                        </span>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all`}
                          style={healthInfo[condition.key]
                            ? { background: condition.color, borderColor: condition.color }
                            : { borderColor: '#D1D5DB' }}>
                          {healthInfo[condition.key] && <RiCheckLine className="text-white text-xs" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Change Password */}
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 border border-gray-100"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <RiLockLine className="text-[#E65100] text-lg" />
                    <h2 className="text-sm font-semibold text-gray-800">Change Password</h2>
                  </div>
                  <button
                    onClick={() => editingPassword ? handleSave('password') : setEditingPassword(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${editingPassword ? 'bg-[#E65100] text-white' : 'bg-[#FFF3E0] text-[#E65100] hover:bg-[#E65100] hover:text-white'}`}>
                    {editingPassword ? <><RiSaveLine /> I-save</> : <><RiEditLine /> Baguhin</>}
                  </button>
                </div>

                {!editingPassword ? (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <RiLockLine className="text-gray-400 text-lg shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Password</p>
                      <p className="text-xs text-gray-400">••••••••••••</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {[
                      { key: 'current', label: 'Current Password', placeholder: 'Ilagay ang kasalukuyang password' },
                      { key: 'new', label: 'New Password', placeholder: 'Bagong password (min. 8 characters)' },
                      { key: 'confirm', label: 'Confirm New Password', placeholder: 'Ulitin ang bagong password' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-xs font-medium text-gray-500 mb-1.5 block">{field.label}</label>
                        <input
                          type="password"
                          value={passwordInfo[field.key]}
                          onChange={e => setPasswordInfo({ ...passwordInfo, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2.5 rounded-xl text-sm border border-[#534AB7] bg-white text-gray-700 focus:ring-2 focus:ring-[#534AB7]/20 outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="col-span-1 flex flex-col gap-5">

              {/* Health Summary Card */}
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 border border-gray-100"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 className="text-sm font-semibold text-gray-800 mb-4">Health Summary</h2>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F4F3FF]">
                    <div className="flex items-center gap-2">
                      <RiDropLine className="text-[#3B5BDB] text-sm" />
                      <span className="text-xs text-gray-600">Blood Type</span>
                    </div>
                    <span className="text-xs font-bold text-[#534AB7]">{healthInfo.bloodType}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F4F3FF]">
                    <div className="flex items-center gap-2">
                      <RiAlertLine className="text-[#E65100] text-sm" />
                      <span className="text-xs text-gray-600">Allergies</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 max-w-[100px] text-right truncate">
                      {healthInfo.allergies || 'Wala'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-2">Disease History</p>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { key: 'denguHistory', label: 'Dengue', color: '#1D9E75' },
                        { key: 'tbHistory', label: 'TB', color: '#534AB7' },
                        { key: 'hypertensionHistory', label: 'Hypertension', color: '#E65100' },
                      ].map((d) => (
                        <div key={d.key} className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{d.label}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${healthInfo[d.key] ? 'text-white' : 'bg-gray-100 text-gray-400'}`}
                            style={healthInfo[d.key] ? { background: d.color } : {}}>
                            {healthInfo[d.key] ? 'May history' : 'Wala'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Activity Placeholder */}
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 border border-gray-100"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 className="text-sm font-semibold text-gray-800 mb-1">Activity History</h2>
                <p className="text-xs text-gray-400 mb-4">Chat at symptom check history</p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: RiChat1Line, label: 'Chat History', desc: 'Mga nakaraang usapan sa chatbot', color: '#534AB7', bg: '#EEEDFE' },
                    { icon: RiHistoryLine, label: 'Symptom Checks', desc: 'Mga nakaraang symptom check', color: '#1D9E75', bg: '#E1F5EE' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-gray-200 bg-gray-50">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: item.bg }}>
                        <item.icon className="text-sm" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-600">{item.label}</p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-lg">Coming soon</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">I-connect sa Django backend later</p>
              </motion.div>

              {/* DOH Reminder */}
              <motion.div variants={fadeUp}
                className="rounded-2xl p-4 flex items-start gap-3"
                style={{ background: 'linear-gradient(135deg, #534AB7 0%, #7B6FD4 100%)' }}>
                <RiShieldCheckLine className="text-white text-xl shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white mb-1">Tandaan</p>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Ang iyong health information ay private at secure. Hindi ito ibabahagi sa kahit sino.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}