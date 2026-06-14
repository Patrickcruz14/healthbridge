import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHeartPulseLine, RiArrowRightLine, RiArrowLeftLine,
  RiMapPin2Line, RiShieldCheckLine, RiAlertLine,
  RiCheckLine, RiRobot2Line, RiHospitalLine,
  RiBookOpenLine, RiUserLine, RiLogoutBoxLine,
  RiMedicineBottleLine, RiShareLine,
  RiVirusLine, RiLungsLine, RiHeartLine, RiPrinterLine,
  RiFileTextLine, RiTimeLine, RiStethoscopeLine,
  RiFirstAidKitLine, RiInformationLine, RiAlarmWarningLine
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
    description: 'Mataas na lagnat, pantal, sakit ng kasukasuan',
    checkTime: '~3 minuto',
    symptomCount: 6,
    riskLevel: 'Mataas sa tag-ulan',
    riskColor: '#D97706',
    riskBg: '#FEF3C7',
    emergencyTip: 'Huwag uminom ng Aspirin o Ibuprofen kung may dengue.',
    quickFacts: ['Ipinagkalat ng Aedes aegypti', 'Peak: tag-ulan (Hunyo–Nobyembre)', 'Libre ang platelet check sa DOH'],
    symptoms: [
      { id: 'dengue_fever', label: 'Biglaang mataas na lagnat (38.5°C+)', emergency: false, reco: 'Paracetamol 500mg tuwing 4–6 oras. HUWAG uminom ng Aspirin o Ibuprofen. Mag-sponge bath ng maligamgam na tubig. Uminom ng hindi bababa sa 8 baso ng tubig/araw.', warning: 'Hindi bumababa ang lagnat pagkatapos ng 2 araw ng Paracetamol' },
      { id: 'dengue_rash', label: 'Pantal sa katawan (3–5 araw mula sa lagnat)', emergency: false, reco: 'Huwag kuskusin ang pantal. Mag-apply ng calamine lotion para sa pangangati. Magsuot ng maluwag na damit na cotton.', warning: 'Pantal na kumakalat nang mabilis at may kasamang pamamaga' },
      { id: 'dengue_pain', label: 'Matinding sakit ng kasukasuan, muscles, o likod ng mata', emergency: false, reco: 'Paracetamol para sa sakit — huwag Ibuprofen. Mag-cold compress sa likod ng mata. Mag-rest nang buo.', warning: 'Sakit na pumipigil sa normal na paggalaw' },
      { id: 'dengue_bleed', label: 'Pagdudugo (ilong, gilagid, pantal na may dugo)', emergency: true, reco: 'PUMUNTA AGAD SA ER. Warning sign ng severe dengue. Huwag mag-aspirin o ibuprofen.', warning: '🚨 EMERGENCY — Possible dengue hemorrhagic fever' },
      { id: 'dengue_vomit', label: 'Madalas na pagsusuka o hindi makakain/makainom', emergency: true, reco: 'PUMUNTA AGAD SA OSPITAL para sa IV fluids at platelet monitoring.', warning: '🚨 EMERGENCY — Possible dengue shock syndrome' },
      { id: 'dengue_abdomen', label: 'Matinding sakit ng tiyan o pamamaga ng tiyan', emergency: true, reco: 'PUMUNTA AGAD SA ER. Maaaring internal bleeding sign na ito.', warning: '🚨 EMERGENCY — Internal bleeding possible' },
    ],
  },
  {
    id: 'tb',
    label: 'Tuberculosis (TB)',
    icon: RiLungsLine,
    color: '#534AB7',
    lightBg: '#EEEDFE',
    gradient: 'linear-gradient(135deg, #534AB7 0%, #7B6FD4 100%)',
    tagline: 'Nakakahawa sa hangin — LIBRENG gamot sa DOH',
    description: 'Matagal na ubo, night sweats, pagbaba ng timbang',
    checkTime: '~4 minuto',
    symptomCount: 6,
    riskLevel: 'Mataas sa siksikang lugar',
    riskColor: '#7C3AED',
    riskBg: '#EDE9FE',
    emergencyTip: 'Ang TB ay magagamot — 6 na buwan ang treatment, LIBRE sa DOH.',
    quickFacts: ['Nakakahawa sa hangin (droplets)', 'DOTS treatment: libre sa lahat ng BHC', '1 in 4 Pilipino ay may latent TB'],
    symptoms: [
      { id: 'tb_cough', label: 'Ubo na tumatagal nang 2 linggo o higit pa', emergency: false, reco: 'Kumonsulta AGAD sa DOTS center o health center. Mag-sputum test para ma-confirm. Huwag mag-self-medicate ng antibiotics.', warning: 'May dugo sa plema o ubo na tumatagal nang higit sa 3 linggo' },
      { id: 'tb_sweat', label: 'Labis na pagpapawis sa gabi (night sweats)', emergency: false, reco: 'Itala ang frequency ng night sweats. Mag-palit ng damit sa gabi kung kinakailangan. Kumonsulta sa doktor para sa chest X-ray at sputum test.', warning: 'Night sweats na kasabay ng lagnat at pagbaba ng timbang' },
      { id: 'tb_weight', label: 'Biglaang pagbaba ng timbang nang walang dahilan', emergency: false, reco: 'Kumain ng high-protein, high-calorie na pagkain: itlog, karne, legumes, gatas. Mag-food journal. Kumonsulta agad.', warning: 'Bumaba ng 5kg o higit sa loob ng isang buwan' },
      { id: 'tb_fever', label: 'Mababang lagnat na paulit-ulit (lalo na sa hapon)', emergency: false, reco: 'Paracetamol para sa lagnat. Itala ang oras ng araw na may lagnat — ang afternoon fever ay classic TB sign. Kumonsulta agad.', warning: 'Lagnat na hindi bumababa sa loob ng 2 linggo' },
      { id: 'tb_fatigue', label: 'Matinding pagod kahit hindi nag-eehersisyo', emergency: false, reco: 'Magpahinga nang sapat. Kumain ng masustansyang pagkain. Huwag ipagpaliban ang konsultasyon.', warning: 'Pagod na kasabay ng ubo at night sweats' },
      { id: 'tb_blood', label: 'May dugo sa plema (hemoptysis)', emergency: true, reco: 'PUMUNTA AGAD SA ER O OSPITAL. Huwag mag-delay — maaaring advanced TB na ito.', warning: '🚨 EMERGENCY — Hemoptysis needs immediate medical evaluation' },
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
    description: 'Mataas na BP, sakit ng ulo, malabo ang paningin',
    checkTime: '~3 minuto',
    symptomCount: 6,
    riskLevel: 'Common sa 30+ taong gulang',
    riskColor: '#DC2626',
    riskBg: '#FEE2E2',
    emergencyTip: 'Normal na BP: below 120/80. 140/90+ ay already hypertension.',
    quickFacts: ['1 in 3 Pilipino ay may hypertension', 'Karamihan: walang nararamdaman', 'Libre ang BP check sa lahat ng BHC'],
    symptoms: [
      { id: 'htn_headache', label: 'Madalas na sakit ng ulo (lalo na sa likod ng ulo, umaga)', emergency: false, reco: 'Magpahinga sa tahimik at malamig na lugar. Paracetamol para sa sakit. Sukatin ang BP agad. Bawasan ang asin sa pagkain.', warning: 'Sakit ng ulo na kasabay ng malabo ang paningin at palpitations' },
      { id: 'htn_bp', label: 'BP reading na 140/90 mmHg o mas mataas', emergency: false, reco: 'Magpahinga ng 5–10 minuto bago muling sukatin. Iwasan ang caffeine at stress. Kung may maintenance medicine, inumin agad.', warning: 'BP na umabot sa 180/120 mmHg (hypertensive crisis)' },
      { id: 'htn_vision', label: 'Malabo o double ang paningin', emergency: false, reco: 'Magpahinga ang mata. Sukatin ang BP agad. Kung may prescribed na BP medication, inumin. Kumonsulta sa doktor kung madalas nangyayari.', warning: 'Biglaan at matinding pagkalabo ng paningin — possible hypertensive emergency' },
      { id: 'htn_palpit', label: 'Palpitations o kabog ng puso', emergency: false, reco: 'Mag-deep breathing exercise: inhale 4 sec, exhale 6 sec. Iwasan ang caffeine, energy drinks, at sigarilyo. Sukatin ang BP.', warning: 'Palpitations na tumatagal nang higit sa 30 minuto o may kasamang sakit ng dibdib' },
      { id: 'htn_dizzy', label: 'Pagkahilo o pakiramdam na mabibigla', emergency: false, reco: 'Umupo o humiga agad. Huwag biglang tumayo. Uminom ng tubig. Sukatin ang BP.', warning: 'Hilo na may kasamang pamamanhid ng mukha o kamay — possible stroke sign' },
      { id: 'htn_crisis', label: 'BP na 180/120+ na may kasamang matinding sintomas', emergency: true, reco: 'PUMUNTA AGAD SA ER. Hypertensive crisis ito. Huwag mag-drive — humingi ng tulong.', warning: '🚨 EMERGENCY — Hypertensive crisis. Risk ng stroke at heart attack' },
    ],
  },
]

