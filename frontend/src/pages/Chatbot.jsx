import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHeartPulseLine, RiRobot2Line, RiHospitalLine,
  RiMapPin2Line, RiBookOpenLine, RiUserLine,
  RiLogoutBoxLine, RiSendPlane2Line, RiArrowLeftLine,
  RiVirusLine, RiLungsLine, RiHeartLine,
  RiShieldCheckLine, RiArrowRightLine, RiTimeLine,
  RiInformationLine, RiAlarmWarningLine, RiStethoscopeLine,
  RiExternalLinkLine, RiHistoryLine, RiDeleteBinLine,
  RiPencilLine, RiCheckLine, RiCloseLine
} from 'react-icons/ri'
import API from '../services/api'
import { useLanguage } from '../context/LanguageContext'

const navItems = [
  { icon: RiHeartPulseLine, label: 'Dashboard', path: '/dashboard' },
  { icon: RiRobot2Line, label: 'Health Chatbot', path: '/chatbot' },
  { icon: RiHospitalLine, label: 'Symptom Checker', path: '/symptom-checker' },
  { icon: RiMapPin2Line, label: 'Facility Locator', path: '/facility-locator' },
  { icon: RiBookOpenLine, label: 'Health Education', path: '/health-education' },
  { icon: RiUserLine, label: 'Profile', path: '/profile' },
]

const diseases = [
  {
    id: 'dengue',
    label: 'Dengue',
    icon: RiVirusLine,
    color: '#1D9E75',
    lightBg: '#E1F5EE',
    gradient: 'linear-gradient(135deg, #1D9E75 0%, #2ECC9A 100%)',
    tagline: 'Ipinagkalat ng lamok na Aedes aegypti',
    description: 'Matuto tungkol sa pagkilala, pag-iwas, at paggamot ng Dengue.',
    chatTime: '~5 minuto',
    quickFacts: ['Peak season: Hunyo–Nobyembre', 'BAWAL ang Aspirin at Ibuprofen', 'Libre ang dengue test sa DOH'],
    suggestedQuestions: ['Ano ang symptoms ng dengue?', 'Kailan ako dapat pumunta sa ospital?', 'Ano ang pagkakaiba ng dengue sa flu?'],
    tip: 'BAWAL uminom ng Aspirin o Ibuprofen kung may dengue — nagpapalala ng pagdudugo.',
    sources: [
      { label: 'DOH Dengue Guidelines', url: 'https://doh.gov.ph/dengue' },
      { label: 'WHO Dengue Fact Sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue' },
      { label: 'CDC Dengue', url: 'https://www.cdc.gov/dengue' },
      { label: 'PhilHealth Coverage', url: 'https://www.philhealth.gov.ph' },
    ],
  },
  {
    id: 'tb',
    label: 'Tuberculosis (TB)',
    icon: RiLungsLine,
    color: '#534AB7',
    lightBg: '#EEEDFE',
    gradient: 'linear-gradient(135deg, #534AB7 0%, #7B6FD4 100%)',
    tagline: 'May LIBRENG gamot sa lahat ng health center',
    description: 'Alamin ang tungkol sa TB — nakakahawa ba? May lunas ba?',
    chatTime: '~6 minuto',
    quickFacts: ['LIBRE ang TB gamot sa lahat ng DOTS center', '6 buwan ang treatment — huwag huminto', 'Pilipinas #4 sa mundo sa TB burden'],
    suggestedQuestions: ['Nakakahawa ba ang TB sa paghawak?', 'Libre ba talaga ang gamot sa DOH?', 'Ano ang side effects ng TB meds?'],
    tip: 'Huwag huminto sa gamot kahit okay na — nagdudulot ng drug-resistant TB (MDR-TB).',
    sources: [
      { label: 'DOH National TB Program', url: 'https://doh.gov.ph/national-tuberculosis-program' },
      { label: 'WHO TB Fact Sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/tuberculosis' },
      { label: 'CDC TB Information', url: 'https://www.cdc.gov/tb' },
      { label: 'PhilHealth TB Coverage', url: 'https://www.philhealth.gov.ph' },
    ],
  },
  {
    id: 'hypertension',
    label: 'Hypertension',
    icon: RiHeartLine,
    color: '#E65100',
    lightBg: '#FFF3E0',
    gradient: 'linear-gradient(135deg, #E65100 0%, #FF8C00 100%)',
    tagline: 'Ang "silent killer" — karamihan walang nararamdaman',
    description: 'Alamin kung bakit mapanganib ang mataas na BP at paano ito kontrolin.',
    chatTime: '~5 minuto',
    quickFacts: ['1 sa 4 adult Pilipino ay may hypertension', 'Normal BP: wala pang 120/80 mmHg', 'Libre ang BP check sa lahat ng BHC'],
    suggestedQuestions: ['Ano ang normal na blood pressure?', 'Anong pagkain ang nagpapababa ng BP?', 'Kailangan ko bang uminom ng maintenance?'],
    tip: 'Ang hypertension ay "silent killer" — karamihan walang nararamdaman hanggang may stroke o heart attack na.',
    sources: [
      { label: 'DOH Hypertension Guidelines', url: 'https://doh.gov.ph/hypertension' },
      { label: 'WHO Hypertension Fact Sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/hypertension' },
      { label: 'PhilHealth Coverage', url: 'https://www.philhealth.gov.ph' },
      { label: 'Philippine Heart Center', url: 'https://www.phc.gov.ph' },
    ],
  },
]

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

