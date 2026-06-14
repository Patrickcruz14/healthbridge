import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHeartPulseLine, RiMailLine, RiLockLine, RiUserLine,
  RiEyeLine, RiEyeOffLine, RiArrowRightLine,
  RiHeart2Line, RiCapsuleLine, RiFirstAidKitLine,
  RiMedicineBottleLine, RiStethoscopeLine, RiHospitalLine
} from 'react-icons/ri'

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

export default function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2D2680 0%, #534AB7 50%, #7B6FD4 100%)' }}
    >

      {/* Floating blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-20 blur-3xl" style={{ background: '#7B6FD4' }} />
      <div className="absolute bottom-[-100px] right-[-60px] w-[400px] h-[400px] rounded-full opacity-20 blur-3xl" style={{ background: '#1D9E75' }} />

      {/* Floating Medical Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-white/30"
          style={{ top: item.top, left: item.left }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut'
          }}
        >
          <item.icon size={item.size} />
        </motion.div>
      ))}

      {/* Logo */}
      <div
        className="absolute top-6 left-8 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <RiHeartPulseLine className="text-white text-sm" />
        </div>
        <span className="text-white font-semibold text-lg">HealthBridge</span>
      </div>

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4 rounded-3xl p-8"
        style={{
          background: 'rgba(255, 255, 255, 0.13)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Toggle */}
        <div className="flex rounded-2xl p-1 mb-8" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${isLogin ? 'bg-white text-[#534AB7] shadow-sm' : 'text-white/60 hover:text-white'}`}
          >
            Log in
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${!isLogin ? 'bg-white text-[#534AB7] shadow-sm' : 'text-white/60 hover:text-white'}`}
          >
            Sign up
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="text-2xl font-semibold text-white mb-1">Maligayang pagbabalik!</h1>
              <p className="text-sm text-white/50 mb-8">I-enter ang iyong credentials para mag-continue.</p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Email</label>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <RiMailLine className="text-white/40 text-lg shrink-0" />
                    <input
                      type="email"
                      placeholder="juan@email.com"
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }}
                      onFocus={e => e.target.parentElement.style.border = '1px solid rgba(255,255,255,0.4)'}
                      onBlur={e => e.target.parentElement.style.border = '1px solid rgba(255,255,255,0.15)'}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Password</label>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <RiLockLine className="text-white/40 text-lg shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }}
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="shrink-0">
                      {showPassword ? <RiEyeOffLine className="text-white/40" /> : <RiEyeLine className="text-white/40" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <span className="text-xs text-white/40 cursor-pointer hover:text-white transition">Nakalimutan ang password?</span>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#534AB7] text-sm font-semibold rounded-xl hover:bg-white/90 transition mt-1"
                >
                  Mag-log in <RiArrowRightLine />
                </button>
              </div>

              <p className="text-center text-xs text-white/40 mt-6">
                Wala pang account?{' '}
                <span className="text-white font-medium cursor-pointer hover:underline" onClick={() => setIsLogin(false)}>
                  Mag-sign up
                </span>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="text-2xl font-semibold text-white mb-1">Gumawa ng account</h1>
              <p className="text-sm text-white/50 mb-8">Libre at madaling gamitin. Para sa bawat Pilipino.</p>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">First name</label>
                    <div
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    >
                      <RiUserLine className="text-white/40 text-lg shrink-0" />
                      <input
                        type="text"
                        placeholder="Juan"
                        style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">Last name</label>
                    <div
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    >
                      <RiUserLine className="text-white/40 text-lg shrink-0" />
                      <input
                        type="text"
                        placeholder="dela Cruz"
                        style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Email</label>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <RiMailLine className="text-white/40 text-lg shrink-0" />
                    <input
                      type="email"
                      placeholder="juan@email.com"
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Password</label>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <RiLockLine className="text-white/40 text-lg shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }}
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="shrink-0">
                      {showPassword ? <RiEyeOffLine className="text-white/40" /> : <RiEyeLine className="text-white/40" />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#534AB7] text-sm font-semibold rounded-xl hover:bg-white/90 transition mt-1"
                >
                  Gumawa ng account <RiArrowRightLine />
                </button>
              </div>

              <p className="text-center text-xs text-white/40 mt-6">
                May account na?{' '}
                <span className="text-white font-medium cursor-pointer hover:underline" onClick={() => setIsLogin(true)}>
                  Mag-log in
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}