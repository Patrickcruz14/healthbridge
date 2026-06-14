import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHeartPulseLine, RiRobot2Line, RiHospitalLine,
  RiMapPin2Line, RiBookOpenLine, RiUserLine,
  RiLogoutBoxLine, RiSendPlane2Line, RiArrowLeftLine,
  RiVirusLine, RiLungsLine, RiHeartLine,
  RiShieldCheckLine, RiArrowRightLine, RiTimeLine,
  RiInformationLine, RiAlarmWarningLine, RiStethoscopeLine
} from 'react-icons/ri'

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
    topics: 6,
    quickFacts: [
      'Peak season: Hunyo–Nobyembre',
      'BAWAL ang Aspirin at Ibuprofen',
      'Libre ang dengue test sa DOH',
    ],
    suggestedQuestions: [
      'Ano ang symptoms ng dengue?',
      'Kailan ako dapat pumunta sa ospital?',
      'Ano ang pagkakaiba ng dengue sa flu?',
    ],
    tip: 'BAWAL uminom ng Aspirin o Ibuprofen kung may dengue — nagpapalala ng pagdudugo.',
    systemPrompt: `Ikaw si HealthBot, isang health information assistant ng HealthBridge na espesyalista sa Dengue. Nakikipag-usap ka sa mga Filipinong may limitadong access sa healthcare.

ESTILO NG PAKIKIPAG-USAP:
- Sumagot sa Filipino/Tagalog lagi
- Maikli at direkta — 2-3 sentences lang bawat sagot
- Palaging magtanong ng ONE follow-up question sa dulo
- Friendly pero informative — parang kaibigan na nurse
- Huwag mag-overwhelm — isa-isang topic lang

KOMPREHENSIBONG KAALAMAN SA DENGUE:

BASIC INFO:
- Dulot ng dengue virus, ipinagkalat ng lamok na Aedes aegypti
- Hindi nakakahawa sa tao-tao — sa lamok lang
- 4 serotypes: DENV-1, DENV-2, DENV-3, DENV-4
- Pilipinas: top 8 dengue-endemic countries (WHO 2023)
- Peak season: tag-ulan (Hunyo-Nobyembre)

STAGES NG DENGUE:
- Febrile phase (Day 1-3): Mataas na lagnat 38.5-40C, sakit ng ulo, likod ng mata, kasukasuan
- Critical phase (Day 4-6): Bumababa ang lagnat PERO mapanganib — platelet count bumabagsak
- Recovery phase (Day 7+): Unti-unting gumaling

SINTOMAS:
- Biglaang mataas na lagnat (38.5C+)
- Matinding sakit ng kasukasuan at muscles — "breakbone fever"
- Sakit sa likod ng mata
- Pantal sa katawan (lumalabas Day 3-5)
- Pagdudugo: ilong, gilagid, pantal na may dugo
- Pagkawala ng gana kumain, pagsusuka

WARNING SIGNS (EMERGENCY):
- Matinding sakit ng tiyan
- Paulit-ulit na pagsusuka (3x+)
- May dugo sa suka o dumi
- Biglaang pagbaba ng temperatura + panginginig
- Hindi na makatulog o pagkalito
- Nanghihina nang sobra
- Nanlalabi ang labi o kuko

GAMOT AT TREATMENT:
- Walang specific na antiviral para sa dengue (WHO 2023)
- Paracetamol 500mg tuwing 4-6 oras (MAX 4 beses/araw)
- BAWAL: Aspirin, Ibuprofen, Mefenamic acid — nagpapalala ng pagdudugo
- Mag-rest nang sapat
- IV fluids sa ospital kung severe

HYDRATION:
- 8-10 baso ng tubig/araw (DOH recommendation)
- ORS — 1 sachet sa 1 litro ng tubig
- Coconut water — natural electrolytes
- BAWAL: Softdrinks, energy drinks, alak

PREVENTION — 4S Strategy ng DOH:
- Search and destroy breeding sites
- Self-protection (mahabang damit, DEET repellent)
- Seek early consultation
- Say no to indiscriminate fogging

LIBRE NA SERBISYO:
- Dengue consultation at blood test — libre sa government hospitals
- PhilHealth covers dengue hospitalization
- DOH Hotline: 1555

SOURCES: DOH Philippines Dengue Guidelines 2023, WHO Dengue Guidelines 2023, Mayo Clinic, CDC

RULES:
- HINDI nagda-diagnose — nagrerekomenda lang na kumonsulta
- Emergency signs → sabihing pumunta agad sa ER
- Laging i-cite ang source ng impormasyon
- Kung hindi tungkol sa Dengue → i-redirect
- Palaging may follow-up question sa dulo`,
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
    topics: 6,
    quickFacts: [
      'LIBRE ang TB gamot sa lahat ng DOTS center',
      '6 buwan ang treatment — huwag huminto',
      'Pilipinas #4 sa mundo sa TB burden',
    ],
    suggestedQuestions: [
      'Nakakahawa ba ang TB sa paghawak?',
      'Libre ba talaga ang gamot sa DOH?',
      'Ano ang side effects ng TB meds?',
    ],
    tip: 'Huwag huminto sa gamot kahit okay na — nagdudulot ng drug-resistant TB (MDR-TB).',
    systemPrompt: `Ikaw si HealthBot, isang health information assistant ng HealthBridge na espesyalista sa Tuberculosis (TB). Nakikipag-usap ka sa mga Filipinong may limitadong access sa healthcare.

ESTILO NG PAKIKIPAG-USAP:
- Sumagot sa Filipino/Tagalog lagi
- Maikli at direkta — 2-3 sentences lang bawat sagot
- Palaging magtanong ng ONE follow-up question sa dulo
- Friendly pero informative — parang kaibigan na nurse
- Alisin ang stigma ng TB — ipaliwanag na ito ay nagagamot
- Huwag mag-overwhelm — isa-isang topic lang

KOMPREHENSIBONG KAALAMAN SA TB:

BASIC INFO:
- Dulot ng bacteria na Mycobacterium tuberculosis
- Nakakahawa sa hangin — droplets kapag umubo, bumuga, kumanta
- HINDI nakakahawa sa: paghawak ng kamay, pagkain, toilet seats, damit
- Pilipinas: #4 sa mundo sa TB burden (WHO Global TB Report 2023)
- 800,000+ bagong kaso bawat taon sa Pilipinas (DOH 2023)
- MAGAGAMOT — 95% cure rate kung kumpleto ang treatment

SINTOMAS:
- Ubo na tumatagal ng 2 linggo o higit (pinaka-classic sign)
- May dugo sa plema (hemoptysis)
- Labis na pagpapawis sa gabi (night sweats)
- Biglaang pagbaba ng timbang nang walang dahilan
- Mababang lagnat na paulit-ulit — lalo sa hapon
- Matinding pagod kahit hindi nag-eehersisyo

TREATMENT — DOTS PROGRAM:
- 6 buwan ang standard treatment (DOH/WHO)
- Intensive phase: 2 buwan — 4 antibiotics (HRZE)
- Continuation phase: 4 buwan — 2 antibiotics (HR)
- KRITIKAL: Huwag huminto kahit okay na

LIBRE NA SERBISYO:
- Lahat ng TB medicines — LIBRE sa lahat ng DOTS centers
- Diagnosis tests — LIBRE
- DOH Hotline: 1555

SOURCES: DOH National TB Program Guidelines 2023, WHO Global TB Report 2023, CDC TB Guidelines

RULES:
- HINDI nagda-diagnose — nagrerekomenda lang na kumonsulta
- Hemoptysis o hirap huminga → ER agad
- Laging i-cite ang source
- Alisin ang stigma — TB ay hindi kahihiyan, nagagamot ito
- Palaging may follow-up question sa dulo`,
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
    topics: 6,
    quickFacts: [
      '1 sa 4 adult Pilipino ay may hypertension',
      'Normal BP: wala pang 120/80 mmHg',
      'Libre ang BP check sa lahat ng BHC',
    ],
    suggestedQuestions: [
      'Ano ang normal na blood pressure?',
      'Anong pagkain ang nagpapababa ng BP?',
      'Kailangan ko bang uminom ng maintenance?',
    ],
    tip: 'Ang hypertension ay "silent killer" — karamihan walang nararamdaman hanggang may stroke o heart attack na.',
    systemPrompt: `Ikaw si HealthBot, isang health information assistant ng HealthBridge na espesyalista sa Hypertension (Mataas na Blood Pressure). Nakikipag-usap ka sa mga Filipinong may limitadong access sa healthcare.

ESTILO NG PAKIKIPAG-USAP:
- Sumagot sa Filipino/Tagalog lagi
- Maikli at direkta — 2-3 sentences lang bawat sagot
- Palaging magtanong ng ONE follow-up question sa dulo
- Friendly pero informative — parang kaibigan na nurse
- I-emphasize na kontrolable ang hypertension
- Huwag mag-overwhelm — isa-isang topic lang

KOMPREHENSIBONG KAALAMAN SA HYPERTENSION:

BASIC INFO:
- Mataas na presyon ng dugo sa mga ugat — persistently 130/80 mmHg o higit
- "Silent killer" — karamihan walang sintomas hanggang sa may komplikasyon na
- 1 sa 4 adult Filipinos ay may hypertension (DOH 2023)
- Leading cause ng stroke at heart attack sa Pilipinas

BP CLASSIFICATION:
- Normal: wala pang 120/80 mmHg
- Stage 1: 130-139 / 80-89 mmHg
- Stage 2: 140/90 mmHg o higit
- Hypertensive Crisis: 180/120 mmHg o higit — EMERGENCY

LIFESTYLE CHANGES:
- DASH Diet: maraming prutas, gulay, whole grains
- Bawasan ang asin: wala pang 2,300mg sodium/araw
- Exercise: 150 minutes moderate activity/linggo
- Iwasan ang alak at sigarilyo

LIBRE NA SERBISYO:
- BP monitoring — libre sa lahat ng barangay health centers
- DOH Hotline: 1555

SOURCES: DOH Philippines Hypertension Guidelines 2020, ACC/AHA 2017, WHO 2023

RULES:
- HINDI nagda-diagnose — nagrerekomenda lang na kumonsulta
- Hypertensive crisis (180/120+) → ER agad
- Laging i-cite ang source ng impormasyon
- Palaging may follow-up question sa dulo`,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
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

  const disease = diseases.find(d => d.id === selectedDisease)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const selectDisease = async (id) => {
    const d = diseases.find(dis => dis.id === id)
    setSelectedDisease(id)
    setMessages([])
    setConversationHistory([])
    setIsTyping(true)

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: d.systemPrompt },
            { role: 'user', content: 'Simulan ang conversation. Mag-introduce ka at magtanong para malaman kung ano ang nararamdaman ng user.' }
          ],
          temperature: 0.7,
          max_tokens: 500,
        })
      })
      const data = await response.json()
      const botReply = data.choices?.[0]?.message?.content || 'Kamusta! Ako si HealthBot. Ano ang nararamdaman mo?'
      setIsTyping(false)
      setMessages([{ id: Date.now(), role: 'bot', text: botReply }])
      setConversationHistory([
        { role: 'user', content: 'Simulan ang conversation.' },
        { role: 'assistant', content: botReply }
      ])
    } catch {
      setIsTyping(false)
      setMessages([{ id: Date.now(), role: 'bot', text: 'Kamusta! Ako si HealthBot, ang iyong gabay para sa ' + d.label + '. Ano ang nararamdaman mo ngayon?' }])
    }
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const sendMessage = async (text) => {
    const userMessage = (text || input).trim()
    if (!userMessage || isTyping) return
    setInput('')
    const newMessages = [...messages, { id: Date.now(), role: 'user', text: userMessage }]
    setMessages(newMessages)
    setIsTyping(true)
    const newHistory = [...conversationHistory, { role: 'user', content: userMessage }]

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: disease.systemPrompt },
            ...newHistory
          ],
          temperature: 0.7,
          max_tokens: 500,
        })
      })
      const data = await response.json()
      const botReply = data.choices?.[0]?.message?.content || 'Pasensya na, hindi ko naintindihan. Ulitin mo nga?'
      setIsTyping(false)
      setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: botReply }])
      setConversationHistory([...newHistory, { role: 'assistant', content: botReply }])
    } catch {
      setIsTyping(false)
      setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: 'May error sa connection. Subukan ulit.' }])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const reset = () => {
    setSelectedDisease(null)
    setMessages([])
    setConversationHistory([])
    setInput('')
  }

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

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Disease Selection */}
        {!selectedDisease && (
          <div className="flex-1 overflow-y-auto px-8 py-8">
            <motion.div variants={stagger} initial="hidden" animate="show">

              {/* Header */}
              <motion.div variants={fadeUp} className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#534AB7] rounded-xl flex items-center justify-center">
                    <RiRobot2Line className="text-white text-xl" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Health Chatbot</h1>
                    <p className="text-sm text-gray-400">Piliin ang sakit na gusto mong pag-usapan sa Filipino</p>
                  </div>
                </div>
              </motion.div>

              {/* Disease Cards — Option A style */}
              <motion.div variants={fadeUp} className="flex flex-col gap-4 mb-6">
                {diseases.map((d, idx) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.01, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => selectDisease(d.id)}
                    className="bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 flex"
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                  >
                    {/* Left gradient strip */}
                    <div className="w-2 shrink-0" style={{ background: d.gradient }} />

                    {/* Icon area */}
                    <div className="w-28 shrink-0 flex items-center justify-center relative overflow-hidden"
                      style={{ background: d.gradient }}>
                      <div className="absolute top-[-10px] right-[-10px] w-20 h-20 rounded-full bg-white/10" />
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                      >
                        <d.icon className="text-white text-5xl relative z-10" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">{d.label}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">{d.description}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                          <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg"
                            style={{ background: d.lightBg, color: d.color }}>
                            <RiTimeLine className="text-xs" />
                            {d.chatTime}
                          </div>
                        </div>
                      </div>

                      {/* Quick facts */}
                      <div className="flex gap-4 mb-3">
                        {d.quickFacts.map((fact, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: d.color }} />
                            <span className="text-xs text-gray-500">{fact}</span>
                          </div>
                        ))}
                      </div>

                      {/* Suggested questions */}
                      <div className="flex gap-2 flex-wrap">
                        {d.suggestedQuestions.map((q, i) => (
                          <span key={i}
                            className="text-xs px-2.5 py-1 rounded-lg border border-gray-100 text-gray-500 bg-gray-50">
                            {q}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center px-5 shrink-0">
                      <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: d.color }}>
                        Simulan <RiArrowRightLine />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom info row */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <RiShieldCheckLine className="text-[#1D9E75] text-2xl shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Batay sa DOH at WHO</p>
                    <p className="text-xs text-gray-400 mt-0.5">Verified na impormasyon</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <RiStethoscopeLine className="text-[#534AB7] text-2xl shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Sa Filipino</p>
                    <p className="text-xs text-gray-400 mt-0.5">Madaling maintindihan</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <RiAlarmWarningLine className="text-[#E65100] text-2xl shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Hindi diagnosis</p>
                    <p className="text-xs text-gray-400 mt-0.5">Para sa gabay lamang</p>
                  </div>
                </div>
              </motion.div>

              {/* Emergency hotlines */}
              <motion.div variants={fadeUp}
                className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-6">
                <div className="flex items-center gap-2 shrink-0">
                  <RiAlarmWarningLine className="text-red-500 text-lg" />
                  <p className="text-xs font-semibold text-red-600">Emergency Hotlines:</p>
                </div>
                {[
                  { label: 'DOH Hotline', number: '1555' },
                  { label: 'Red Cross', number: '143' },
                  { label: 'NDRRMC', number: '911' },
                  { label: 'NCMH', number: '1553' },
                ].map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">{h.label}:</span>
                    <span className="text-xs font-bold text-red-500">{h.number}</span>
                  </div>
                ))}
              </motion.div>

            </motion.div>
          </div>
        )}

        {/* Chat Window */}
        {selectedDisease && disease && (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 shrink-0"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <button onClick={reset}
                className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                <RiArrowLeftLine className="text-gray-500 text-sm" />
              </button>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: disease.gradient }}>
                <disease.icon className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{disease.label} Assistant</p>
                <p className="text-xs text-gray-400">AI-powered • Batay sa DOH at WHO guidelines</p>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Tip */}
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-1.5 max-w-xs">
                  <RiInformationLine className="text-amber-500 text-sm shrink-0" />
                  <p className="text-xs text-amber-700 truncate">{disease.tip}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#1D9E75] font-medium ml-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {msg.role === 'bot' && (
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: disease.gradient }}>
                        <disease.icon className="text-white text-sm" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'}`}
                      style={msg.role === 'user'
                        ? { background: disease.gradient }
                        : { boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: disease.gradient }}>
                    <disease.icon className="text-white text-sm" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full"
                        style={{ background: disease.color }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Suggested questions — show only when messages is just 1 (opening message) */}
              {messages.length === 1 && !isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                  <p className="text-xs text-gray-400 ml-11">Mga madalas na tanong:</p>
                  <div className="flex flex-wrap gap-2 ml-11">
                    {disease.suggestedQuestions.map((q, i) => (
                      <button key={i}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-3 py-2 rounded-xl border-2 text-left transition hover:scale-105"
                        style={{ borderColor: disease.color, color: disease.color, background: disease.lightBg }}>
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-100 px-6 py-4 shrink-0">
              <div className="flex items-center gap-3 bg-[#F4F3FF] rounded-2xl px-4 py-3">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="I-type ang iyong sagot o tanong..."
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition disabled:opacity-40"
                  style={{ background: disease.gradient }}
                >
                  <RiSendPlane2Line className="text-white text-sm" />
                </motion.button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400">Press Enter para magpadala</p>
                <button onClick={() => navigate('/symptom-checker')}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl transition"
                  style={{ background: disease.lightBg, color: disease.color }}>
                  <RiHospitalLine /> I-check ang symptoms
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}