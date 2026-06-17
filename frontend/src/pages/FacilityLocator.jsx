import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  RiHeartPulseLine, RiRobot2Line, RiHospitalLine,
  RiMapPin2Line, RiBookOpenLine, RiUserLine,
  RiLogoutBoxLine, RiSearchLine, RiNavigationLine,
  RiPhoneLine, RiTimeLine, RiArrowRightLine,
  RiShieldCheckLine, RiRefreshLine, RiErrorWarningLine
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

const diseaseFilters = [
  { id: 'all', label: 'Lahat ng Sakit' },
  { id: 'dengue', label: '🦟 Dengue' },
  { id: 'tb', label: '🫁 Tuberculosis' },
  { id: 'hypertension', label: '❤️ Hypertension' },
]

const diseaseTypeMap = {
  dengue: ['hospital', 'health_center', 'bhc'],
  tb: ['dots', 'hospital', 'health_center'],
  hypertension: ['hospital', 'health_center', 'bhc'],
  all: ['hospital', 'health_center', 'bhc', 'dots'],
}

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

function MapController({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.setView(center, 14)
  }, [center])
  return null
}

const userIcon = L.divIcon({
  html: `<div style="width:14px;height:14px;background:#534AB7;border:3px solid white;border-radius:50%;box-shadow:0 0 0 3px rgba(83,74,183,0.3)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  className: '',
})

export default function FacilityLocator() {
  const navigate = useNavigate()
  const active = '/facility-locator'

  const [activeType, setActiveType] = useState('all')
  const [activeDisease, setActiveDisease] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedFacility, setSelectedFacility] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [locationError, setLocationError] = useState(null)

  const loadFacilities = useCallback(async (lat, lng) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/facilities/nearby`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat,
          lng,
          radius: 5000,
          facility_type: activeType
        })
      })
      if (!res.ok) throw new Error('Backend error')
      const data = await res.json()
      setFacilities(data)
    } catch (e) {
      setError('Hindi ma-load ang mga facilities. Subukan ulit.')
    } finally {
      setLoading(false)
    }
  }, [activeType])

  const getUserLocation = useCallback(() => {
    setLocationError(null)
    if (!navigator.geolocation) {
      setLocationError('Hindi sinusuportahan ng browser mo ang geolocation.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setUserLocation({ lat: latitude, lng: longitude })
        loadFacilities(latitude, longitude)
      },
      () => {
        setLocationError('Hindi ma-detect ang location mo. I-allow ang location access.')
        const fallbackLat = 14.6760
        const fallbackLng = 121.0437
        setUserLocation({ lat: fallbackLat, lng: fallbackLng })
        loadFacilities(fallbackLat, fallbackLng)
      },
      { timeout: 8000, enableHighAccuracy: true }
    )
  }, [loadFacilities])

  useEffect(() => {
    getUserLocation()
  }, [])

  useEffect(() => {
    if (userLocation) {
      loadFacilities(userLocation.lat, userLocation.lng)
    }
  }, [activeType])

  const filtered = facilities.filter(f => {
    const matchDisease = activeDisease === 'all' || diseaseTypeMap[activeDisease]?.includes(f.type)
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.address.toLowerCase().includes(search.toLowerCase())
    return matchDisease && matchSearch
  })

  const mapCenter = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [14.6760, 121.0437]

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F3FF] font-sans">

      {/* Sidebar */}
      <div
        className="w-[240px] shrink-0 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-3 h-screen overflow-hidden"
        style={{ boxShadow: '2px 0 12px rgba(83,74,183,0.06)' }}
      >
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
                <button
                  key={i}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left relative ${isActive ? 'bg-[#EEEDFE] text-[#534AB7]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                >
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
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <RiLogoutBoxLine className="text-sm" />
          </div>
          Mag-logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div
          className="bg-white border-b border-gray-100 px-8 py-5 shrink-0"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <RiMapPin2Line className="text-[#534AB7] text-xl" />
                <h1 className="text-2xl font-semibold text-gray-900">Facility Locator</h1>
              </div>
              <p className="text-sm text-gray-400">Hanapin ang pinakamalapit na health facility sa iyong lugar.</p>
            </div>
            <div className="flex items-center gap-2">
              {locationError && (
                <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-xl">
                  <RiErrorWarningLine />
                  {locationError}
                </div>
              )}
              <button
                onClick={getUserLocation}
                disabled={loading}
                className="flex items-center gap-1.5 bg-[#534AB7] text-white text-xs font-medium px-3 py-2 rounded-xl hover:bg-[#3C3489] transition disabled:opacity-50"
              >
                <RiRefreshLine className={loading ? 'animate-spin' : ''} />
                {loading ? 'Naglo-load...' : 'I-refresh'}
              </button>
              <div className="flex items-center gap-2 bg-[#E1F5EE] text-[#1D9E75] text-xs font-medium px-3 py-2 rounded-xl">
                <RiShieldCheckLine />
                May PhilHealth at Libreng Serbisyo
              </div>
            </div>
          </div>

          {/* Search + Type Filters */}
          <div className="flex items-center gap-3 mb-3">
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

          {/* Disease Filters */}
          <div className="flex gap-2">
            <span className="text-xs text-gray-400 self-center mr-1">Sakit:</span>
            {diseaseFilters.map(d => (
              <button
                key={d.id}
                onClick={() => setActiveDisease(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${activeDisease === d.id ? 'bg-[#1D9E75] text-white' : 'bg-[#F4F3FF] text-gray-500 hover:bg-gray-200'}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">

          {/* Facility List */}
          <div className="w-[340px] shrink-0 overflow-y-auto bg-white border-r border-gray-100">
            <div className="p-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-8 h-8 border-2 border-[#534AB7] border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-gray-400">Naghahanap ng mga health facility...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                  <RiErrorWarningLine className="text-3xl text-red-400" />
                  <p className="text-sm text-gray-500">{error}</p>
                  <button onClick={getUserLocation} className="text-xs text-[#534AB7] underline">Subukan ulit</button>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-400 mb-3">
                    {filtered.length} {filtered.length === 1 ? 'facility' : 'facilities'} found
                    {userLocation ? ' malapit sa iyo' : ''}
                  </p>
                  {filtered.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-sm text-gray-400">Walang nahanap na facility.</p>
                      <p className="text-xs text-gray-300 mt-1">Baguhin ang filter o search.</p>
                    </div>
                  ) : (
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
                              <p className="text-xs text-gray-400 mt-0.5 truncate">{facility.address}</p>
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
                            {facility.hours !== '—' && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <RiTimeLine className="text-gray-400" />
                                {facility.hours}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 mt-2">
                            {facility.free === true && (
                              <span className="text-xs bg-[#E1F5EE] text-[#1D9E75] px-2 py-0.5 rounded-lg font-medium">Libre</span>
                            )}
                            {facility.philhealth && (
                              <span className="text-xs bg-[#EEEDFE] text-[#534AB7] px-2 py-0.5 rounded-lg font-medium">PhilHealth</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 relative">
            <MapContainer
              center={mapCenter}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapController center={mapCenter} />

              {userLocation && (
                <>
                  <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                    <Popup><span className="text-xs font-medium">Ikaw nandito 📍</span></Popup>
                  </Marker>
                  <Circle
                    center={[userLocation.lat, userLocation.lng]}
                    radius={5000}
                    pathOptions={{ color: '#534AB7', fillColor: '#534AB7', fillOpacity: 0.05, weight: 1, dashArray: '4' }}
                  />
                </>
              )}

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
                      {facility.phone !== '—' && <p className="text-xs text-gray-500">{facility.phone}</p>}
                      {facility.hours !== '—' && <p className="text-xs text-gray-500">{facility.hours}</p>}
                      <p className="text-xs text-[#534AB7] font-medium mt-1">{facility.distance} mula sa iyo</p>
                      <div className="flex gap-1 mt-1">
                        {facility.free === true && (
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
                      {selectedFacility.free === true && (
                        <span className="text-xs bg-[#E1F5EE] text-[#1D9E75] px-2 py-0.5 rounded-lg font-medium">Libre</span>
                      )}
                      {selectedFacility.free === null && (
                        <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-lg font-medium">Fee Unknown</span>
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
                  {selectedFacility.phone !== '—' && (
                    <div className="flex items-center gap-2">
                      <RiPhoneLine className="text-[#534AB7] shrink-0" />
                      <span className="text-xs text-gray-600">{selectedFacility.phone}</span>
                    </div>
                  )}
                  {selectedFacility.hours !== '—' && (
                    <div className="flex items-center gap-2">
                      <RiTimeLine className="text-[#534AB7] shrink-0" />
                      <span className="text-xs text-gray-600">{selectedFacility.hours}</span>
                    </div>
                  )}
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