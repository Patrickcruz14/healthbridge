import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHeartPulseLine, RiMailLine, RiLockLine, RiUserLine,
  RiEyeLine, RiEyeOffLine, RiArrowRightLine, RiArrowLeftLine,
  RiHeart2Line, RiCapsuleLine, RiFirstAidKitLine,
  RiMedicineBottleLine, RiStethoscopeLine, RiHospitalLine,
  RiVirusLine, RiLungsLine, RiHeartLine, RiCheckLine,
  RiDropLine, RiAlertLine, RiMapPin2Line, RiCalendarLine,
  RiUserHeartLine
} from 'react-icons/ri'
import API from '../services/api'

const floatingIcons = [
  { icon: RiHeart2Line, top: '5%', left: '3%', size: 32, delay: 0 },
  { icon: RiCapsuleLine, top: '10%', left: '85%', size: 28, delay: 0.5 },
  { icon: RiFirstAidKitLine, top: '20%', left: '15%', size: 26, delay: 1 },
  { icon: RiMedicineBottleLine, top: '25%', left: '78%', size: 30, delay: 0.3 },
  { icon: RiStethoscopeLine, top: '38%', left: '2%', size: 34, delay: 0.8 },
  { icon: RiHospitalLine, top: '40%', left: '90%', size: 30, delay: 0.2 },
  { icon: RiHeart2Line, top: '55%', left: '8%', size: 28, delay: 0.6 },
  { icon: RiCapsuleLine, top: '58%', left: '88%', size: 26, delay: 0.9 },
  { icon: RiFirstAidKitLine, top: '70%', left: '3%', size: 32, delay: 0.4 },
  { icon: RiStethoscopeLine, top: '72%', left: '82%', size: 28, delay: 0.7 },
  { icon: RiHeart2Line, top: '85%', left: '20%', size: 24, delay: 0.1 },
  { icon: RiMedicineBottleLine, top: '88%', left: '70%', size: 26, delay: 0.6 },
  { icon: RiHospitalLine, top: '92%', left: '45%', size: 22, delay: 0.3 },
  { icon: RiCapsuleLine, top: '3%', left: '45%', size: 20, delay: 0.8 },
  { icon: RiFirstAidKitLine, top: '48%', left: '50%', size: 18, delay: 0.5 },
]

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Hindi alam']
const sexOptions = ['Lalaki', 'Babae', 'Ibang pagkakakilanlan', 'Ayaw sabihin']

const inputStyle = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)'
}

