import React, { useEffect, useState, useCallback } from 'react'
import CloudMascot from './CloudMascot'
import { WeatherIcon } from './WeatherIcons'
import GuestWarningPopup from './GuestWarningPopup'
import AddCityModal from './AddCityModal'
import SettingsModal from './SettingsModal'
import { useWeather } from '../hooks/useWeather'
import { useCities } from '../hooks/useCities'
import { getUVLabel } from '../lib/weather'
import { getWeatherByCityName } from '../lib/weather'

function pad(n) { return String(n).padStart(2,'0') }
function formatTime(unix) {
  const d = new Date(unix * 1000)
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function WeatherScreen({ t, lang, setLang, user, isGuest, skyTheme, clock, onLogout }) {
  const { weather, forecast, hourly, loading, error, loadByCoords, loadByCity, requestLocation } = useWeather()
  const { cities, addCity, removeCity } = useCities(user?.id)

  const [activeCity,    setActiveCity]    = useState(null) // null = current location
  const [locationError, setLocationError] = useState(false)
  const [showGuest,     setShowGuest]     = useState(false)
  const [showAddCity,   setShowAddCity]   = useState(false)
  const [showSettings,  setShowSettings]  = useState(false)
  const [userCoords,    setUserCoords]    = useState(null)

  const loadLocation = useCallback(async () => {
    setLocationError(false)
    try {
      const { lat, lon } = await requestLocation()
      setUserCoords({ lat, lon })
      await loadByCoords(lat, lon)
    } catch {
      setLocationError(true)
    }
  }, [requestLocation, loadByCoords])

  useEffect(() => { loadLocation() }, []) // eslint-disable-line

  async function switchToCity(city) {
    setActiveCity(city.id)
    await loadByCity(city.city_name)
  }

  async function switchToMyLocation() {
    setActiveCity(null)
    if (userCoords) await loadByCoords(userCoords.lat, userCoords.lon)
    else loadLocation()
  }

  async function handleAddCity(name) {
    // fetch coords then save
    const data = await getWeatherByCityName(name)
    const c = data.current
    await addCity(c.name, c.coord.lat, c.coord.lon, c.sys.country)
  }

  function handleAddClick() {
    if (isGuest) { setShowGuest(true); return }
    setShowAddCity(true)
  }

  const mascotMsg = isGuest ? t('welcomeGuest') : loading ? '...' : weather ? `${weather.temp}°C` : t('welcomeBack')

  const periodKey  = skyTheme.period
  const periodLabel = t('timePeriods') ? t('timePeriods')[periodKey] : periodKey.toUpperCase()

  const days = t('days') || ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const uvInfo = weather?.uvIndex != null ? getUVLabel(weather.uvIndex, k => t(k)) : null

  return (
    <div style={{ width:'100%', maxWidth:440, display:'flex', flexDirection:'column', alignItems:'center', paddingBottom:80, zIndex:5, position:'relative' }}>
      <div style={{ height:52 }} />

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:16, padding:'12px 16px', width:'100%', flexWrap:'wrap' }}>
        <CloudMascot message={mascotMsg} mood={isGuest ? 'happy' : 'happy'} />
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Press Start 2P'", color:'#fbd000', fontSize:12, marginBottom:6 }}>{t('appName')}</div>
          <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(0,0,0,0.35)', border:'2px solid rgba(255,255,255,0.15)', padding:'4px 8px', fontFamily:"'Press Start 2P'", fontSize:6, color:'#ccc' }}>
            <div style={{ width:6, height:6, background: skyTheme.period === 'night' || skyTheme.period === 'evening' ? '#3b3b9a' : skyTheme.period === 'dawn' || skyTheme.period === 'dusk' ? '#e8733a' : '#5c94fc' }} />
            {periodLabel}
            {isGuest && <span style={{ color:'#777', marginLeft:6 }}>| {t('guestModeLabel')}</span>}
          </div>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          style={{ background:'none', border:'2px solid rgba(255,255,255,0.3)', color:'#fff', fontFamily:"'Press Start 2P'", fontSize:7, padding:'6px 10px', cursor:'pointer' }}
        >
          ⚙
        </button>
      </div>

      {/* Guest banner */}
      {isGuest && (
        <div style={{
          width:'calc(100% - 32px)', maxWidth:400,
          background:'rgba(251,208,0,0.07)', border:'2px dashed rgba(251,208,0,0.3)',
          padding:'8px 12px', marginBottom:6,
          fontFamily:"'Press Start 2P'", fontSize:5, color:'#aaa', lineHeight:2.2,
          display:'flex', alignItems:'center', gap:10,
        }}>
          <span style={{ fontSize:12 }}>👤</span>
          <span>Mode <span style={{ color:'#fbd000' }}>{t('guestModeLabel')}</span> — {t('guestWarning')}</span>
        </div>
      )}

      <div style={{ padding:'0 16px', width:'100%' }}>

        {/* City chips */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', marginBottom:8, paddingBottom:4 }}>
          <button
            onClick={switchToMyLocation}
            style={{
              flexShrink:0, padding:'6px 10px', fontSize:6, fontFamily:"'Press Start 2P'",
              border:'3px solid #101010', cursor:'pointer', whiteSpace:'nowrap', boxShadow:'3px 3px 0 #101010',
              background: activeCity === null ? '#fbd000' : 'rgba(255,255,255,0.1)',
              color: activeCity === null ? '#101010' : '#fff',
            }}
          >
            📍 {t('myLocation')}
          </button>

          {!isGuest && cities.map(c => (
            <button
              key={c.id}
              onClick={() => switchToCity(c)}
              style={{
                flexShrink:0, padding:'6px 10px', fontSize:6, fontFamily:"'Press Start 2P'",
                border:'3px solid #101010', cursor:'pointer', whiteSpace:'nowrap', boxShadow:'3px 3px 0 #101010',
                background: activeCity === c.id ? '#fbd000' : 'rgba(255,255,255,0.1)',
                color: activeCity === c.id ? '#101010' : '#fff',
              }}
            >
              {c.city_name}
              <span
                style={{ marginLeft:6, color: activeCity === c.id ? '#e52222' : '#e52222', cursor:'pointer' }}
                onClick={ev => { ev.stopPropagation(); removeCity(c.id) }}
              > ×</span>
            </button>
          ))}

          <button
            onClick={handleAddClick}
            style={{
              flexShrink:0, padding:'6px 10px', fontSize:6, fontFamily:"'Press Start 2P'",
              border: isGuest ? '3px dashed rgba(255,255,255,0.25)' : '3px solid #101010',
              cursor:'pointer', whiteSpace:'nowrap',
              boxShadow: isGuest ? 'none' : '3px 3px 0 #101010',
              background:'#26a244', color:'#fff',
            }}
          >
            {isGuest ? '🔒' : '＋'} {t('addCity')}
          </button>
        </div>

        {/* Location error */}
        {locationError && (
          <div style={{ background:'rgba(229,34,34,0.15)', border:'2px solid #e52222', padding:'10px 12px', marginBottom:10, fontFamily:"'Press Start 2P'", fontSize:6, color:'#ff8888', display:'flex', alignItems:'center', gap:10 }}>
            <span>⚠</span>
            <div>
              {t('errorLocation')}
              <br />
              <button onClick={loadLocation} style={{ background:'none', border:'none', color:'#fbd000', fontFamily:"'Press Start 2P'", fontSize:6, cursor:'pointer', marginTop:6 }}>
                ↺ {t('grantLocation')}
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign:'center', fontFamily:"'Press Start 2P'", color:'#fbd000', fontSize:8, padding:40 }}>
            <div style={{ marginBottom:12, fontSize:24 }}>☁</div>
            {t('loading')}
          </div>
        )}

        {/* API error */}
        {error && !loading && (
          <div style={{ background:'rgba(229,34,34,0.15)', border:'2px solid #e52222', padding:'12px', marginBottom:10, fontFamily:"'Press Start 2P'", fontSize:6, color:'#ff8888', textAlign:'center' }}>
            ⚠ {error}
          </div>
        )}

        {/* Main weather card */}
        {weather && !loading && (
          <>
            <div className="px-card" style={{ marginBottom:10, animation:'slideUp 0.4s ease' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                <div style={{ width:10, height:14, background:'#e52222', clipPath:'polygon(50% 100%,0 30%,20% 0,80% 0,100% 30%)' }} />
                <span style={{ fontFamily:"'Press Start 2P'", color:'#fbd000', fontSize:9 }}>{weather.name}</span>
                <span style={{ fontFamily:"'Press Start 2P'", color:'#555', fontSize:6, marginLeft:4 }}>{weather.country}</span>
              </div>
              <div style={{ fontFamily:"'Press Start 2P'", color:'#666', fontSize:6, marginBottom:14, paddingLeft:18 }}>
                {new Date().toLocaleDateString(lang === 'ja' ? 'ja-JP' : lang === 'en' ? 'en-US' : 'id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' }).toUpperCase()}
              </div>

              <div style={{ display:'flex', alignItems:'flex-end', gap:10, marginBottom:14 }}>
                <WeatherIcon condition={weather.condition} />
                <div style={{ fontFamily:"'Press Start 2P'", fontSize:40, color:'#fff', textShadow:'3px 3px #101010', lineHeight:1 }}>
                  {weather.temp}
                </div>
                <div style={{ fontFamily:"'Press Start 2P'", fontSize:18, color:'#fbd000', alignSelf:'flex-start', marginTop:4 }}>°C</div>
                <div style={{ fontFamily:"'Press Start 2P'", color:'#cef', fontSize:7, marginLeft:'auto', textAlign:'right', lineHeight:2.2 }}>
                  <div>{(t('conditions') || {})[weather.condition] || weather.condition}</div>
                  <div style={{ color:'#aaa', fontSize:6 }}>{t('feelsLike')} {weather.feelsLike}°C</div>
                  {hourly[0] && (
                    <div style={{ color:'#88aaff', fontSize:6 }}>
                      💧 {hourly.find(h => h.pop > 40)?.time || '—'}
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
                {[
                  { label: t('wind'),       val:`${weather.windSpeed} km/h` },
                  { label: t('humidity'),   val:`${weather.humidity}%` },
                  { label: t('visibility'), val: weather.visibility ? `${weather.visibility} km` : '—' },
                  { label: t('pressure'),   val:`${weather.pressure} hPa` },
                ].map(({ label, val }) => (
                  <div key={label} style={{ background:'rgba(255,255,255,0.07)', border:'2px solid rgba(255,255,255,0.15)', padding:'10px 8px', textAlign:'center' }}>
                    <span style={{ fontFamily:"'Press Start 2P'", color:'#88aaff', fontSize:5, marginBottom:6, display:'block' }}>{label}</span>
                    <span style={{ fontFamily:"'Press Start 2P'", color:'#fff', fontSize:9 }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Hourly rain bars */}
              {hourly.length > 0 && (
                <div style={{ marginBottom:14 }}>
                  <div className="section-title">⏱ {t('rainForecast')}</div>
                  <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4 }}>
                    {hourly.map((h, i) => (
                      <div key={i} style={{ flexShrink:0, textAlign:'center' }}>
                        <span style={{ fontFamily:"'Press Start 2P'", color:'#88aaff', fontSize:5, marginBottom:4, display:'block' }}>{h.time}</span>
                        <div style={{ width:28, height:48, background:'rgba(255,255,255,0.1)', border:'2px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'flex-end' }}>
                          <div style={{ width:'100%', height:`${h.pop}%`, background:'linear-gradient(180deg,#5c94fc,#1a3a8f)' }} />
                        </div>
                        <span style={{ fontFamily:"'Press Start 2P'", color:'#cef', fontSize:5, marginTop:3, display:'block' }}>{h.pop}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5-day forecast */}
              {forecast.length > 0 && (
                <div>
                  <div className="section-title">📅 {t('fiveDayForecast')}</div>
                  <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4 }}>
                    {forecast.map((f, i) => (
                      <div key={i} style={{ flexShrink:0, background:'rgba(255,255,255,0.07)', border:'2px solid rgba(255,255,255,0.15)', padding:'8px 4px', textAlign:'center', minWidth:62 }}>
                        <span style={{ fontFamily:"'Press Start 2P'", color:'#fbd000', fontSize:5, marginBottom:6, display:'block' }}>
                          {days[f.date.getDay()]}
                        </span>
                        <WeatherIcon condition={f.condition} />
                        <span style={{ fontFamily:"'Press Start 2P'", color:'#aaa', fontSize:4, display:'block', marginTop:2 }}>
                          {(t('conditions') || {})[f.condition] || f.condition}
                        </span>
                        <span style={{ fontFamily:"'Press Start 2P'", color:'#fff', fontSize:7, display:'block', marginTop:4 }}>{f.tempHi}°</span>
                        <span style={{ fontFamily:"'Press Start 2P'", color:'#88aaff', fontSize:6, display:'block' }}>{f.tempLo}°</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sunrise / UV */}
            <div className="px-card" style={{ padding:'14px 16px', marginBottom:10, animation:'slideUp 0.5s ease' }}>
              <div className="section-title">☀ {t('sunUV')}</div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:"'Press Start 2P'", color:'#fff', fontSize:7, marginBottom:12 }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ color:'#fbd000', marginBottom:6, fontSize:5 }}>{t('sunrise')}</div>
                  <div>{formatTime(weather.sunrise)}</div>
                </div>
                <div style={{ flex:1, margin:'0 12px', position:'relative' }}>
                  <div style={{ height:3, background:'linear-gradient(90deg,#fbd000,#ff6b00,#5c94fc)' }} />
                  <div style={{
                    position:'absolute', width:12, height:12,
                    background:'#fbd000', border:'2px solid #c88000',
                    top:'50%', left:`${Math.min(95, Math.max(5, ((Date.now()/1000 - weather.sunrise) / (weather.sunset - weather.sunrise)) * 100))}%`,
                    transform:'translate(-50%,-50%)',
                  }} />
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ color:'#88aaff', marginBottom:6, fontSize:5 }}>{t('sunset')}</div>
                  <div>{formatTime(weather.sunset)}</div>
                </div>
              </div>
              {uvInfo && (
                <div style={{ fontFamily:"'Press Start 2P'", fontSize:6, color:'#aaa', display:'flex', justifyContent:'space-between' }}>
                  <span>{t('uvIndex')}: <span style={{ color: uvInfo.color }}>{weather.uvIndex} - {uvInfo.label}</span></span>
                </div>
              )}
            </div>
          </>
        )}

        {/* Grant location prompt (no weather yet, no error) */}
        {!weather && !loading && !error && !locationError && (
          <div className="px-card" style={{ textAlign:'center', padding:32 }}>
            <div style={{ fontSize:32, marginBottom:16 }}>📍</div>
            <div style={{ fontFamily:"'Press Start 2P'", color:'#fbd000', fontSize:8, marginBottom:12 }}>{t('grantLocation')}</div>
            <div style={{ fontFamily:"'Press Start 2P'", color:'#888', fontSize:6, marginBottom:20 }}>{t('grantLocationDesc')}</div>
            <button className="px-btn" onClick={loadLocation} style={{ background:'#e52222', color:'#fff', fontSize:8, padding:12 }}>
              ▶ {t('grantLocation')}
            </button>
          </div>
        )}

      </div>

      {/* Modals */}
      {showGuest  && <GuestWarningPopup t={t} onClose={() => setShowGuest(false)} onGoAuth={onLogout} />}
      {showAddCity && <AddCityModal t={t} onAdd={handleAddCity} onClose={() => setShowAddCity(false)} />}
      {showSettings && <SettingsModal t={t} lang={lang} setLang={setLang} onClose={() => setShowSettings(false)} />}
    </div>
  )
}
