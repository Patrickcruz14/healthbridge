import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHeartPulseLine, RiRobot2Line, RiHospitalLine,
  RiMapPin2Line, RiBookOpenLine, RiUserLine,
  RiLogoutBoxLine, RiSendPlane2Line, RiArrowLeftLine,
  RiVirusLine, RiLungsLine, RiHeartLine,
  RiShieldCheckLine, RiArrowRightLine
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
- Fruit juices — Vitamin C
- BAWAL: Softdrinks, energy drinks, alak

PAGKAIN NA DAPAT KAININ:
- Papaya leaves juice — clinically studied para sa platelet count (Philippine Journal of Science 2019)
- Lugaw, tinapay, crackers
- Chicken soup
- Guava juice — mataas sa Vitamin C
- Saging — potassium
- BAWAL: Matabang pagkain, maanghang, dark-colored na pagkain

PLATELET MONITORING:
- Normal: 150,000-450,000
- Warning: bumaba sa 100,000
- Critical: bumaba sa 20,000 — kailangan ng platelet transfusion
- Mag-CBC tuwing araw sa critical phase

PREVENTION — 4S Strategy ng DOH:
- Search and destroy breeding sites
- Self-protection (mahabang damit, DEET repellent)
- Seek early consultation
- Say no to indiscriminate fogging
- Peak lamok hours: 6AM-9AM at 3PM-6PM

LIBRE NA SERBISYO:
- Dengue consultation at blood test — libre sa government hospitals
- PhilHealth covers dengue hospitalization
- DOH Hotline: 1555

SOURCES: DOH Philippines Dengue Guidelines 2023, WHO Dengue Guidelines 2023, Philippine Journal of Science, Mayo Clinic, CDC

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

LATENT vs ACTIVE TB:
- Latent TB: May bacteria pero hindi aktibo, hindi nakakahawa, walang sintomas
- Active TB: Aktibo ang bacteria, nakakahawa, may sintomas
- 10% ng latent TB nagiging active — lalo sa mababang immune system

SINTOMAS:
- Ubo na tumatagal ng 2 linggo o higit (pinaka-classic sign)
- May dugo sa plema (hemoptysis)
- Labis na pagpapawis sa gabi (night sweats)
- Biglaang pagbaba ng timbang nang walang dahilan
- Mababang lagnat na paulit-ulit — lalo sa hapon
- Matinding pagod kahit hindi nag-eehersisyo
- Sakit ng dibdib kapag humihinga o umuubo

DIAGNOSIS:
- Sputum smear microscopy — libre sa lahat ng DOTS centers
- GeneXpert test — mas accurate, libre sa DOH facilities
- Chest X-ray — libre sa DOTS centers
- Tuberculin Skin Test (TST) — para sa latent TB

TREATMENT — DOTS PROGRAM:
- 6 buwan ang standard treatment (DOH/WHO)
- Intensive phase: 2 buwan — 4 antibiotics (HRZE: Isoniazid, Rifampicin, Pyrazinamide, Ethambutol)
- Continuation phase: 4 buwan — 2 antibiotics (HR: Isoniazid, Rifampicin)
- KRITIKAL: Huwag huminto kahit okay na — nagdudulot ng drug-resistant TB
- Drug-resistant TB (MDR-TB): 18-24 buwan ang treatment, mas mahal at mahirap

PAGKAIN NA DAPAT KAININ (WHO/DOH):
- High-protein: itlog, karne, isda, beans, tokwa — para sa tissue repair
- Vitamin A: kamote, kalabasa, karots, spinach — immune support
- Vitamin C: calamansi, guava, kamatis — antioxidant
- Zinc: karne, seafood, nuts — immune function
- Calorie-dense foods: para makabawi ng nawala timbang
- Kumain ng 5-6 maliit na meals/araw

PAGKAIN NA DAPAT IWASAN:
- Alak — nagpapalala ng liver damage mula sa TB meds
- Sigarilyo — nagpapahina ng baga
- Processed foods — nagpapababa ng immune system
- Mataas na asukal — nagpapababa ng immune function
- Tyramine-rich foods habang nag-iinom ng Isoniazid: tuna, red wine, aged cheese