const urgencyConfig = {
  low: { label: 'Low Risk — Pwedeng mag-home care muna', sublabel: 'Subaybayan ang symptoms. Kumonsulta kung lumala.', color: '#1D9E75', bg: '#E1F5EE', border: '#1D9E75', icon: '🟢' },
  moderate: { label: 'Moderate Risk — Kumonsulta sa loob ng 1–2 araw', sublabel: 'Huwag ipagpaliban ang pagpunta sa health center.', color: '#D97706', bg: '#FEF3C7', border: '#D97706', icon: '🟡' },
  high: { label: 'High Risk — Pumunta AGAD sa health center', sublabel: 'Huwag mag-delay. Maaaring emergency ito.', color: '#EF4444', bg: '#FEE2E2', border: '#EF4444', icon: '🔴' },
}

function getUrgency(symptoms, duration, severity, disease) {
  const hasEmergency = disease?.symptoms.filter(s => s.emergency).some(s => symptoms.includes(s.id))
  if (hasEmergency || severity === 'severe') return 'high'
  if (duration === 'week_plus' || severity === 'moderate' || symptoms.length >= 3) return 'moderate'
  return 'low'
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function SymptomChecker() {
  const navigate = useNavigate()
  const active = '/symptom-checker'
  const [step, setStep] = useState(0)
  const [selectedDisease, setSelectedDisease] = useState(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [duration, setDuration] = useState(null)
  const [severity, setSeverity] = useState(null)
  const [showEmergency, setShowEmergency] = useState(false)

  const disease = diseases.find(d => d.id === selectedDisease)

  const toggleSymptom = (id) => {
    const updated = selectedSymptoms.includes(id)
      ? selectedSymptoms.filter(s => s !== id)
      : [...selectedSymptoms, id]
    setSelectedSymptoms(updated)
    const hasEmergency = disease?.symptoms.filter(s => s.emergency).some(s => updated.includes(s.id))
    setShowEmergency(hasEmergency)
  }

  const handleAnalyze = () => {
    setStep(3)
    setTimeout(() => setStep(4), 2500)
  }

  const reset = () => {
    setStep(0); setSelectedDisease(null); setSelectedSymptoms([])
    setDuration(null); setSeverity(null); setShowEmergency(false)
  }

  const urgency = disease ? getUrgency(selectedSymptoms, duration, severity, disease) : 'low'
  const urgencyInfo = urgencyConfig[urgency]
  const confirmedSymptoms = disease?.symptoms.filter(s => selectedSymptoms.includes(s.id)) ?? []

  const handleShare = async () => {
    const text = `HealthBridge Symptom Check\n\nSakit: ${disease?.label}\nUrgency: ${urgencyInfo.label}\n\nNa-confirm na Symptoms:\n${confirmedSymptoms.map(s => `• ${s.label}`).join('\n')}\n\nBatay sa DOH at WHO guidelines.`
    if (navigator.share) { await navigator.share({ title: 'HealthBridge Result', text }) }
    else { navigator.clipboard.writeText(text); alert('Na-copy sa clipboard!') }
  }

  return (
    <div className="flex min-h-screen font-sans" style={{ background: 'linear-gradient(145deg, #F4F3FF 0%, #EEF2FF 50%, #F0FDF4 100%)' }}>

      {/* Sidebar */}
      <div className="w-[240px] shrink-0 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-3"
        style={{ boxShadow: '2px 0 16px rgba(83,74,183,0.08)' }}>
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
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-8">

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#534AB7] rounded-xl flex items-center justify-center">
                  <RiStethoscopeLine className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Symptom Checker</h1>
                  <p className="text-sm text-gray-400">Guided na pagsusuri — Dengue, TB, at Hypertension</p>
                </div>
              </div>
            </div>
            {step > 0 && step < 4 && (
              <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 bg-white transition">
                ← Magsimula ulit
              </button>
            )}
          </div>

          {/* Progress */}
          {step > 0 && step < 4 && (
            <div className="mb-6 bg-white rounded-2xl px-6 py-4 border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-4">
                {['Piliin ang Sakit', 'Piliin ang Symptoms', 'Tagal at Severity'].map((label, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${step > i + 1 ? 'bg-[#534AB7] text-white' : step === i + 1 ? 'bg-[#534AB7] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {step > i + 1 ? <RiCheckLine /> : i + 1}
                    </div>
                    <span className={`text-xs font-medium ${step === i + 1 ? 'text-[#534AB7]' : 'text-gray-400'}`}>{label}</span>
                    {i < 2 && <div className={`h-0.5 w-10 rounded-full transition-all ${step > i + 1 ? 'bg-[#534AB7]' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Alert */}
          <AnimatePresence>
            {showEmergency && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shrink-0">
                  <RiAlertLine className="text-white text-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-600">🚨 Posibleng Emergency ang isa sa iyong symptoms</p>
                  <p className="text-xs text-red-400 mt-0.5">Pumunta agad sa pinakamalapit na health center o ER.</p>
                </div>
                <button onClick={() => navigate('/facility-locator')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-xl hover:bg-red-600 transition shrink-0">
                  <RiMapPin2Line /> Hanapin ang ER
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">

            {/* Step 0 — Disease Selection */}
            {step === 0 && (
              <motion.div key="step0" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0 }}>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {diseases.map((d, idx) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setSelectedDisease(d.id); setStep(1) }}
                      className="bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 transition-all"
                      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                    >
                      {/* Card top */}
                      <div className="h-36 flex items-center justify-center relative overflow-hidden" style={{ background: d.gradient }}>
                        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-white/10" />
                        <div className="absolute bottom-[-20px] left-[-10px] w-24 h-24 rounded-full bg-white/10" />
                        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                          <d.icon className="text-white text-6xl relative z-10" />
                        </motion.div>
                        {/* Risk badge */}
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold"
                          style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}>
                          {d.checkTime}
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-base font-semibold text-gray-900">{d.label}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-lg font-medium shrink-0 ml-2"
                            style={{ background: d.riskBg, color: d.riskColor }}>
                            {d.symptomCount} symptoms
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">{d.description}</p>

                        {/* Quick facts */}
                        <div className="flex flex-col gap-1.5 mb-4">
                          {d.quickFacts.map((fact, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: d.color }} />
                              <span className="text-xs text-gray-400">{fact}</span>
                            </div>
                          ))}
                        </div>

                        {/* Risk level */}
                        <div className="text-xs px-2.5 py-1.5 rounded-lg font-medium mb-4 flex items-center gap-1.5"
                          style={{ background: d.riskBg, color: d.riskColor }}>
                          <RiAlarmWarningLine className="text-sm" />
                          {d.riskLevel}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: d.color }}>
                          Simulan ang Check <RiArrowRightLine />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom info row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3 col-span-1"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <RiShieldCheckLine className="text-[#1D9E75] text-2xl shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Batay sa opisyal na guidelines</p>
                      <p className="text-xs text-gray-400 mt-0.5">DOH Philippines • WHO</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <RiTimeLine className="text-[#534AB7] text-2xl shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">3–4 minuto lang</p>
                      <p className="text-xs text-gray-400 mt-0.5">Mabilis at madaling gamitin</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <RiFirstAidKitLine className="text-[#E65100] text-2xl shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Hindi ito diagnosis</p>
                      <p className="text-xs text-gray-400 mt-0.5">Para sa gabay lamang</p>
                    </div>
                  </div>
                </div>

                {/* Emergency hotlines strip */}
                <div className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-6">
                  <div className="flex items-center gap-2 shrink-0">
                    <RiAlarmWarningLine className="text-red-500 text-lg" />
                    <p className="text-xs font-semibold text-red-600">Emergency Hotlines:</p>
                  </div>
                  {[
                    { label: 'DOH Hotline', number: '1555' },
                    { label: 'Red Cross', number: '143' },
                    { label: 'NDRRMC', number: '911' },
                    { label: 'NCMH (Mental Health)', number: '1553' },
                  ].map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-500">{h.label}:</span>
                      <span className="text-xs font-bold text-red-500">{h.number}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1 — Symptoms */}
            {step === 1 && disease && (
              <motion.div key="step1" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0 }}>
                <div className="grid grid-cols-3 gap-6">
                  {/* Left — symptoms */}
                  <div className="col-span-2">
                    <div className="rounded-2xl p-5 mb-5 flex items-center gap-4" style={{ background: disease.gradient }}>
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                        <disease.icon className="text-white text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-white font-semibold text-base">{disease.label}</h2>
                        <p className="text-white/70 text-xs mt-0.5">{disease.tagline}</p>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-700 mb-4">Anong symptoms ang nararamdaman mo? <span className="text-gray-400 font-normal">(Pumili ng lahat ng applicable)</span></p>

                    <div className="grid grid-cols-2 gap-3">
                      {disease.symptoms.map((symptom) => {
                        const isSelected = selectedSymptoms.includes(symptom.id)
                        return (
                          <motion.div key={symptom.id} whileTap={{ scale: 0.98 }}
                            onClick={() => toggleSymptom(symptom.id)}
                            className="flex items-start gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all bg-white"
                            style={isSelected ? { borderColor: disease.color, boxShadow: `0 0 0 3px ${disease.color}18` } : { borderColor: symptom.emergency ? '#FCA5A5' : '#F3F4F6', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                            <div className="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all"
                              style={isSelected ? { background: disease.color, borderColor: disease.color } : { borderColor: symptom.emergency ? '#FCA5A5' : '#D1D5DB' }}>
                              {isSelected && <RiCheckLine className="text-white text-xs" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm text-gray-700 leading-snug">{symptom.label}</span>
                              {symptom.emergency && <span className="block text-xs text-red-400 font-medium mt-0.5">⚠️ Emergency sign</span>}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>

                    <div className="flex gap-3 mt-5">
                      <button onClick={() => { setStep(0); setSelectedSymptoms([]); setShowEmergency(false) }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 transition">
                        <RiArrowLeftLine /> Bumalik
                      </button>
                      <button onClick={() => selectedSymptoms.length > 0 && setStep(2)}
                        disabled={selectedSymptoms.length === 0}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all text-white disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ background: selectedSymptoms.length > 0 ? disease.gradient : '#9CA3AF' }}>
                        Susunod — {selectedSymptoms.length} napili <RiArrowRightLine />
                      </button>
                    </div>
                  </div>

                  {/* Right — sidebar info */}
                  <div className="col-span-1 flex flex-col gap-4">
                    {/* Selected count */}
                    <div className="bg-white rounded-2xl p-4 border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <p className="text-xs text-gray-400 mb-1">Na-select mo na</p>
                      <p className="text-3xl font-bold" style={{ color: disease.color }}>{selectedSymptoms.length}</p>
                      <p className="text-xs text-gray-400">sa {disease.symptomCount} symptoms</p>
                      <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full transition-all" style={{ width: `${(selectedSymptoms.length / disease.symptomCount) * 100}%`, background: disease.color }} />
                      </div>
                    </div>

                    {/* Emergency tip */}
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <RiInformationLine className="text-amber-500 text-base" />
                        <p className="text-xs font-semibold text-amber-600">Tandaan</p>
                      </div>
                      <p className="text-xs text-amber-700 leading-relaxed">{disease.emergencyTip}</p>
                    </div>

                    {/* Quick facts */}
                    <div className="bg-white rounded-2xl p-4 border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <p className="text-xs font-semibold text-gray-700 mb-3">Mabilis na Katotohanan</p>
                      <div className="flex flex-col gap-2">
                        {disease.quickFacts.map((fact, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: disease.color }} />
                            <span className="text-xs text-gray-500 leading-relaxed">{fact}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Emergency symptoms reminder */}
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <RiAlertLine className="text-red-500 text-base" />
                        <p className="text-xs font-semibold text-red-600">Emergency Signs</p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {disease.symptoms.filter(s => s.emergency).map((s, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-red-300 text-xs shrink-0">•</span>
                            <span className="text-xs text-red-500 leading-relaxed">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Duration + Severity */}
            {step === 2 && disease && (
              <motion.div key="step2" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0 }}>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <div className="bg-white rounded-2xl p-6 mb-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <h2 className="text-sm font-semibold text-gray-800 mb-1">Gaano katagal mo na nararamdaman ito?</h2>
                      <p className="text-xs text-gray-400 mb-4">Ang tagal ng symptoms ay nakakaapekto sa urgency level.</p>
                      <div className="grid grid-cols-3 gap-3 mb-7">
                        {[
                          { id: 'today', label: 'Ngayon lang', sub: 'Ilang oras pa lang', emoji: '🕐' },
                          { id: 'few_days', label: '2–5 araw', sub: 'Ilang araw na', emoji: '📅' },
                          { id: 'week_plus', label: '1 linggo pataas', sub: 'Matagal na', emoji: '⏳' },
                        ].map((d) => (
                          <motion.div key={d.id} whileTap={{ scale: 0.97 }}
                            onClick={() => setDuration(d.id)}
                            className={`p-4 rounded-xl cursor-pointer border-2 text-center transition-all ${duration === d.id ? 'border-[#534AB7] bg-[#EEEDFE]' : 'border-gray-100 hover:border-purple-200 bg-gray-50'}`}>
                            <div className="text-2xl mb-2">{d.emoji}</div>
                            <p className="text-sm font-medium text-gray-800">{d.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{d.sub}</p>
                          </motion.div>
                        ))}
                      </div>

                      <h2 className="text-sm font-semibold text-gray-800 mb-1">Gaano katindi ang nararamdaman mo?</h2>
                      <p className="text-xs text-gray-400 mb-4">Ito ay nakakatulong sa pagtatasa ng urgency.</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'mild', label: 'Mild', desc: 'Kaya pa, nakakaabala lang', color: '#1D9E75', bg: '#E1F5EE', emoji: '😊' },
                          { id: 'moderate', label: 'Moderate', desc: 'Medyo mahirap magtrabaho', color: '#D97706', bg: '#FEF3C7', emoji: '😐' },
                          { id: 'severe', label: 'Severe', desc: 'Hindi na kaya, matinding sakit', color: '#EF4444', bg: '#FEE2E2', emoji: '😰' },
                        ].map((s) => (
                          <motion.div key={s.id} whileTap={{ scale: 0.97 }}
                            onClick={() => setSeverity(s.id)}
                            className={`p-4 rounded-xl cursor-pointer border-2 text-center transition-all ${severity === s.id ? 'border-2' : 'border-gray-100 hover:border-gray-300 bg-gray-50'}`}
                            style={severity === s.id ? { borderColor: s.color, background: s.bg } : {}}>
                            <div className="text-2xl mb-2">{s.emoji}</div>
                            <p className="text-sm font-semibold" style={{ color: s.color }}>{s.label}</p>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 transition">
                        <RiArrowLeftLine /> Bumalik
                      </button>
                      <motion.button
                        onClick={() => duration && severity && handleAnalyze()}
                        disabled={!duration || !severity}
                        whileHover={duration && severity ? { scale: 1.02 } : {}}
                        whileTap={duration && severity ? { scale: 0.98 } : {}}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ background: duration && severity ? disease.gradient : '#9CA3AF' }}>
                        I-analyze ang aking symptoms <RiArrowRightLine />
                      </motion.button>
                    </div>
                  </div>

                  {/* Right info */}
                  <div className="col-span-1 flex flex-col gap-4">
                    <div className="bg-white rounded-2xl p-4 border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <p className="text-xs font-semibold text-gray-700 mb-3">Iyong mga na-select</p>
                      <div className="flex flex-col gap-2">
                        {selectedSymptoms.map(id => {
                          const s = disease.symptoms.find(sym => sym.id === id)
                          return s ? (
                            <div key={id} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: disease.lightBg }}>
                              <RiCheckLine className="text-xs shrink-0" style={{ color: disease.color }} />
                              <span className="text-xs text-gray-600 truncate">{s.label}</span>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                      <p className="text-xs font-semibold text-amber-600 mb-2">💡 Tandaan</p>
                      <p className="text-xs text-amber-700 leading-relaxed">Ang urgency level ay batay sa iyong mga sagot. Hindi ito kapalit ng medikal na konsultasyon.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 — Analyzing */}
            {step === 3 && (
              <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32">
                <div className="relative mb-6">
                  <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: disease?.lightBg }}>
                    <disease.icon className="text-3xl" style={{ color: disease?.color }} />
                  </motion.div>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-4 border-transparent"
                    style={{ borderTopColor: disease?.color }} />
                </div>
                <p className="text-base font-semibold text-gray-800 mb-1">Sinusuri ang iyong mga symptoms...</p>
                <p className="text-sm text-gray-400 mb-6">Batay sa DOH at WHO guidelines para sa {disease?.label}</p>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full" style={{ background: disease?.color }} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4 — Result */}
            {step === 4 && disease && (
              <motion.div key="result" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0 }}>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 flex flex-col gap-5">

                    {/* Result header */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center justify-between"
                      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: disease.lightBg }}>
                          <disease.icon className="text-2xl" style={{ color: disease.color }} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Hasil para sa</p>
                          <p className="text-base font-semibold text-gray-900">{disease.label}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleShare}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition">
                          <RiShareLine /> I-share
                        </button>
                        <button onClick={() => window.print()}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition">
                          <RiPrinterLine /> I-print
                        </button>
                      </div>
                    </div>

                    {/* Urgency */}
                    <div className="rounded-2xl p-5 border-2 flex items-center gap-4"
                      style={{ background: urgencyInfo.bg, borderColor: urgencyInfo.border }}>
                      <div className="text-3xl">{urgencyInfo.icon}</div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5 font-medium uppercase tracking-wide">Urgency Level</p>
                        <p className="text-base font-bold" style={{ color: urgencyInfo.color }}>{urgencyInfo.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: urgencyInfo.color }}>{urgencyInfo.sublabel}</p>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div className="flex items-center gap-2 mb-4">
                        <RiMedicineBottleLine className="text-[#534AB7] text-lg" />
                        <h2 className="text-sm font-semibold text-gray-800">Mga Rekomendasyon</h2>
                      </div>
                      <div className="flex flex-col gap-4">
                        {confirmedSymptoms.map((s, i) => (
                          <div key={i} className="flex gap-3 pb-4 border-b border-gray-50 last:pb-0 last:border-0">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: disease.lightBg }}>
                              <RiCheckLine className="text-sm" style={{ color: disease.color }} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-800 mb-1">{s.label}</p>
                              <p className="text-xs text-gray-500 leading-relaxed">{s.reco}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Facility + Source */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                        <RiShieldCheckLine className="text-[#1D9E75] text-xl shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-700">Batay sa</p>
                          <p className="text-xs text-gray-400">DOH • WHO • Mayo Clinic</p>
                        </div>
                      </div>
                      <motion.button whileHover={{ scale: 1.02 }} onClick={() => navigate('/facility-locator')}
                        className="rounded-2xl p-4 flex items-center justify-between text-white transition"
                        style={{ background: disease.gradient }}>
                        <div className="flex items-center gap-3">
                          <RiMapPin2Line className="text-xl" />
                          <div className="text-left">
                            <p className="text-xs font-semibold">Hanapin ang Pinakamalapit</p>
                            <p className="text-xs opacity-70">Health center, BHC, o ospital</p>
                          </div>
                        </div>
                        <RiArrowRightLine />
                      </motion.button>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <p className="text-xs text-gray-400 leading-relaxed">
                        ⚠️ <strong>Disclaimer:</strong> Ang HealthBridge ay hindi nagbibigay ng medikal na diagnosis. Para sa tamang diagnosis at treatment, kumonsulta sa lisensyadong doktor.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={reset}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 transition">
                        Mag-check ulit
                      </button>
                      <button onClick={() => navigate('/chatbot')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white border border-[#534AB7] text-[#534AB7] hover:bg-[#EEEDFE] transition">
                        <RiRobot2Line /> May tanong pa? Kausapin ang Chatbot
                      </button>
                    </div>
                  </div>

                  {/* Right sidebar — checklist + warnings */}
                  <div className="col-span-1 flex flex-col gap-4">
                    {/* Confirmed symptoms checklist */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div className="flex items-center gap-2 mb-4">
                        <RiFileTextLine className="text-lg" style={{ color: disease.color }} />
                        <h2 className="text-sm font-semibold text-gray-800">Na-confirm na Symptoms</h2>
                      </div>
                      <div className="flex flex-col gap-2">
                        {confirmedSymptoms.map((s, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl" style={{ background: disease.lightBg }}>
                            <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ background: disease.color }}>
                              <RiCheckLine className="text-white text-xs" />
                            </div>
                            <span className="text-xs text-gray-700 leading-snug">{s.label}</span>
                            {s.emergency && <span className="text-xs text-red-400 shrink-0">⚠️</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Warning signs */}
                    <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                      <div className="flex items-center gap-2 mb-4">
                        <RiAlertLine className="text-red-500 text-lg" />
                        <h2 className="text-sm font-semibold text-red-600">Pumunta sa ER kung:</h2>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {confirmedSymptoms.map((s, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                            <p className="text-xs text-gray-600 leading-relaxed">{s.warning}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Next steps */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <p className="text-xs font-semibold text-gray-700 mb-3">Mga Susunod na Hakbang</p>
                      <div className="flex flex-col gap-2">
                        {[
                          { step: '1', text: 'I-save o i-print ang result na ito', color: disease.color },
                          { step: '2', text: 'Ipakita sa doktor o health worker', color: disease.color },
                          { step: '3', text: 'Hanapin ang pinakamalapit na BHC', color: disease.color },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white" style={{ background: disease.color }}>
                              {item.step}
                            </div>
                            <span className="text-xs text-gray-600">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}