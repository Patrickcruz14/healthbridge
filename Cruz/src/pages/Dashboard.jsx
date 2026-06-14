import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RiHeartPulseLine, RiRobot2Line, RiHospitalLine,
  RiMapPin2Line, RiBookOpenLine, RiUserLine,
  RiLogoutBoxLine, RiArrowRightLine, RiCalendarLine,
  RiShieldCheckLine, RiNotification3Line, RiSearchLine,
  RiDropLine, RiRunLine, RiMoonLine, RiArrowUpLine, RiFireLine,
  RiVirusLine, RiLungsLine, RiHeartLine
} from 'react-icons/ri'
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const navItems = [
  { icon: RiHeartPulseLine, label: 'Dashboard', path: '/dashboard' },
  { icon: RiRobot2Line, label: 'Health Chatbot', path: '/chatbot' },
  { icon: RiHospitalLine, label: 'Symptom Checker', path: '/symptom-checker' },
  { icon: RiMapPin2Line, label: 'Facility Locator', path: '/facility-locator' },
  { icon: RiBookOpenLine, label: 'Health Education', path: '/health-education' },
  { icon: RiUserLine, label: 'Profile', path: '/profile' },
]

const weeklyData = [
  { day: 'Mon', checks: 1 },
  { day: 'Tue', checks: 3 },
  { day: 'Wed', checks: 2 },
  { day: 'Thu', checks: 4 },
  { day: 'Fri', checks: 2 },
  { day: 'Sat', checks: 5 },
  { day: 'Sun', checks: 3 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

function ProgressRing({ value, max, color }) {
  const r = 20
  const circ = 2 * Math.PI * r
  const fill = ((max - value) / max) * circ
  return (
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r={r} fill="none" stroke="#F3F4F6" strokeWidth="4" />
      <circle
        cx="26" cy="26" r={r} fill="none"
        stroke={color} strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={fill}
        strokeLinecap="round"
        transform="rotate(-90 26 26)"
      />
      <text x="26" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill={color}>
        {value}
      </text>
    </svg>
  )
}

const diseases = [
  { label: 'Dengue', icon: RiVirusLine, color: '#1D9E75', bg: 'bg-[#E1F5EE]', text: 'text-[#1D9E75]', desc: 'Lagnat, pantal, sakit ng kasukasuan', path: '/symptom-checker/dengue' },
  { label: 'Tuberculosis', icon: RiLungsLine, color: '#534AB7', bg: 'bg-[#EEEDFE]', text: 'text-[#534AB7]', desc: 'Matagal na ubo, night sweats, pagbaba ng timbang', path: '/symptom-checker/tb' },
  { label: 'Hypertension', icon: RiHeartLine, color: '#E65100', bg: 'bg-[#FFF3E0]', text: 'text-[#E65100]', desc: 'Sakit ng ulo, palpitations, mataas na BP', path: '/symptom-checker/hypertension' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const active = '/dashboard'

  return (
    <div className="flex min-h-screen bg-[#F4F3FF] font-sans">

      {/* Sidebar */}
      <motion.div
        animate={{ width: collapsed ? 68 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="shrink-0 bg-white border-r border-gray-100 flex flex-col justify-between py-6 overflow-hidden"
        style={{ boxShadow: '2px 0 12px rgba(83,74,183,0.06)' }}
      >
        <div>
          <div
            className="flex items-center gap-2 px-4 mb-8 cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className="w-8 h-8 rounded-full bg-[#534AB7] flex items-center justify-center shrink-0">
              <RiHeartPulseLine className="text-white text-sm" />
            </div>
            {!collapsed && (
              <span className="text-[#534AB7] font-semibold text-base whitespace-nowrap">HealthBridge</span>
            )}
          </div>

          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item, i) => {
              const isActive = active === item.path
              return (
                <button
                  key={i}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left relative ${
                    isActive ? 'bg-[#EEEDFE] text-[#534AB7]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#534AB7] rounded-r-full" />
                  )}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-[#534AB7]' : 'bg-gray-100'}`}>
                    <item.icon className={`text-sm ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </button>
              )
            })}
          </nav>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <RiLogoutBoxLine className="text-sm text-gray-400" />
          </div>
          {!collapsed && <span>Mag-logout</span>}
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-6 overflow-y-auto">

        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Magandang umaga, Juan! 👋</h1>
            <p className="text-sm text-gray-400 mt-0.5">Miyerkules, Mayo 20, 2025</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
              <RiSearchLine className="text-gray-400 text-sm" />
              <input
                placeholder="Maghanap..."
                className="text-sm outline-none bg-transparent text-gray-600 placeholder-gray-400 w-36"
              />
            </div>
            <button className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm hover:bg-gray-50 transition relative">
              <RiNotification3Line className="text-gray-400" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-400 rounded-full" />
            </button>
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-1.5 shadow-sm cursor-pointer hover:bg-gray-50 transition">
              <div className="w-6 h-6 bg-[#534AB7] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-semibold">J</span>
              </div>
              <span className="text-sm text-gray-700 font-medium">Juan</span>
            </div>
          </div>
        </div>

        {/* Main Feature Cards */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-3 gap-5 mb-6">

          {/* Symptom Checker - Hero Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(83,74,183,0.25)' }}
            onClick={() => navigate('/symptom-checker')}
            className="col-span-1 rounded-2xl p-5 cursor-pointer relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #534AB7 0%, #7B6FD4 100%)', boxShadow: '0 8px 24px rgba(83,74,183,0.2)' }}
          >
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute bottom-[-30px] right-[20px] w-20 h-20 rounded-full bg-white/5" />
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <RiHospitalLine className="text-white text-xl" />
            </div>
            <h3 className="text-white font-semibold text-base mb-1">Symptom Checker</h3>
            <p className="text-white/70 text-xs leading-relaxed mb-3">I-check ang iyong nararamdaman ngayon</p>
            {/* Disease tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['🦟 Dengue', '🫁 TB', '💉 Hypertension'].map((d, i) => (
                <span key={i} className="text-white/90 text-xs bg-white/20 px-2 py-0.5 rounded-full">{d}</span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-white text-xs font-semibold">
              Magsimula <RiArrowRightLine />
            </div>
          </motion.div>

          {/* Chatbot Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(29,158,117,0.2)' }}
            onClick={() => navigate('/chatbot')}
            className="rounded-2xl p-5 cursor-pointer relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1D9E75 0%, #2ECC9A 100%)', boxShadow: '0 8px 24px rgba(29,158,117,0.15)' }}
          >
            <div className="absolute top-[-20px] right-[-20px] w-28 h-28 rounded-full bg-white/10" />
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <RiRobot2Line className="text-white text-xl" />
            </div>
            <h3 className="text-white font-semibold text-base mb-1">Health Chatbot</h3>
            <p className="text-white/70 text-xs leading-relaxed mb-3">Magtanong ng kahit anong health concern</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['24/7 Available', 'Sa Filipino', 'Free'].map((d, i) => (
                <span key={i} className="text-white/90 text-xs bg-white/20 px-2 py-0.5 rounded-full">{d}</span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-white text-xs font-semibold">
              Mag-chat <RiArrowRightLine />
            </div>
          </motion.div>

          {/* Facility Locator */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/facility-locator')}
            className="rounded-2xl p-5 cursor-pointer relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #4C6EF5 100%)', boxShadow: '0 8px 24px rgba(59,91,219,0.15)' }}
          >
            <div className="absolute top-[-20px] right-[-20px] w-28 h-28 rounded-full bg-white/10" />
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <RiMapPin2Line className="text-white text-xl" />
            </div>
            <h3 className="text-white font-semibold text-base mb-1">Facility Locator</h3>
            <p className="text-white/70 text-xs leading-relaxed mb-3">Hanapin ang pinakamalapit na health center</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['May PhilHealth', 'Libre', 'BHC'].map((d, i) => (
                <span key={i} className="text-white/90 text-xs bg-white/20 px-2 py-0.5 rounded-full">{d}</span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-white text-xs font-semibold">
              Hanapin <RiArrowRightLine />
            </div>
          </motion.div>
        </motion.div>

        {/* Disease Quick Check Row — NEW */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-3 gap-5 mb-6">
          {diseases.map((d, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.01 }}
              onClick={() => navigate(d.path)}
              className="bg-white rounded-2xl p-4 border border-gray-100 cursor-pointer flex items-center gap-4"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <div className={`w-12 h-12 ${d.bg} rounded-xl flex items-center justify-center shrink-0`}>
                <d.icon className={`${d.text} text-2xl`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{d.label}</p>
                <p className="text-xs text-gray-400 truncate">{d.desc}</p>
              </div>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: d.color }}
              >
                <RiArrowRightLine className="text-white text-sm" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats + Chart Row */}
        <div className="grid grid-cols-3 gap-5 mb-6">

          {/* Stats */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="col-span-1 grid grid-cols-2 gap-3">
            {[
              { label: 'Symptom Checks', value: 3, max: 10, color: '#534AB7', icon: RiHospitalLine },
              { label: 'Chat Sessions', value: 7, max: 20, color: '#1D9E75', icon: RiRobot2Line },
              { label: 'Articles Read', value: 12, max: 30, color: '#3B5BDB', icon: RiBookOpenLine },
              { label: 'Facilities', value: 5, max: 10, color: '#E65100', icon: RiMapPin2Line },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col items-center text-center"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <ProgressRing value={stat.value} max={stat.max} color={stat.color} />
                <p className="text-xs font-medium text-gray-700 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Weekly Chart — taller + Y axis */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="col-span-2 bg-white rounded-2xl p-5 border border-gray-100"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">Weekly Health Activity</h2>
                <p className="text-xs text-gray-400">Symptom checks ngayong linggo</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#1D9E75] font-medium bg-[#E1F5EE] px-2 py-1 rounded-lg">
                <RiArrowUpLine className="text-xs" /> 12% vs last week
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={24} />
                <Tooltip
                  contentStyle={{ background: '#534AB7', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }}
                  itemStyle={{ color: 'white' }}
                />
                <Line
                  type="monotone"
                  dataKey="checks"
                  stroke="#534AB7"
                  strokeWidth={2.5}
                  dot={{ fill: '#534AB7', r: 4 }}
                  activeDot={{ r: 6, fill: '#534AB7' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-5">

          {/* Recent Activity */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="col-span-1 bg-white rounded-2xl p-5 border border-gray-100"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Kamakailang aktibidad</h2>
            <div className="flex flex-col gap-3">
              {[
                { icon: RiHospitalLine, text: 'Nag-check ng symptoms — Lagnat, Ubo', time: '2 oras', color: 'text-[#534AB7]', bg: 'bg-[#EEEDFE]' },
                { icon: RiRobot2Line, text: 'Nakipag-chat sa Health Chatbot', time: 'Kahapon', color: 'text-[#1D9E75]', bg: 'bg-[#E1F5EE]' },
                { icon: RiMapPin2Line, text: 'Naghanap ng health center', time: '2 araw', color: 'text-[#3B5BDB]', bg: 'bg-[#EEF2FF]' },
                { icon: RiBookOpenLine, text: '"Ano ang Dengue?" — nabasa', time: '3 araw', color: 'text-[#E65100]', bg: 'bg-[#FFF3E0]' },
                { icon: RiVirusLine, text: 'Dengue Symptom Check — kumpleto', time: '4 araw', color: 'text-[#1D9E75]', bg: 'bg-[#E1F5EE]' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${item.bg} rounded-lg flex items-center justify-center shrink-0`}>
                    <item.icon className={`${item.color} text-sm`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 truncate">{item.text}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Wellness Trackers */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="col-span-1 bg-white rounded-2xl p-5 border border-gray-100"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Daily Wellness</h2>
            <div className="flex flex-col gap-4">
              {[
                { icon: RiDropLine, label: 'Tubig', value: 6, max: 8, color: '#3B5BDB', unit: 'baso' },
                { icon: RiRunLine, label: 'Steps', value: 4200, max: 10000, color: '#1D9E75', unit: 'steps' },
                { icon: RiMoonLine, label: 'Tulog', value: 6, max: 8, color: '#534AB7', unit: 'oras' },
                { icon: RiFireLine, label: 'Calories', value: 1800, max: 2500, color: '#E65100', unit: 'kcal' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className="text-sm" style={{ color: item.color }} />
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-700">{item.value.toLocaleString()} / {item.max.toLocaleString()} {item.unit}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${(item.value / item.max) * 100}%`, background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Health score summary */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-gray-700">Overall Wellness Score</p>
                <span className="text-xs font-bold text-[#1D9E75]">72%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-[#1D9E75]" style={{ width: '72%' }} />
              </div>
              <p className="text-xs text-gray-400 mt-1">Magaling! Dagdagan pa ang tubig at tulog.</p>
            </div>
          </motion.div>

          {/* Health Tip + Upcoming */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="col-span-1 bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-4"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-800">Health Tip</h2>
                <span className="text-xs bg-[#EEEDFE] text-[#534AB7] px-2 py-0.5 rounded-lg font-medium">DOH</span>
              </div>
              <div
                className="rounded-xl p-4 mb-3 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #534AB7 0%, #7B6FD4 100%)' }}
              >
                <div className="absolute top-[-10px] right-[-10px] w-20 h-20 rounded-full bg-white/10" />
                <p className="text-white text-xs font-semibold mb-1">💧 Mag-hydrate ng sapat</p>
                <p className="text-white/70 text-xs leading-relaxed">
                  Inirerekomenda ng WHO ang 8 baso ng tubig bawat araw para sa maayos na kalusugan.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <RiShieldCheckLine className="text-[#1D9E75]" />
                  Batay sa WHO guidelines
                </div>
                <button className="text-xs text-[#534AB7] font-medium hover:underline">
                  Basahin →
                </button>
              </div>
            </div>

            {/* Dengue alert banner — context-aware */}
            <div className="rounded-xl p-3 bg-[#FFF3E0] border border-orange-100 flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FFE0B2] rounded-lg flex items-center justify-center shrink-0">
                <RiVirusLine className="text-[#E65100] text-sm" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#E65100]">Dengue Alert sa inyong lugar</p>
                <p className="text-xs text-orange-400 mt-0.5">Mag-ingat. I-check ang iyong symptoms.</p>
              </div>
            </div>

            {/* Upcoming */}
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-700 mb-2">Upcoming</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Annual Check-up', date: 'Mayo 25, 2025', color: '#534AB7', bg: 'bg-[#534AB7]' },
                  { label: 'BP Monitoring', date: 'Mayo 28, 2025', color: '#E65100', bg: 'bg-[#E65100]' },
                ].map((appt, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-[#F4F3FF]">
                    <div className={`w-8 h-8 ${appt.bg} rounded-lg flex items-center justify-center shrink-0`}>
                      <RiCalendarLine className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700">{appt.label}</p>
                      <p className="text-xs text-gray-400">{appt.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}