SIDE EFFECTS NG TB MEDS AT MANAGEMENT:
- Rifampicin: red-orange na ihi/laway — NORMAL, huwag matakot
- Isoniazid: pamamanhid ng kamay/paa — uminom ng Vitamin B6
- Pyrazinamide: sakit ng kasukasuan — uminom ng maraming tubig
- Ethambutol: problema sa paningin — kumonsulta agad sa doktor

PAG-IINGAT SA BAHAY:
- Magsuot ng face mask — lalo sa enclosed spaces
- Magbukas ng bintana — proper ventilation nakakatulong
- Hindi kailangan mag-isolate completely pagkatapos ng 2 linggo ng treatment
- Mag-cover ng bibig kapag umuubo o bumahing
- Kailangan magpa-test ang mga kasama sa bahay — libre rin

LIBRE NA SERBISYO:
- Lahat ng TB medicines — LIBRE sa lahat ng DOTS centers at health centers
- Diagnosis tests — LIBRE
- DOH NTP (National Tuberculosis Program) — sumasaklaw sa buong Pilipinas
- PhilHealth TB DOTS benefit package
- DOH Hotline: 1555

SOURCES: DOH National TB Program Guidelines 2023, WHO Global TB Report 2023, WHO Treatment Guidelines for Drug-Susceptible TB 2022, CDC TB Guidelines, Philippine Clinical Practice Guidelines on TB

RULES:
- HINDI nagda-diagnose — nagrerekomenda lang na kumonsulta
- Hemoptysis o hirap huminga → ER agad
- Laging i-cite ang source
- Alisin ang stigma — TB ay hindi kahihiyan, nagagamot ito
- Kung hindi tungkol sa TB → i-redirect
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
- Mataas na presyon ng dugo sa mga ugat — persistently 130/80 mmHg o higit (ACC/AHA 2017)
- "Silent killer" — karamihan walang sintomas hanggang sa may komplikasyon na
- 1 sa 4 adult Filipinos ay may hypertension (DOH 2023)
- 60% ay hindi alam na mayroon silang hypertension
- Leading cause ng stroke at heart attack sa Pilipinas

BP CLASSIFICATION (ACC/AHA 2017 / DOH):
- Normal: wala pang 120/80 mmHg
- Elevated: 120-129 / wala pang 80 mmHg
- Stage 1 Hypertension: 130-139 / 80-89 mmHg
- Stage 2 Hypertension: 140/90 mmHg o higit
- Hypertensive Crisis: 180/120 mmHg o higit — EMERGENCY

SINTOMAS (kung meron man):
- Sakit ng ulo — lalo sa likod ng ulo, pag-gising sa umaga
- Malabo o double ang paningin
- Palpitations o mabilis na tibok ng puso
- Pagkahilo o pakiramdam na mabibigla
- Pagdudugo ng ilong
- Pangangapos ng hininga
- Nausea

HYPERTENSIVE CRISIS SYMPTOMS (ER AGAD):
- BP 180/120+
- Matinding sakit ng ulo
- Pagkalito o hindi malinaw ang pag-iisip
- Pamamanhid ng mukha, kamay, o paa
- Hirap huminga
- Sakit ng dibdib
- Malabo ang paningin

DAHILAN NG HYPERTENSION:
- Mataas na asin sa pagkain — pinakamalaking factor (WHO)
- Unhealthy diet — processed foods, mataas na taba
- Sigarilyo — nagpapahirap sa mga ugat
- Labis na alak — nagpapataas ng BP
- Kakulangan ng physical activity
- Obesity — BMI 25+ ay risk factor
- Chronic stress
- Genetics — family history ng hypertension
- Edad — tumataas ang risk sa edad 40+
- Diabetes at kidney disease

LIFESTYLE CHANGES (PINAKA-EPEKTIBONG TREATMENT):