function SuccessScreen({ onContinue }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-[#1D9E75] flex items-center justify-center mb-6 shadow-lg"
        style={{ boxShadow: '0 0 40px rgba(29,158,117,0.4)' }}
      >
        <RiCheckLine className="text-white text-4xl" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-2xl font-semibold text-white mb-2">Account Created!</h2>
        <p className="text-sm text-white/60 mb-8">Maligayang pagdating sa HealthBridge. Mag-log in na para magsimula.</p>
        <button
          onClick={onContinue}
          className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#534AB7] text-sm font-semibold rounded-xl hover:bg-white/90 transition"
        >
          Mag-log in na <RiArrowRightLine />
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(!location.state?.showRegister)
  const [registerStep, setRegisterStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Login
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Step 1
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  // Step 2
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')
  const [barangay, setBarangay] = useState('')
  const [city, setCity] = useState('')
  const [bloodType, setBloodType] = useState('Hindi alam')
  const [allergies, setAllergies] = useState('')
  const [denguHistory, setDenguHistory] = useState(false)
  const [tbHistory, setTbHistory] = useState(false)
  const [hypertensionHistory, setHypertensionHistory] = useState(false)

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await API.post('/login', { email: loginEmail, password: loginPassword })
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        navigate('/dashboard')
      } else {
        setError(res.data.error || 'Login failed')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleStep1Next = () => {
    setError('')
    if (!firstName.trim() || !lastName.trim()) return setError('Ilagay ang iyong buong pangalan.')
    if (!registerEmail.trim()) return setError('Ilagay ang iyong email.')
    if (registerPassword.length < 8) return setError('Minimum 8 characters ang password.')
    setRegisterStep(2)
  }

  const handleRegister = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await API.post('/register', {
        username: `${firstName} ${lastName}`,
        email: registerEmail,
        password: registerPassword,
        age,
        sex,
        barangay,
        city,
        bloodType,
        allergies,
        denguHistory,
        tbHistory,
        hypertensionHistory,
      })
      if (res.data.message === 'Registration successful') {
        setShowSuccess(true)
      } else {
        setError(res.data.error || 'Registration failed')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const switchToRegister = () => { setIsLogin(false); setRegisterStep(1); setError(''); setShowSuccess(false) }
  const switchToLogin = () => { setIsLogin(true); setRegisterStep(1); setError(''); setShowSuccess(false) }

  const textInput = (value, onChange, placeholder, type = 'text') => (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={inputStyle}>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        autoComplete="off"
        style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }} />
    </div>
  )

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2D2680 0%, #534AB7 50%, #7B6FD4 100%)' }}
    >
      <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-20 blur-3xl" style={{ background: '#7B6FD4' }} />
      <div className="absolute bottom-[-100px] right-[-60px] w-[400px] h-[400px] rounded-full opacity-20 blur-3xl" style={{ background: '#1D9E75' }} />

      {floatingIcons.map((item, i) => (
        <motion.div key={i} className="absolute text-white/30" style={{ top: item.top, left: item.left }}
          animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}>
          <item.icon size={item.size} />
        </motion.div>
      ))}

      <div className="absolute top-6 left-8 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <RiHeartPulseLine className="text-white text-sm" />
        </div>
        <span className="text-white font-semibold text-lg">HealthBridge</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4 rounded-3xl p-8 my-8"
        style={{
          background: 'rgba(255, 255, 255, 0.13)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Tab — hide on step 2 and success */}
        {!showSuccess && !((!isLogin) && registerStep === 2) && (
          <div className="flex rounded-2xl p-1 mb-8" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <button onClick={switchToLogin}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${isLogin ? 'bg-white text-[#534AB7] shadow-sm' : 'text-white/60 hover:text-white'}`}>
              Log in
            </button>
            <button onClick={switchToRegister}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${!isLogin ? 'bg-white text-[#534AB7] shadow-sm' : 'text-white/60 hover:text-white'}`}>
              Sign up
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-200 bg-red-500/20 border border-red-400/30">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* SUCCESS */}
          {showSuccess && (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SuccessScreen onContinue={switchToLogin} />
            </motion.div>
          )}

          {/* LOGIN */}
          {!showSuccess && isLogin && (
            <motion.div key="login" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <h1 className="text-2xl font-semibold text-white mb-1">Maligayang pagbabalik!</h1>
              <p className="text-sm text-white/50 mb-8">I-enter ang iyong credentials para mag-continue.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Email</label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={inputStyle}>
                    <RiMailLine className="text-white/40 text-lg shrink-0" />
                    <input type="email" placeholder="juan@email.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                      autoComplete="off"
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Password</label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={inputStyle}>
                    <RiLockLine className="text-white/40 text-lg shrink-0" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()}
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }} />
                    <button onClick={() => setShowPassword(!showPassword)} className="shrink-0">
                      {showPassword ? <RiEyeOffLine className="text-white/40" /> : <RiEyeLine className="text-white/40" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <span onClick={() => navigate('/forgot-password')} className="text-xs text-white/40 cursor-pointer hover:text-white transition">Nakalimutan ang password?</span>
                </div>
                <button onClick={handleLogin} disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#534AB7] text-sm font-semibold rounded-xl hover:bg-white/90 transition mt-1 disabled:opacity-60">
                  {loading ? 'Loading...' : <> Mag-log in <RiArrowRightLine /> </>}
                </button>
              </div>
              <p className="text-center text-xs text-white/40 mt-6">
                Wala pang account?{' '}
                <span className="text-white font-medium cursor-pointer hover:underline" onClick={switchToRegister}>Mag-sign up</span>
              </p>
            </motion.div>
          )}

          {/* STEP 1 */}
          {!showSuccess && !isLogin && registerStep === 1 && (
            <motion.div key="register-1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-8 h-1.5 rounded-full bg-white" />
                  <div className="w-8 h-1.5 rounded-full bg-white/30" />
                </div>
                <span className="text-xs text-white/50">Step 1 of 2 — Basic Info</span>
              </div>
              <h1 className="text-2xl font-semibold text-white mb-1">Gumawa ng account</h1>
              <p className="text-sm text-white/50 mb-6">Libre at madaling gamitin. Para sa bawat Pilipino.</p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">First name</label>
                    <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={inputStyle}>
                      <RiUserLine className="text-white/40 text-lg shrink-0" />
                      <input type="text" placeholder="Juan" value={firstName} onChange={e => setFirstName(e.target.value)} autoComplete="off"
                        style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">Last name</label>
                    <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={inputStyle}>
                      <RiUserLine className="text-white/40 text-lg shrink-0" />
                      <input type="text" placeholder="dela Cruz" value={lastName} onChange={e => setLastName(e.target.value)} autoComplete="off"
                        style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Email</label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={inputStyle}>
                    <RiMailLine className="text-white/40 text-lg shrink-0" />
                    <input type="email" placeholder="juan@email.com" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} autoComplete="off"
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Password</label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={inputStyle}>
                    <RiLockLine className="text-white/40 text-lg shrink-0" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" value={registerPassword}
                      onChange={e => setRegisterPassword(e.target.value)} autoComplete="off"
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }} />
                    <button onClick={() => setShowPassword(!showPassword)} className="shrink-0">
                      {showPassword ? <RiEyeOffLine className="text-white/40" /> : <RiEyeLine className="text-white/40" />}
                    </button>
                  </div>
                </div>
                <button onClick={handleStep1Next}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#534AB7] text-sm font-semibold rounded-xl hover:bg-white/90 transition mt-1">
                  Susunod <RiArrowRightLine />
                </button>
              </div>
              <p className="text-center text-xs text-white/40 mt-6">
                May account na?{' '}
                <span className="text-white font-medium cursor-pointer hover:underline" onClick={switchToLogin}>Mag-log in</span>
              </p>
            </motion.div>
          )}

          {/* STEP 2 */}
          {!showSuccess && !isLogin && registerStep === 2 && (
            <motion.div key="register-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-1.5">
                  <div className="w-8 h-1.5 rounded-full bg-white/30" />
                  <div className="w-8 h-1.5 rounded-full bg-white" />
                </div>
                <span className="text-xs text-white/50">Step 2 of 2 — Health Profile</span>
              </div>

              <div className="flex items-center gap-3 mb-1">
                <button onClick={() => setRegisterStep(1)} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition shrink-0">
                  <RiArrowLeftLine className="text-white text-sm" />
                </button>
                <h1 className="text-xl font-semibold text-white">Health Profile</h1>
              </div>
              <p className="text-sm text-white/50 mb-5">Para mas makatulong sa iyo ang HealthBridge. Optional ang lahat.</p>

              <div className="flex flex-col gap-5">

                {/* Personal Details */}
                <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                    <RiUserLine className="text-white/50" /> Personal Details
                  </p>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-white/50 mb-1 block">Age</label>
                      <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={inputStyle}>
                        <RiCalendarLine className="text-white/30 shrink-0" />
                        <input type="number" placeholder="e.g. 25" value={age} onChange={e => setAge(e.target.value)} autoComplete="off"
                          style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '13px' }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-white/50 mb-1 block">Sex</label>
                      <select value={sex} onChange={e => setSex(e.target.value)}
                        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: sex ? 'white' : 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                        <option value="" style={{ color: '#333' }}>Pumili...</option>
                        {sexOptions.map(s => <option key={s} value={s} style={{ color: '#333' }}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Barangay</label>
                    <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={inputStyle}>
                      <RiMapPin2Line className="text-white/30 shrink-0" />
                      <input type="text" placeholder="e.g. Batasan Hills" value={barangay} onChange={e => setBarangay(e.target.value)} autoComplete="off"
                        style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '13px' }} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">City / Municipality</label>
                    <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={inputStyle}>
                      <RiMapPin2Line className="text-white/30 shrink-0" />
                      <input type="text" placeholder="e.g. Quezon City" value={city} onChange={e => setCity(e.target.value)} autoComplete="off"
                        style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '13px' }} />
                    </div>
                  </div>
                </div>

                {/* Health Info */}
                <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                    <RiUserHeartLine className="text-white/50" /> Health Information
                  </p>

                  {/* Blood Type */}
                  <div>
                    <label className="text-xs text-white/50 mb-2 block flex items-center gap-1">
                      <RiDropLine className="text-white/30" /> Blood Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {bloodTypes.map(bt => (
                        <button key={bt} onClick={() => setBloodType(bt)}
                          className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                          style={bloodType === bt
                            ? { background: 'white', color: '#534AB7' }
                            : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)' }}>
                          {bt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <label className="text-xs text-white/50 mb-1 block flex items-center gap-1">
                      <RiAlertLine className="text-white/30" /> Known Allergies
                    </label>
                    <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={inputStyle}>
                      <input type="text" placeholder="e.g. Penicillin, Peanuts (optional)" value={allergies}
                        onChange={e => setAllergies(e.target.value)} autoComplete="off"
                        style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '13px' }} />
                    </div>
                  </div>

                  {/* Disease History */}
                  <div>
                    <label className="text-xs text-white/50 mb-2 block">Nakaraan na sakit</label>
                    <div className="flex flex-col gap-2">
                      {[
                        { label: 'Dengue', icon: RiVirusLine, state: denguHistory, setter: setDenguHistory, color: '#1D9E75' },
                        { label: 'Tuberculosis (TB)', icon: RiLungsLine, state: tbHistory, setter: setTbHistory, color: '#7B6FD4' },
                        { label: 'Hypertension', icon: RiHeartLine, state: hypertensionHistory, setter: setHypertensionHistory, color: '#E65100' },
                      ].map(item => (
                        <button key={item.label} onClick={() => item.setter(!item.state)}
                          className="flex items-center gap-3 p-2.5 rounded-xl transition-all text-left"
                          style={item.state
                            ? { background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)' }
                            : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: item.state ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)' }}>
                            <item.icon className="text-sm text-white" />
                          </div>
                          <span className="text-sm text-white flex-1">{item.label}</span>
                          <div className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0"
                            style={item.state ? { background: 'white', borderColor: 'white' } : { borderColor: 'rgba(255,255,255,0.3)' }}>
                            {item.state && <RiCheckLine className="text-[#534AB7] text-xs" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button onClick={handleRegister} disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#534AB7] text-sm font-semibold rounded-xl hover:bg-white/90 transition disabled:opacity-60">
                  {loading ? 'Loading...' : <> Gumawa ng account <RiArrowRightLine /> </>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}