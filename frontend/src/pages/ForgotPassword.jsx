import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHeartPulseLine, RiMailLine, RiLockLine, RiArrowRightLine,
  RiArrowLeftLine, RiCheckLine, RiMailOpenLine, RiEyeLine, RiEyeOffLine
} from 'react-icons/ri'
import API from '../services/api'

const inputStyle = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)'
}

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: email, 2: simulated inbox, 3: new password, 4: success
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendEmail = async () => {
    setError('')
    if (!email.trim()) return setError('Ilagay ang iyong email.')
    setLoading(true)
    try {
      const res = await API.post('/forgot-password', { email })
      if (res.data.reset_token) {
        setResetToken(res.data.reset_token)
        setStep(2)
      } else {
        setError(res.data.error || 'Walang account na may email na ito.')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    setError('')
    if (newPassword.length < 8) return setError('Minimum 8 characters ang password.')
    if (newPassword !== confirmPassword) return setError('Hindi tugma ang password.')
    setLoading(true)
    try {
      const res = await API.post('/reset-password', { token: resetToken, new_password: newPassword })
      if (res.data.message) {
        setStep(4)
      } else {
        setError(res.data.error || 'Hindi na-reset ang password.')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2D2680 0%, #534AB7 50%, #7B6FD4 100%)' }}
    >
      <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-20 blur-3xl" style={{ background: '#7B6FD4' }} />
      <div className="absolute bottom-[-100px] right-[-60px] w-[400px] h-[400px] rounded-full opacity-20 blur-3xl" style={{ background: '#1D9E75' }} />

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
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-200 bg-red-500/20 border border-red-400/30">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* STEP 1: EMAIL */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <button onClick={() => navigate('/login')} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition mb-4">
                <RiArrowLeftLine className="text-white text-sm" />
              </button>
              <h1 className="text-2xl font-semibold text-white mb-1">Nakalimutan ang password?</h1>
              <p className="text-sm text-white/50 mb-8">Ilagay ang iyong email para makapag-reset ng password.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Email</label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={inputStyle}>
                    <RiMailLine className="text-white/40 text-lg shrink-0" />
                    <input type="email" placeholder="juan@email.com" value={email} onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendEmail()}
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }} />
                  </div>
                </div>
                <button onClick={handleSendEmail} disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#534AB7] text-sm font-semibold rounded-xl hover:bg-white/90 transition disabled:opacity-60">
                  {loading ? 'Loading...' : <> Magpadala ng reset link <RiArrowRightLine /> </>}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SIMULATED INBOX */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mb-4">
                  <RiMailOpenLine className="text-white text-2xl" />
                </div>
                <h1 className="text-xl font-semibold text-white mb-1">Pumunta sa iyong inbox</h1>
                <p className="text-sm text-white/50">Nagpadala kami ng simulated email sa <span className="text-white">{email}</span>. Para sa demo, ito ang "natanggap" na email:</p>
              </div>

              <div className="rounded-2xl p-4 mb-5" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <p className="text-xs text-white/50 mb-2">Subject: Reset your HealthBridge password</p>
                <p className="text-sm text-white/80 mb-3">May humiling ng password reset para sa account na ito. Pindutin ang button sa baba para magpatuloy. Mag-expire ito sa loob ng 15 minuto.</p>
                <button onClick={() => setStep(3)}
                  className="w-full py-2.5 bg-white text-[#534AB7] text-sm font-semibold rounded-xl hover:bg-white/90 transition">
                  I-reset ang password
                </button>
              </div>

              <p className="text-center text-xs text-white/40 cursor-pointer hover:text-white" onClick={() => setStep(1)}>
                Bumalik
              </p>
            </motion.div>
          )}

          {/* STEP 3: NEW PASSWORD */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <h1 className="text-2xl font-semibold text-white mb-1">Gumawa ng bagong password</h1>
              <p className="text-sm text-white/50 mb-8">Siguraduhing malakas at madaling tandaan.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Bagong password</label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={inputStyle}>
                    <RiLockLine className="text-white/40 text-lg shrink-0" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }} />
                    <button onClick={() => setShowPassword(!showPassword)} className="shrink-0">
                      {showPassword ? <RiEyeOffLine className="text-white/40" /> : <RiEyeLine className="text-white/40" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Kumpirmahin ang password</label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={inputStyle}>
                    <RiLockLine className="text-white/40 text-lg shrink-0" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="Ulitin ang password" value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleResetPassword()}
                      style={{ background: 'transparent', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }} />
                  </div>
                </div>
                <button onClick={handleResetPassword} disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#534AB7] text-sm font-semibold rounded-xl hover:bg-white/90 transition disabled:opacity-60">
                  {loading ? 'Loading...' : <> I-save ang bagong password <RiArrowRightLine /> </>}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-8 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-[#1D9E75] flex items-center justify-center mb-6 shadow-lg"
                style={{ boxShadow: '0 0 40px rgba(29,158,117,0.4)' }}>
                <RiCheckLine className="text-white text-4xl" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-white mb-2">Na-reset na ang password!</h2>
              <p className="text-sm text-white/60 mb-8">Pwede ka na mag-log in gamit ang bagong password.</p>
              <button onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#534AB7] text-sm font-semibold rounded-xl hover:bg-white/90 transition">
                Mag-log in na <RiArrowRightLine />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  )
}