1. DASH DIET (Dietary Approaches to Stop Hypertension — NIH):
- Maraming prutas at gulay
- Whole grains: brown rice, oatmeal
- Low-fat dairy
- Lean protein: isda, manok, beans
- Nuts at seeds
- BAWASAN: asin, red meat, sweets, processed foods

2. SODIUM REDUCTION:
- Target: wala pang 2,300mg sodium/araw (WHO: 2,000mg)
- 1 kutsarita ng asin = 2,300mg sodium
- Mga pagkain na mataas sa sodium: patis, toyo, bagoong, instant noodles, processed meats
- Tips: gumamit ng herbs/spices instead of salt, basahin ang food labels

3. EXERCISE (WHO Physical Activity Guidelines 2020):
- 150 minutes moderate aerobic activity/linggo
- Halimbawa: 30 minuto ng mabilis na paglalakad, 5 araw/linggo
- Resistance training 2x/linggo
- Nakakapababa ng BP ng 5-8 mmHg

4. WEIGHT MANAGEMENT:
- Bawat 1kg na nawala = 1 mmHg na pagbaba ng BP
- Target BMI: 18.5-24.9

5. ALCOHOL LIMITATION:
- Max 1 drink/araw para sa babae, 2 para sa lalaki
- Mas maganda kung wala na

6. SMOKING CESSATION:
- Ang sigarilyo ay nagpapataas ng BP at nagpapalala ng cardiovascular risk
- DOH Quit Line: 165035

MAINTENANCE MEDICATION:
- Kailangan ng reseta ng doktor
- Common medications: Amlodipine, Losartan, Enalapril, Hydrochlorothiazide
- IMPORTANTE: Huwag huminto kahit okay na ang BP — maintenance ito
- Huwag mag-adjust ng dose nang walang pahintulot ng doktor
- Inumin sa tamang oras araw-araw

HOME BP MONITORING:
- Mag-check ng BP tuwing umaga at gabi
- Mag-rest ng 5 minuto bago sukatin
- Dalawang beses sukatin, average ang dalawa
- I-record ang readings — dalhin sa doktor
- Target home BP: wala pang 135/85 mmHg

PAGKAIN NA NAKAKATULONG:
- Bawang — natural ACE inhibitor, nakakapababa ng BP (Journal of Nutrition 2016)
- Saging — mataas sa potassium, nagba-balance ng sodium
- Oatmeal — soluble fiber, nakakapababa ng BP
- Salmon/isda — omega-3 fatty acids
- Dark chocolate (70%+) — flavonoids nakakatulong
- Beet juice — nitrates nakakapababa ng BP (British Journal of Nutrition 2013)
- Hibiscus tea — clinically proven na nakakapababa ng BP (Journal of Hypertension 2010)

PAGKAIN NA DAPAT IWASAN:
- Asin/sodium — chips, instant noodles, canned goods, fast food
- Processed meats — tocino, longganisa, hotdog
- Saturated fats — coconut oil (labis), fatty meats
- Trans fats — margarine, processed baked goods
- Alak — nagpapataas ng BP
- Caffeine — moderate lang (max 2 cups kape/araw)

KOMPLIKASYON NG HINDI NAGAMOT NA HYPERTENSION:
- Stroke — nangungunang sanhi sa Pilipinas
- Heart attack
- Heart failure
- Kidney disease
- Vision loss
- Peripheral artery disease

LIBRE NA SERBISYO:
- BP monitoring — libre sa lahat ng barangay health centers
- Hypertension consultation — libre sa RHUs at government hospitals
- PhilHealth covers hypertension management
- Maintenance meds — available sa Botika ng Barangay (subsidized)
- DOH Hotline: 1555

SOURCES: DOH Philippines Hypertension Guidelines 2020, ACC/AHA Hypertension Guidelines 2017, WHO Hypertension Fact Sheet 2023, DASH Diet (NIH/NHLBI), WHO Physical Activity Guidelines 2020, Journal of Nutrition, British Journal of Nutrition, Journal of Hypertension

