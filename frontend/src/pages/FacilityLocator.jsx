import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  RiHeartPulseLine, RiRobot2Line, RiHospitalLine,
  RiMapPin2Line, RiBookOpenLine, RiUserLine,
  RiLogoutBoxLine, RiSearchLine, RiNavigationLine,
  RiPhoneLine, RiTimeLine, RiArrowRightLine,
  RiShieldCheckLine
} from 'react-icons/ri'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const navItems = [
  { icon: RiHeartPulseLine, label: 'Dashboard', path: '/dashboard' },
  { icon: RiRobot2Line, label: 'Health Chatbot', path: '/chatbot' },
  { icon: RiHospitalLine, label: 'Symptom Checker', path: '/symptom-checker' },
  { icon: RiMapPin2Line, label: 'Facility Locator', path: '/facility-locator' },
  { icon: RiBookOpenLine, label: 'Health Education', path: '/health-education' },
  { icon: RiUserLine, label: 'Profile', path: '/profile' },
]

const facilityTypes = [
  { id: 'all', label: 'Lahat' },
  { id: 'hospital', label: 'Ospital' },
  { id: 'health_center', label: 'Health Center' },
  { id: 'bhc', label: 'Barangay Health Center' },
  { id: 'dots', label: 'DOTS Center (TB)' },
]

const sampleFacilities = [
  { id: 1, name: 'Quezon City General Hospital', type: 'hospital', lat: 14.6760, lng: 121.0437, address: 'Seminary Rd, Quezon City', phone: '(02) 8921-3031', hours: '24 hours', philhealth: true, free: false, distance: '0.8 km' },
  { id: 2, name: 'Batasan Hills Health Center', type: 'health_center', lat: 14.6850, lng: 121.0980, address: 'Batasan Hills, Quezon City', phone: '(02) 8931-1234', hours: '8AM - 5PM', philhealth: true, free: true, distance: '1.2 km' },
  { id: 3, name: 'Commonwealth Health Center', type: 'health_center', lat: 14.6780, lng: 121.0890, address: 'Commonwealth Ave, Quezon City', phone: '(02) 8932-5678', hours: '8AM - 5PM', philhealth: true, free: true, distance: '1.5 km' },
  { id: 4, name: 'Payatas Barangay Health Center', type: 'bhc', lat: 14.7100, lng: 121.1050, address: 'Payatas, Quezon City', phone: '(02) 8934-9012', hours: '8AM - 5PM', philhealth: false, free: true, distance: '2.1 km' },
  { id: 5, name: 'Novaliches District Hospital', type: 'hospital', lat: 14.7200, lng: 121.0380, address: 'Novaliches, Quezon City', phone: '(02) 8936-3456', hours: '24 hours', philhealth: true, free: false, distance: '3.4 km' },
  { id: 6, name: 'La Mesa DOTS Center', type: 'dots', lat: 14.6950, lng: 121.0650, address: 'La Mesa, Quezon City', phone: '(02) 8937-7890', hours: '8AM - 5PM', philhealth: true, free: true, distance: '1.8 km' },
  { id: 7, name: 'Fairview Health Center', type: 'health_center', lat: 14.7300, lng: 121.0500, address: 'Fairview, Quezon City', phone: '(02) 8938-1234', hours: '8AM - 5PM', philhealth: true, free: true, distance: '4.2 km' },
  { id: 8, name: 'Balingasa Barangay Health Center', type: 'bhc', lat: 14.6620, lng: 121.0120, address: 'Balingasa, Quezon City', phone: '(02) 8939-5678', hours: '8AM - 5PM', philhealth: false, free: true, distance: '2.8 km' },
]

const typeColors = {
  hospital: '#E65100',
  health_center: '#534AB7',
  bhc: '#1D9E75',
  dots: '#D97706',
}

const typeLabels = {
  hospital: 'Ospital',
  health_center: 'Health Center',
  bhc: 'BHC',
  dots: 'DOTS Center',
}

function LocationMarker({ onLocate }) {
  const map = useMap()
  useEffect(() => {
    map.locate({ setView: true, maxZoom: 15 })
    map.on('locationfound', (e) => { onLocate(e.latlng) })
  }, [])
  return null
}

