import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiRobot2Line, RiHospitalLine, RiMapPin2Line, RiArrowRightLine, RiHeartPulseLine, RiShieldCheckLine, RiBookOpenLine, RiCheckLine } from 'react-icons/ri'
 
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}
 
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}
 
export default function Landing() {
  const navigate = useNavigate()
 
  return (
    <div className="min-h-screen bg-white font-sans">
 
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#534AB7] flex items-center justify-center">
            <RiHeartPulseLine className="text-white text-sm" />
          </div>
          <span className="text-[#534AB7] font-semibold text-lg">HealthBridge</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-[#534AB7] transition">Features</span>
          <span className="cursor-pointer hover:text-[#534AB7] transition">About</span>
          <span className="cursor-pointer hover:text-[#534AB7] transition">Contact</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-sm text-[#534AB7] border border-[#534AB7] rounded-xl hover:bg-[#EEEDFE] transition"
          >
            Log in
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 text-sm text-white bg-[#534AB7] rounded-xl hover:bg-[#3C3489] transition"
          >
            Get started
          </button>
        </div>
      </nav>
 
      {/* Hero */}
      <section className="flex items-center justify-between px-16 pt-16 pb-8 gap-8">
 
        {/* Left - Text */}
        <motion.div
          className="flex-1"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-[#EEEDFE] text-[#3C3489] text-xs font-medium px-4 py-1.5 rounded-full mb-6"
          >
            🇵🇭 Made for every Filipino
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-semibold text-gray-900 leading-tight mb-5"
          >
            Connecting Filipinos to{' '}
            <span className="text-[#534AB7]">Better Healthcare</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8"
          >
            HealthBridge helps you understand your symptoms, find nearby health centers,
            and access reliable health guidance kahit saan ka man naroroon.
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-3">
            <button
              onClick={() => navigate('/register')}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#534AB7] rounded-xl hover:bg-[#3C3489] transition"
            >
              Magsimula na <RiArrowRightLine />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 text-sm font-medium text-[#534AB7] border border-[#534AB7] rounded-xl hover:bg-[#EEEDFE] transition"
            >
              Mag-log in
            </button>
          </motion.div>
        </motion.div>
 
        {/* Center - Hero Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src="/src/assets/hero.jpg"
            alt="HealthBridge illustration"
            className="w-[500px] object-contain"
          />
        </motion.div>
 
        {/* Right - Symptom Checker Card */}
        <motion.div
          className="flex-1 flex justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          <div className="bg-[#F9F8FF] rounded-3xl p-6 w-[300px] border border-[#EEEDFE]">
            <p className="text-xs text-gray-400 mb-4 font-medium">Symptom Checker</p>
            <div className="bg-white rounded-2xl p-4 mb-3 border border-gray-100">
              <p className="text-xs text-gray-500 mb-3">Anong nararamdaman mo?</p>
              <div className="flex flex-wrap gap-2">
                {['Lagnat', 'Ubo', 'Sakit ng ulo', 'Hilo', 'Pagod'].map((s, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1 rounded-full border ${i < 2 ? 'bg-[#534AB7] text-white border-[#534AB7]' : 'border-gray-200 text-gray-500'}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-[#EEEDFE] rounded-2xl p-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <p className="text-xs font-medium text-[#3C3489]">Moderate — Kumonsulta sa loob ng 1-2 araw</p>
              </div>
              <p className="text-xs text-[#534AB7]">Mag-rest, uminom ng Paracetamol, mag-hydrate.</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <p className="text-xs text-gray-400 mb-2">Pinakamalapit na health center</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#E1F5EE] rounded-lg flex items-center justify-center">
                  <RiMapPin2Line className="text-[#1D9E75] text-sm" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800">Barangay Health Center</p>
                  <p className="text-xs text-gray-400">0.3 km away</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
 
      </section>
 
      {/* Stats */}
      <motion.section
        className="flex justify-center gap-16 py-10"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {[
          { value: '10,000+', label: 'Filipinos guided' },
          { value: '30+', label: 'Symptoms covered' },
          { value: '24/7', label: 'Available anytime' },
          { value: '100%', label: 'Free to use' },
        ].map((stat, i) => (
          <motion.div key={i} variants={fadeUp} className="text-center">
            <p className="text-3xl font-semibold text-[#534AB7]">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>
 
      {/* Feature Cards */}
      <section className="px-16 pb-16">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
          Lahat ng kailangan mo, nasa iisang lugar
        </h2>
        <motion.div
          className="grid grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[
            { icon: <RiRobot2Line className="text-white text-xl" />, bg: 'bg-[#EEEDFE]', iconBg: 'bg-[#534AB7]', title: 'Health Chatbot', desc: 'Magtanong ng kahit anong health concern. Available 24/7, walang bayad.' },
            { icon: <RiHospitalLine className="text-white text-xl" />, bg: 'bg-[#E1F5EE]', iconBg: 'bg-[#1D9E75]', title: 'Symptom Checker', desc: 'I-check kung gaano kaurgent ang iyong nararamdaman. May DOH-based recommendations.' },
            { icon: <RiMapPin2Line className="text-white text-xl" />, bg: 'bg-[#FFF3E0]', iconBg: 'bg-[#E65100]', title: 'Facility Locator', desc: 'Hanapin ang pinakamalapit na health center, clinic, o ospital sa iyong lugar.' },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className={`${card.bg} rounded-2xl p-6 cursor-pointer`}
            >
              <div className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-gray-900 font-medium text-base mb-2">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
 
      {/* How it works */}
      <section className="px-16 py-16 bg-[#F9F8FF]">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-12">
          Paano gumagana ang HealthBridge?
        </h2>
        <motion.div
          className="grid grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[
            { step: '1', title: 'Mag-sign up', desc: 'Gumawa ng libreng account sa HealthBridge in less than a minute.' },
            { step: '2', title: 'I-check ang symptoms mo', desc: 'Gamitin ang Symptom Checker o makipag-chat sa aming health chatbot.' },
            { step: '3', title: 'Kumilos agad', desc: 'Sundin ang guidance at hanapin ang pinakamalapit na health facility sa iyo.' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#534AB7] rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-semibold">{item.step}</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
 
      {/* Trust Section */}
      <section className="px-16 py-14 flex flex-col items-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-6 font-medium">
          Batay sa mga guidelines ng
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: 'DOH Philippines', icon: <RiShieldCheckLine className="text-[#534AB7] text-2xl" /> },
            { label: 'World Health Organization', icon: <RiShieldCheckLine className="text-[#1D9E75] text-2xl" /> },
            { label: 'Mayo Clinic', icon: <RiBookOpenLine className="text-[#E65100] text-2xl" /> },
            { label: 'MedlinePlus / NIH', icon: <RiCheckLine className="text-[#534AB7] text-2xl" /> },
          ].map((org, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 px-5 py-3 rounded-xl border border-gray-100">
              {org.icon}
              <span className="text-sm text-gray-600 font-medium">{org.label}</span>
            </div>
          ))}
        </div>
      </section>
 
      {/* CTA Banner */}
      <section className="mx-16 my-10 bg-[#534AB7] rounded-2xl px-12 py-12 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Handa ka na bang mag-alagaan ng iyong kalusugan?
          </h2>
          <p className="text-[#EEEDFE] text-sm">
            Libre. Madaling gamitin. Para sa bawat Pilipino.
          </p>
        </div>
        <button
          onClick={() => navigate('/register')}
          className="flex items-center gap-2 px-6 py-3 bg-white text-[#534AB7] text-sm font-medium rounded-xl hover:bg-[#EEEDFE] transition whitespace-nowrap"
        >
          Magsimula na <RiArrowRightLine />
        </button>
      </section>
 
      {/* Footer */}
      <footer className="border-t border-gray-100 px-16 py-6 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#534AB7] flex items-center justify-center">
            <RiHeartPulseLine className="text-white text-xs" />
          </div>
          <span>HealthBridge — Thynk Unlimited</span>
        </div>
        <span>Connecting Filipinos to Better Healthcare.</span>
      </footer>
 
    </div>
  )
}