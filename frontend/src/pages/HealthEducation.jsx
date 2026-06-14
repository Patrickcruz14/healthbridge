import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHeartPulseLine, RiRobot2Line, RiHospitalLine,
  RiMapPin2Line, RiBookOpenLine, RiUserLine,
  RiLogoutBoxLine, RiVirusLine, RiLungsLine,
  RiHeartLine, RiPlayCircleLine, RiShieldCheckLine,
  RiArrowRightLine
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
    overview: 'Ang dengue ay isang viral infection na dulot ng dengue virus, ipinagkalat ng lamok na Aedes aegypti. Ang Pilipinas ay isa sa mga bansang may pinakamataas na kaso ng dengue sa Asya — 62,313 kaso ang naitala ng DOH mula Enero hanggang Marso 2025, isang 73% na pagtaas kumpara sa nakaraang taon.',
    videos: [
      {
        id: 'cnU-npubpKw',
        title: 'Dengue Fever: Paano Iiwasan?',
        channel: 'Dr. Willie Ong',
        duration: '3:45',
        description: 'Mga tips sa pag-iwas sa dengue mula sa isang Filipino doctor.'
      },
      {
        id: 'Ai9VZRIUN94',
        title: 'Dengue Explained in 5 Minutes',
        channel: 'Medical Education',
        duration: '5:00',
        description: 'Komprehensibong paliwanag tungkol sa dengue virus at kung paano ito lumaganap.'
      },
      {
        id: 'T12gjC3AHF4',
        title: 'Dengue: Mga Babala at Pag-iwas',
        channel: 'GTV Balitanghali',
        duration: '4:30',
        description: 'Mga babala at paalala mula sa DOH tungkol sa dengue.'
      },
    ],
    keyFacts: [
      { emoji: '🦟', title: 'Paano kumakalat', desc: 'Sa pamamagitan ng kagat ng lamok na Aedes aegypti — hindi nakakahawa sa tao-tao.' },
      { emoji: '🌡️', title: 'Pangunahing sintomas', desc: 'Biglaang mataas na lagnat (38.5°C+), sakit ng kasukasuan, pantal sa katawan.' },
      { emoji: '💊', title: 'Gamot', desc: 'Paracetamol lang — BAWAL ang Aspirin at Ibuprofen dahil nagpapalala ng pagdudugo.' },
      { emoji: '💧', title: 'Pinakamahalagang treatment', desc: 'Mag-hydrate ng 8-10 baso ng tubig/araw. ORS, coconut water, at fruit juices.' },
      { emoji: '🚨', title: 'Emergency signs', desc: 'Matinding sakit ng tiyan, paulit-ulit na pagsusuka, may dugo sa suka — ER agad.' },
      { emoji: '🛡️', title: 'Prevention — 4S ng DOH', desc: 'Search and destroy, Self-protection, Seek early consultation, Say no to fogging.' },
    ],
    sources: ['DOH Philippines Dengue Guidelines 2023', 'WHO Dengue Guidelines 2023', 'CDC Dengue', 'Philippine Journal of Science 2019'],
  },
  {
    id: 'tb',
    label: 'Tuberculosis (TB)',
    icon: RiLungsLine,
    color: '#534AB7',
    lightBg: '#EEEDFE',
    gradient: 'linear-gradient(135deg, #534AB7 0%, #7B6FD4 100%)',
    tagline: 'May LIBRENG gamot sa lahat ng health center',
    overview: 'Ang TB ay isang nakakahawang sakit na dulot ng bacteria na Mycobacterium tuberculosis. Ang Pilipinas ay #4 sa buong mundo sa TB burden — may 800,000+ bagong kaso bawat taon. Ngunit ang TB ay NAGAGAMOT — 95% cure rate kung kumpleto ang treatment.',
    videos: [
      {
        id: '0384T6XZZeI',
        title: 'Med Talk: Tuberculosis at mga Pilipino',
        channel: 'GMA Network',
        duration: '10:00',
        description: 'Komprehensibong usapan tungkol sa TB at kung paano ito nakakaapekto sa mga Pilipino.'
      },
      {
        id: 'RPJ9oRnxkGQ',
        title: 'TB Treatment: Plano ng DOH',
        channel: 'CNN Philippines',
        duration: '5:30',
        description: 'Ang bagong plano ng DOH para sa TB treatment sa Pilipinas.'
      },
      {
        id: 'TiG8WauN-kc',
        title: 'Filipino Doctor Fights TB Using Drones',
        channel: 'WHO Philippines',
        duration: '8:00',
        description: 'Inspiring na kwento ng isang Filipino doctor na lumalaban sa TB sa malalayong komunidad.'
      },
    ],
    keyFacts: [
      { emoji: '💨', title: 'Paano kumakalat', desc: 'Sa hangin — kapag ang may TB ay umubo, bumuga, o kumanta. Hindi sa pagkain o paghawak.' },
      { emoji: '😮', title: 'Pangunahing sintomas', desc: 'Ubo na tumatagal ng 2 linggo+, night sweats, pagbaba ng timbang, afternoon fever.' },
      { emoji: '💊', title: 'Treatment — DOTS', desc: '6 buwan ang treatment. LIBRE sa lahat ng DOTS centers at health centers ng DOH.' },
      { emoji: '🥩', title: 'Pagkain na dapat kainin', desc: 'High-protein foods (itlog, karne, isda), Vitamin A (kamote, kalabasa), Vitamin C (calamansi).' },
      { emoji: '🚫', title: 'Dapat iwasan', desc: 'Alak at sigarilyo — nagpapahina ng immune system at nagpapalala ng TB.' },
      { emoji: '🏥', title: 'LIBRE ang lahat', desc: 'Sputum test, GeneXpert, Chest X-ray, at lahat ng TB medicines — LIBRE sa DOTS centers.' },
    ],
    sources: ['DOH National TB Program 2023', 'WHO Global TB Report 2023', 'Philippine Clinical Practice Guidelines on TB', 'CDC TB Guidelines'],
  },
  {
    id: 'hypertension',
    label: 'Hypertension',
    icon: RiHeartLine,
    color: '#E65100',
    lightBg: '#FFF3E0',
    gradient: 'linear-gradient(135deg, #E65100 0%, #FF8C00 100%)',
    tagline: 'Ang "silent killer" — karamihan walang nararamdaman',
    overview: 'Ang hypertension o mataas na blood pressure ay isang kondisyon kung saan ang presyon ng dugo sa mga ugat ay palaging mataas. Ayon sa DOH, 1 sa 4 adult Filipinos ay may hypertension — at 60% ay hindi alam na mayroon silang kondisyong ito.',
    videos: [
      {
        id: 'vzdN-SJiYWo',
        title: 'May HIGH BLOOD Ka Ba? Heto ang Gagawin',
        channel: 'Doc Willie Ong',
        duration: '4:30',
        description: 'Mga praktikal na tips kung may high blood pressure ka — mula sa isang Filipino cardiologist.'
      },
      {
        id: 'sfEH667C1k4',
        title: 'Mga Bawal Kainin kung Mataas ang Blood Pressure',
        channel: 'Doc Willie Ong',
        duration: '6:00',
        description: 'Alamin kung anong pagkain ang dapat iwasan kapag may hypertension.'
      },
      {
        id: '9kEncGLGiCE',
        title: '5 Minutes Para Ibaba ang Blood Pressure Mo',
        channel: 'Doc Willie Ong',
        duration: '5:00',
        description: 'Mga simpleng paraan para mapababa ang blood pressure sa loob ng 5 minuto.'
      },
    ],
    keyFacts: [
      { emoji: '📏', title: 'BP Classification', desc: 'Normal: <120/80. Stage 1: 130-139/80-89. Stage 2: 140/90+. Crisis: 180/120+ (ER agad!)' },
      { emoji: '😶', title: 'Silent Killer', desc: 'Karamihan walang sintomas — kaya mahalaga ang regular na BP monitoring.' },
      { emoji: '🧂', title: 'Pangunahing dahilan', desc: 'Mataas na asin sa pagkain — target ng WHO ay wala pang 2,000mg sodium/araw.' },
      { emoji: '🥦', title: 'DASH Diet', desc: 'Maraming prutas, gulay, whole grains, at mababang-taba na pagkain. Proven na nakakapababa ng BP.' },
      { emoji: '🚶', title: 'Exercise', desc: '150 minuto ng moderate exercise/linggo. Nakakapababa ng BP ng 5-8 mmHg (WHO 2020).' },
      { emoji: '💊', title: 'Maintenance', desc: 'Huwag huminto sa maintenance medicine kahit okay na ang BP — kailangan ito araw-araw.' },
    ],
    sources: ['DOH Hypertension Guidelines 2020', 'ACC/AHA Guidelines 2017', 'WHO Hypertension Fact Sheet 2023', 'NIH DASH Diet', 'WHO Physical Activity Guidelines 2020'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

export default function HealthEducation() {
  const navigate = useNavigate()
  const active = '/health-education'
  const [activeDisease, setActiveDisease] = useState('dengue')
  const [activeVideo, setActiveVideo] = useState(null)

  const disease = diseases.find(d => d.id === activeDisease)

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
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <RiBookOpenLine className="text-[#534AB7] text-xl" />
            <h1 className="text-2xl font-semibold text-gray-900">Health Education</h1>
          </div>
          <p className="text-sm text-gray-400">Matuto tungkol sa mga karaniwang sakit sa Pilipinas — batay sa DOH at WHO guidelines.</p>
        </div>

        {/* Disease Tabs */}
        <div className="flex gap-3 mb-8">
          {diseases.map((d) => (
            <button
              key={d.id}
              onClick={() => { setActiveDisease(d.id); setActiveVideo(null) }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border-2 ${activeDisease === d.id ? 'text-white border-transparent' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
              style={activeDisease === d.id ? { background: d.gradient } : {}}
            >
              <d.icon className="text-base" />
              {d.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDisease}
            variants={stagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
          >
            {/* Disease Overview Banner */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-6 mb-6 relative overflow-hidden"
              style={{ background: disease.gradient }}
            >
              <div className="absolute top-[-30px] right-[-30px] w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute bottom-[-20px] right-[80px] w-24 h-24 rounded-full bg-white/5" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <disease.icon className="text-white text-3xl" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-white font-semibold text-xl">{disease.label}</h2>
                    <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-lg">{disease.tagline}</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{disease.overview}</p>
                </div>
              </div>
            </motion.div>

            {/* Videos */}
            <motion.div variants={fadeUp} className="mb-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">🎬 Mga Educational Videos</h2>
              <div className="grid grid-cols-3 gap-4">
                {disease.videos.map((video) => (
                  <motion.div
                    key={video.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                    onClick={() => setActiveVideo(activeVideo === video.id ? null : video.id)}
                  >
                    {activeVideo === video.id ? (
                      <div className="relative" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="relative h-40 flex items-center justify-center overflow-hidden"
                        style={{ background: disease.gradient }}>
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={e => e.target.style.display = 'none'}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative z-10 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <RiPlayCircleLine className="text-2xl" style={{ color: disease.color }} />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                          {video.duration}
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-sm font-medium text-gray-800 mb-1 leading-snug">{video.title}</p>
                      <p className="text-xs text-gray-400 mb-2">{video.channel}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{video.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key Facts */}
            <motion.div variants={fadeUp} className="mb-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">📋 Mahahalagang Impormasyon</h2>
              <div className="grid grid-cols-3 gap-4">
                {disease.keyFacts.map((fact, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-white rounded-2xl p-4 border border-gray-100"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  >
                    <div className="text-2xl mb-2">{fact.emoji}</div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">{fact.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{fact.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Row */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => navigate('/symptom-checker')}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: disease.lightBg }}>
                    <RiHospitalLine className="text-lg" style={{ color: disease.color }} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">I-check ang Symptoms</p>
                    <p className="text-xs text-gray-400">Symptom Checker</p>
                  </div>
                </div>
                <RiArrowRightLine className="text-gray-400" />
              </button>

              <button
                onClick={() => navigate('/chatbot')}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: disease.lightBg }}>
                    <RiRobot2Line className="text-lg" style={{ color: disease.color }} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">Magtanong sa Chatbot</p>
                    <p className="text-xs text-gray-400">AI Health Assistant</p>
                  </div>
                </div>
                <RiArrowRightLine className="text-gray-400" />
              </button>

              <button
                onClick={() => navigate('/facility-locator')}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: disease.lightBg }}>
                    <RiMapPin2Line className="text-lg" style={{ color: disease.color }} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">Hanapin ang Health Center</p>
                    <p className="text-xs text-gray-400">Facility Locator</p>
                  </div>
                </div>
                <RiArrowRightLine className="text-gray-400" />
              </button>
            </motion.div>

            {/* Sources */}
            <motion.div variants={fadeUp}>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-start gap-4"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <RiShieldCheckLine className="text-[#1D9E75] text-xl shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Mga Pinagkukunan ng Impormasyon</p>
                  <div className="flex flex-wrap gap-2">
                    {disease.sources.map((source, i) => (
                      <span key={i} className="text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-lg border border-gray-100">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}