export default function FacilityLocator() {
  const navigate = useNavigate()
  const active = '/facility-locator'
  const [activeType, setActiveType] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedFacility, setSelectedFacility] = useState(null)
  const [userLocation, setUserLocation] = useState(null)

  const filtered = sampleFacilities.filter(f => {
    const matchType = activeType === 'all' || f.type === activeType
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.address.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [14.6760, 121.0437]

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

        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-8 py-5 shrink-0"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <RiMapPin2Line className="text-[#534AB7] text-xl" />
                <h1 className="text-2xl font-semibold text-gray-900">Facility Locator</h1>
              </div>
              <p className="text-sm text-gray-400">Hanapin ang pinakamalapit na health facility sa iyong lugar.</p>
            </div>
            <div className="flex items-center gap-2 bg-[#E1F5EE] text-[#1D9E75] text-xs font-medium px-3 py-2 rounded-xl">
              <RiShieldCheckLine />
              May PhilHealth at Libreng Serbisyo
            </div>
          </div>

          {/* Search + Filters */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#F4F3FF] rounded-xl px-4 py-2.5 flex-1">
              <RiSearchLine className="text-gray-400 text-sm shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Maghanap ng health facility..."
                className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {facilityTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${activeType === type.id ? 'bg-[#534AB7] text-white' : 'bg-[#F4F3FF] text-gray-500 hover:bg-gray-200'}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">

          {/* Facility List */}
          <div className="w-[340px] shrink-0 overflow-y-auto bg-white border-r border-gray-100">
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-3">{filtered.length} facilities found</p>
              <div className="flex flex-col gap-3">
                {filtered.map(facility => (
                  <div
                    key={facility.id}
                    onClick={() => setSelectedFacility(facility)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedFacility?.id === facility.id ? 'border-[#534AB7] bg-[#EEEDFE]' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 leading-snug">{facility.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{facility.address}</p>
                      </div>
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-lg ml-2 shrink-0 text-white"
                        style={{ background: typeColors[facility.type] }}
                      >
                        {typeLabels[facility.type]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <RiNavigationLine className="text-[#534AB7]" />
                        {facility.distance}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <RiTimeLine className="text-gray-400" />
                        {facility.hours}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {facility.free && (
                        <span className="text-xs bg-[#E1F5EE] text-[#1D9E75] px-2 py-0.5 rounded-lg font-medium">Libre</span>
                      )}
                      {facility.philhealth && (
                        <span className="text-xs bg-[#EEEDFE] text-[#534AB7] px-2 py-0.5 rounded-lg font-medium">PhilHealth</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 relative">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker onLocate={setUserLocation} />
              {filtered.map(facility => (
                <Marker
                  key={facility.id}
                  position={[facility.lat, facility.lng]}
                  eventHandlers={{ click: () => setSelectedFacility(facility) }}
                >
                  <Popup>
                    <div className="p-1">
                      <p className="font-semibold text-sm">{facility.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{facility.address}</p>
                      <p className="text-xs text-gray-500">{facility.phone}</p>
                      <p className="text-xs text-gray-500">{facility.hours}</p>
                      <div className="flex gap-1 mt-1">
                        {facility.free && (
                          <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Libre</span>
                        )}
                        {facility.philhealth && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">PhilHealth</span>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Selected Facility Detail Card */}
            {selectedFacility && (
              <div
                className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 z-[1000]"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-lg text-white"
                        style={{ background: typeColors[selectedFacility.type] }}
                      >
                        {typeLabels[selectedFacility.type]}
                      </span>
                      {selectedFacility.free && (
                        <span className="text-xs bg-[#E1F5EE] text-[#1D9E75] px-2 py-0.5 rounded-lg font-medium">Libre</span>
                      )}
                      {selectedFacility.philhealth && (
                        <span className="text-xs bg-[#EEEDFE] text-[#534AB7] px-2 py-0.5 rounded-lg font-medium">PhilHealth</span>
                      )}
                    </div>
                    <p className="text-base font-semibold text-gray-900">{selectedFacility.name}</p>
                    <p className="text-xs text-gray-400">{selectedFacility.address}</p>
                  </div>
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="text-gray-400 hover:text-gray-600 text-lg ml-2"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <RiPhoneLine className="text-[#534AB7] shrink-0" />
                    <span className="text-xs text-gray-600">{selectedFacility.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiTimeLine className="text-[#534AB7] shrink-0" />
                    <span className="text-xs text-gray-600">{selectedFacility.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiNavigationLine className="text-[#1D9E75] shrink-0" />
                    <span className="text-xs text-gray-600">{selectedFacility.distance} mula sa iyo</span>
                  </div>
                  <a
                  
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedFacility.lat},${selectedFacility.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-[#534AB7] text-white text-xs font-medium px-3 py-2 rounded-xl hover:bg-[#3C3489] transition"
                  >
                    <RiArrowRightLine /> Directions
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}