RULES:
- HINDI nagda-diagnose — nagrerekomenda lang na kumonsulta
- Hypertensive crisis (180/120+) → ER agad
- Laging i-cite ang source ng impormasyon
- I-emphasize na kontrolable ang hypertension sa tamang lifestyle
- Kung hindi tungkol sa Hypertension → i-redirect
- Palaging may follow-up question sa dulo`,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
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
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
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
        }
      )
      const data = await response.json()
      const botReply = data.choices?.[0]?.message?.content || 'Kamusta! Ako si HealthBot. Ano ang nararamdaman mo?'

      setIsTyping(false)
      setMessages([{ id: Date.now(), role: 'bot', text: botReply }])
      setConversationHistory([
        { role: 'user', content: 'Simulan ang conversation.' },
        { role: 'assistant', content: botReply }
      ])
    } catch (err) {
      setIsTyping(false)
      setMessages([{
        id: Date.now(),
        role: 'bot',
        text: 'Kamusta! Ako si HealthBot, ang iyong gabay para sa ' + d.label + '. Ano ang nararamdaman mo ngayon?'
      }])
    }

    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return

    const userMessage = input.trim()
    setInput('')

    const newMessages = [...messages, { id: Date.now(), role: 'user', text: userMessage }]
    setMessages(newMessages)
    setIsTyping(true)

    const newHistory = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ]

    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
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
        }
      )
      const data = await response.json()
      const botReply = data.choices?.[0]?.message?.content || 'Pasensya na, hindi ko naintindihan. Ulitin mo nga?'

      setIsTyping(false)
      setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: botReply }])
      setConversationHistory([
        ...newHistory,
        { role: 'assistant', content: botReply }
      ])
    } catch (err) {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'bot',
        text: 'May error sa connection. Subukan ulit.'
      }])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
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
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <RiRobot2Line className="text-[#534AB7] text-xl" />
                  <h1 className="text-2xl font-semibold text-gray-900">Health Chatbot</h1>
                </div>
                <p className="text-sm text-gray-400">Piliin ang sakit na gusto mong pag-usapan. Ang aming AI bot ay makikipag-usap sa iyo sa Filipino.</p>
              </div>

              <div className="grid grid-cols-3 gap-5 mb-8">
                {diseases.map((d) => (
                  <motion.div
                    key={d.id}
                    whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectDisease(d.id)}
                    className="bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                  >
                    <div className="h-28 flex items-center justify-center relative overflow-hidden"
                      style={{ background: d.gradient }}>
                      <div className="absolute top-[-20px] right-[-20px] w-28 h-28 rounded-full bg-white/10" />
                      <d.icon className="text-white text-5xl relative z-10" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{d.label}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-3">{d.description}</p>
                      <div className="text-xs px-2 py-1 rounded-lg inline-block font-medium"
                        style={{ background: d.lightBg, color: d.color }}>
                        {d.tagline}
                      </div>
                    </div>
                    <div className="px-5 pb-4">
                      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: d.color }}>
                        Simulan ang Chat <RiArrowRightLine />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <RiShieldCheckLine className="text-[#1D9E75] text-2xl shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">AI-powered na batay sa DOH Philippines at WHO guidelines</p>
                  <p className="text-xs text-gray-400 mt-0.5">Para sa tamang diagnosis, kumonsulta pa rin sa lisensyadong doktor.</p>
                </div>
              </div>
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
              <div className="flex items-center gap-1.5 text-xs text-[#1D9E75] font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
                Online
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
                    <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                      ? 'text-white rounded-tr-sm'
                      : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'
                      }`}
                      style={msg.role === 'user'
                        ? { background: disease.gradient }
                        : { boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }
                      }
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 items-center"
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: disease.gradient }}>
                    <disease.icon className="text-white text-sm" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full"
                        style={{ background: disease.color }}
                      />
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
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition disabled:opacity-40"
                  style={{ background: disease.gradient }}
                >
                  <RiSendPlane2Line className="text-white text-sm" />
                </motion.button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400">Press Enter para magpadala</p>
                <button
                  onClick={() => navigate('/symptom-checker')}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl transition"
                  style={{ background: disease.lightBg, color: disease.color }}
                >
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