function formatDateLabel(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Ngayon'
  if (diffDays === 1) return 'Kahapon'
  if (diffDays < 7) return `${diffDays} araw na nakalipas`
  return date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })
}

function getDatePrefix(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  date.setHours(date.getHours() + 8)
  return date.toISOString().split('T')[0]
}

export default function Chatbot() {
  const navigate = useNavigate()
  const active = '/chatbot'
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

  const [selectedDisease, setSelectedDisease] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationHistory, setConversationHistory] = useState([])
  const [showSources, setShowSources] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [selectedHistoryId, setSelectedHistoryId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [hoveredId, setHoveredId] = useState(null)
  useEffect(() => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if (!username || !token) {
      navigate('/login')
    }
  }, [])

  const disease = diseases.find(d => d.id === selectedDisease)
  const { t } = useLanguage()

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (!username) return
    API.get(`/history/${username}`).then(res => setChatHistory(res.data)).catch(() => {})
  }, [])

  const refreshHistory = () => {
    const username = localStorage.getItem('username')
    if (!username) return
    API.get(`/history/${username}`).then(res => setChatHistory(res.data)).catch(() => {})
  }

  const groupedHistory = () => {
    const groups = {}
    const seen = new Set()
    chatHistory.forEach(item => {
      const key = `${item.disease}_${formatDateLabel(item.timestamp)}`
      if (seen.has(key)) return
      seen.add(key)
      const label = formatDateLabel(item.timestamp)
      if (!groups[label]) groups[label] = []
      groups[label].push(item)
    })
    return groups
  }

  const getSessionTitle = (item) => {
    if (item.title) return item.title
    const d = diseases.find(dis => dis.id === item.disease)
    return d?.label || item.disease
  }

  const getSessionPreview = (item) => {
    return item.question?.slice(0, 35) + (item.question?.length > 35 ? '...' : '')
  }

  const openHistoryItem = (item) => {
    const d = diseases.find(dis => dis.id === item.disease)
    if (!d) return
    const dateLabel = formatDateLabel(item.timestamp)
    const hid = `${item.disease}_${dateLabel}`
    const relevantMsgs = chatHistory
      .filter(h => h.disease === item.disease && formatDateLabel(h.timestamp) === dateLabel)
      .reverse()
    const builtMessages = []
    const rebuiltHistory = []
    relevantMsgs.forEach(h => {
      builtMessages.push({ id: Math.random(), role: 'user', text: h.question, suggestedQuestions: [] })
      builtMessages.push({ id: Math.random(), role: 'bot', text: h.response, suggestedQuestions: [] })
      rebuiltHistory.push({ role: 'user', content: h.question })
      rebuiltHistory.push({ role: 'assistant', content: h.response })
    })
    setSelectedDisease(item.disease)
    setMessages(builtMessages)
    setConversationHistory(rebuiltHistory)
    setShowSources(false)
    setSelectedHistoryId(hid)
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }, 100)
  }

  const deleteSession = async (e, item) => {
    e.stopPropagation()
    e.preventDefault()
    const confirmed = window.confirm('Sigurado ka bang gusto mong burahin ang conversation na ito?')
    if (!confirmed) return
    const datePrefix = getDatePrefix(item.timestamp)
    const username = localStorage.getItem('username')
    const hid = `${item.disease}_${formatDateLabel(item.timestamp)}`
    try {
      await API.delete(`/history/session/${username}/${item.disease}/${datePrefix}`)
      if (selectedHistoryId === hid) {
        setSelectedDisease(null)
        setMessages([])
        setConversationHistory([])
        setSelectedHistoryId(null)
      }
      refreshHistory()
    } catch {}
  }

  const startRename = (e, item) => {
    e.stopPropagation()
    const hid = `${item.disease}_${formatDateLabel(item.timestamp)}`
    setEditingId(hid)
    setEditingTitle(item.title || diseases.find(d => d.id === item.disease)?.label || item.disease)
  }

  const saveRename = async (e, item) => {
    e.stopPropagation()
    try {
      await API.patch(`/history/${item.id}/title`, { title: editingTitle })
      setEditingId(null)
      refreshHistory()
    } catch {}
  }

  const cancelRename = (e) => {
    e.stopPropagation()
    setEditingId(null)
    setEditingTitle('')
  }

  const selectDisease = async (id) => {
    const d = diseases.find(dis => dis.id === id)
    setSelectedDisease(id)
    setMessages([])
    setConversationHistory([])
    setIsTyping(true)
    setShowSources(false)
    setSelectedHistoryId(null)
    try {
      const username = localStorage.getItem('username')
      const res = await API.post('/chat', {
        username,
        disease: id,
        message: 'Simulan ang conversation. Mag-introduce ka at magtanong para malaman kung ano ang nararamdaman ng user.',
        history: [],
        skip_save: true,
      })
      const botReply = res.data.response || 'Kamusta! Ako si HealthBot. Ano ang nararamdaman mo?'
      const suggested = res.data.suggested_questions || d.suggestedQuestions
      setIsTyping(false)
      setTimeout(() => inputRef.current?.focus(), 50)
      setMessages([{ id: Date.now(), role: 'bot', text: botReply, suggestedQuestions: suggested }])
      setConversationHistory([
        { role: 'user', content: 'Simulan ang conversation.' },
        { role: 'assistant', content: botReply }
      ])
      refreshHistory()
    } catch {
      setIsTyping(false)
      setTimeout(() => inputRef.current?.focus(), 50)
      setMessages([{ id: Date.now(), role: 'bot', text: 'Kamusta! Ako si HealthBot, ang iyong gabay para sa ' + d.label + '. Ano ang nararamdaman mo ngayon?', suggestedQuestions: d.suggestedQuestions }])
    }
  }

  const sendMessage = async (text) => {
    const userMessage = (text || input).trim()
    if (!userMessage || isTyping) return
    setInput('')
    inputRef.current?.focus()
    const newMessages = [...messages, { id: Date.now(), role: 'user', text: userMessage, suggestedQuestions: [] }]
    setMessages(newMessages)
    setIsTyping(true)
    const newHistory = [...conversationHistory, { role: 'user', content: userMessage }]
    try {
      const username = localStorage.getItem('username')
      const res = await API.post('/chat', {
        username,
        disease: selectedDisease,
        message: userMessage,
        history: newHistory,
        idempotency_key: crypto.randomUUID(),
      })
      const botReply = res.data.response || 'Pasensya na, hindi ko naintindihan. Ulitin mo nga?'
      const suggested = res.data.suggested_questions || []
      setIsTyping(false)
      inputRef.current?.focus()
      setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: botReply, suggestedQuestions: suggested }])
      setConversationHistory([...newHistory, { role: 'assistant', content: botReply }])
      refreshHistory()
    } catch {
      setIsTyping(false)
      inputRef.current?.focus()
      setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: 'May error sa connection. Subukan ulit.', suggestedQuestions: [] }])
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  const reset = () => {
    setSelectedDisease(null)
    setMessages([])
    setConversationHistory([])
    setInput('')
    setShowSources(false)
    setSelectedHistoryId(null)
  }

  const groups = groupedHistory()

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F3FF] font-sans">

      {/* Sidebar */}
      <div className="w-[240px] shrink-0 bg-white border-r border-gray-100 flex flex-col h-full" style={{ boxShadow: '2px 0 12px rgba(83,74,183,0.06)' }}>
        <div className="px-3 pt-6 pb-2 shrink-0">
          <div className="flex items-center gap-2 px-2 mb-6 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-8 h-8 rounded-full bg-[#534AB7] flex items-center justify-center"><RiHeartPulseLine className="text-white text-sm" /></div>
            <span className="text-[#534AB7] font-semibold text-base">HealthBridge</span>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item, i) => {
              const isActive = active === item.path
              return (
                <button key={i} onClick={() => navigate(item.path)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left relative ${isActive ? 'bg-[#EEEDFE] text-[#534AB7]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#534AB7] rounded-r-full" />}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-[#534AB7]' : 'bg-gray-100'}`}><item.icon className={`text-sm ${isActive ? 'text-white' : 'text-gray-400'}`} /></div>
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* History */}
        {Object.keys(groups).length > 0 && (
          <div className="flex-1 overflow-y-auto px-3 py-2 min-h-0">
            <div className="flex items-center gap-2 px-2 mb-2 mt-1">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                <RiHistoryLine className="text-xs" /> History
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
            {Object.entries(groups).map(([dateLabel, items]) => (
              <div key={dateLabel} className="mb-3">
                <p className="text-xs text-gray-400 px-2 mb-1 font-medium">{dateLabel}</p>
                {items.map((item, i) => {
                  const d = diseases.find(dis => dis.id === item.disease)
                  const hid = `${item.disease}_${formatDateLabel(item.timestamp)}`
                  const isSelected = selectedHistoryId === hid
                  const isEditing = editingId === hid
                  const isHovered = hoveredId === hid
                  return (
                    <div
                      key={i}
                      className={`w-full text-left px-2 py-2 rounded-xl mb-1 transition-all border cursor-pointer group ${isSelected ? 'border-current' : 'border-transparent hover:bg-gray-50'}`}
                      style={isSelected ? { background: d?.lightBg, borderColor: d?.color + '40' } : {}}
                      onClick={(e) => { if (!isEditing) openHistoryItem(item) }}
                      onMouseEnter={() => setHoveredId(hid)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {isEditing ? (
                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                          <input
                            autoFocus
                            value={editingTitle}
                            onChange={e => setEditingTitle(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') saveRename(e, item); if (e.key === 'Escape') cancelRename(e) }}
                            className="flex-1 text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none"
                          />
                          <button onClick={e => saveRename(e, item)} className="text-green-500 hover:text-green-600 p-0.5"><RiCheckLine className="text-sm" /></button>
                          <button onClick={cancelRename} className="text-gray-400 hover:text-gray-600 p-0.5"><RiCloseLine className="text-sm" /></button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 mb-0.5">
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d?.color }} />
                            <span className="text-xs font-medium text-gray-700 flex-1 truncate">{getSessionTitle(item)}</span>
                            {(isHovered || isSelected) && (
                              <div className="flex items-center gap-0.5 shrink-0">
                                <button onClick={e => startRename(e, item)} className="p-0.5 rounded text-gray-400 hover:text-[#534AB7] hover:bg-[#EEEDFE] transition">
                                  <RiPencilLine className="text-xs" />
                                </button>
                                <button onClick={e => deleteSession(e, item)} className="p-0.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition">
                                  <RiDeleteBinLine className="text-xs" />
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 truncate pl-4">{getSessionPreview(item)}</p>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}

        <div className="px-3 pb-4 shrink-0 border-t border-gray-100 pt-2 mt-auto">
          <button onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            navigate('/')
          }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all w-full">
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><RiLogoutBoxLine className="text-sm" /></div>
           {t.logout}
        </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Disease Selection */}
        {!selectedDisease && (
          <div className="flex-1 overflow-y-auto px-8 py-8">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp} className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#534AB7] rounded-xl flex items-center justify-center"><RiRobot2Line className="text-white text-xl" /></div>
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{t.chatbot_title}</h1>
                    <p className="text-sm text-gray-400">{t.chatbot_subtitle}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-4 mb-6">
                {diseases.map((d, idx) => (
                  <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ scale: 1.01, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }} whileTap={{ scale: 0.99 }} onClick={() => selectDisease(d.id)} className="bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 flex" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                    <div className="w-2 shrink-0" style={{ background: d.gradient }} />
                    <div className="w-28 shrink-0 flex items-center justify-center relative overflow-hidden" style={{ background: d.gradient }}>
                      <div className="absolute top-[-10px] right-[-10px] w-20 h-20 rounded-full bg-white/10" />
                      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}>
                        <d.icon className="text-white text-5xl relative z-10" />
                      </motion.div>
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">{d.label}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">{d.description}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg" style={{ background: d.lightBg, color: d.color }}><RiTimeLine className="text-xs" />{d.chatTime}</div>
                      </div>
                      <div className="flex gap-4 mb-3">
                        {d.quickFacts.map((fact, i) => (<div key={i} className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: d.color }} /><span className="text-xs text-gray-500">{fact}</span></div>))}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {d.suggestedQuestions.map((q, i) => (<span key={i} className="text-xs px-2.5 py-1 rounded-lg border border-gray-100 text-gray-500 bg-gray-50">{q}</span>))}
                      </div>
                    </div>
                    <div className="flex items-center px-5 shrink-0">
                      <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: d.color }}>{t.start} <RiArrowRightLine /></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
                {[
                  { icon: RiShieldCheckLine, color: 'text-[#1D9E75]', title: 'Batay sa DOH at WHO', desc: 'Verified na impormasyon' },
                  { icon: RiStethoscopeLine, color: 'text-[#534AB7]', title: 'Sa Filipino', desc: 'Madaling maintindihan' },
                  { icon: RiAlarmWarningLine, color: 'text-[#E65100]', title: 'Hindi diagnosis', desc: 'Para sa gabay lamang' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <item.icon className={`${item.color} text-2xl shrink-0`} />
                    <div><p className="text-xs font-semibold text-gray-700">{item.title}</p><p className="text-xs text-gray-400 mt-0.5">{item.desc}</p></div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-6">
                <div className="flex items-center gap-2 shrink-0"><RiAlarmWarningLine className="text-red-500 text-lg" /><p className="text-xs font-semibold text-red-600">Emergency Hotlines:</p></div>
                {[{ label: 'DOH Hotline', number: '1555' }, { label: 'Red Cross', number: '143' }, { label: 'NDRRMC', number: '911' }, { label: 'NCMH', number: '1553' }].map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5"><span className="text-xs text-gray-500">{h.label}:</span><span className="text-xs font-bold text-red-500">{h.number}</span></div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Chat Window */}
        {selectedDisease && disease && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">

            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 shrink-0" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <button onClick={reset} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"><RiArrowLeftLine className="text-gray-500 text-sm" /></button>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: disease.gradient }}><disease.icon className="text-white text-xl" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{disease.label} Assistant</p>
                <p className="text-xs text-gray-400">AI-powered • Batay sa DOH at WHO guidelines</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowSources(!showSources)}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition"
                  style={{ borderColor: disease.color, color: disease.color, background: showSources ? disease.lightBg : 'white' }}>
                  <RiExternalLinkLine /> Mga Sources
                </button>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-1.5 max-w-xs">
                  <RiInformationLine className="text-amber-500 text-sm shrink-0" />
                  <p className="text-xs text-amber-700 truncate">{disease.tip}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#1D9E75] font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />{t.online}
                </div>
              </div>
            </div>

            {/* Sources panel */}
            <AnimatePresence>
              {showSources && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
                  <p className="text-xs font-semibold text-gray-700 mb-3">📚 Verified Sources para sa {disease.label}:</p>
                  <div className="flex flex-wrap gap-2">
                    {disease.sources.map((source, i) => (
                      <a key={i} href={source.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border transition hover:scale-105"
                        style={{ borderColor: disease.color, color: disease.color, background: disease.lightBg }}>
                        <RiExternalLinkLine className="text-xs" />{source.label}
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">⚠️ Para sa aktwal na diagnosis at gamutan, kumonsulta sa isang lisensyadong doktor.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 min-h-0">
              <AnimatePresence>
                {messages.map((msg, msgIdx) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <div className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {msg.role === 'bot' && (
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: disease.gradient }}>
                          <disease.icon className="text-white text-sm" />
                        </div>
                      )}
                      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'}`}
                        style={msg.role === 'user' ? { background: disease.color } : { boxShadow: '0 2px 8px rgba(134, 145, 188, 0.06)' }}>
                        {msg.text}
                      </div>
                    </div>
                    {msg.role === 'bot' && msg.suggestedQuestions?.length > 0 && msgIdx === messages.length - 1 && !isTyping && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-2 mt-3 ml-11">
                        <p className="text-xs text-gray-400">{t.suggested}</p>
                        <div className="flex flex-wrap gap-2">
                          {msg.suggestedQuestions.map((q, i) => (
                            <button key={i} onClick={() => sendMessage(q)}
                              className="text-xs px-3 py-2 rounded-xl border-2 text-left transition hover:scale-105 active:scale-95"
                              style={{ borderColor: disease.color, color: disease.color, background: disease.lightBg }}>
                              {q}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: disease.gradient }}><disease.icon className="text-white text-sm" /></div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    {[0, 1, 2].map(i => (<motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="w-2 h-2 rounded-full" style={{ background: disease.color }} />))}
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 px-6 py-4 shrink-0">
              <div className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 transition-all focus-within:border-gray-400" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.type_message}
                  className="flex-1 text-sm outline-none text-gray-800 bg-white chatbot-input"
                  style={{ color: '#1f2937', caretColor: '#1f2937' }}
                  readOnly={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition disabled:opacity-40"
                  style={{ background: disease.gradient }}>
                  <RiSendPlane2Line className="text-white text-sm" />
                </motion.button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400">{t.press_enter}</p>
                <button onClick={() => navigate('/symptom-checker')}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl transition"
                  style={{ background: disease.lightBg, color: disease.color }}>
                  <RiHospitalLine /> {t.check_symptoms}
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}