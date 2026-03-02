import React, { useState, useEffect } from 'react'
import CloudMascot from '../ui/CloudMascot.jsx'
import GuestWarningPopup from '../ui/GuestWarningPopup.jsx'
import AddCityModal from './AddCityModal.jsx'
import { getWeatherIcon } from '../ui/PixelIcons.jsx'
import { useCities } from '../../hooks/useCities.js'
import { useWeather } from '../../hooks/useWeather.js'

const fmt = (d) => {
  if (!d) return '--:--'
  const p = n => String(n).padStart(2,'0')
  return `${p(d.getHours())}:${p(d.getMinutes())}`
}

const StatBox = ({ label, value }) => (
  <div style={{ background:'rgba(255,255,255,0.07)', border:'2px solid rgba(255,255,255,0.15)', padding:'10px 8px', textAlign:'center' }}>
    <span style={{ color:'#88aaff', fontSize:5, marginBottom:6, display:'block', fontFamily:"'Press Start 2P',monospace" }}>{label}</span>
    <span style={{ color:'#fff', fontSize:9, fontFamily:"'Press Start 2P',monospace" }}>{value}</span>
  </div>
)

export default function WeatherScreen({ user, isGuest, lang, onGoAuth, t, skyTheme }) {
  const [showGuestWarn, setShowGuestWarn] = useState(false)
  const [showAddCity,   setShowAddCity]   = useState(false)

  const {
    cities, activeIndex, setActiveIndex, activeCity,
    addCity, removeCity,
    searchResults, searching, searchCities,
    detectLocation,
  } = useCities(user, isGuest)

  const { data, loading, error, reload } = useWeather(activeCity, lang)

  // Auto-detect location on first load for guest / new users
  useEffect(() => {
    detectLocation(({ lat, lon }) => {
      // Only update home city coords, don't add to DB for guest
      // Just trigger a re-render with detected coords
    })
  }, [])

  const handleAddCity = () => {
    if (isGuest) { setShowGuestWarn(true); return }
    setShowAddCity(true)
  }

  const mascotMsg = isGuest ? t('welcomeGuest') : (data ? t('clearSky') : t('loading'))

  const dayLabel = (f) => {
    if (lang === 'ja') return f.dayJa
    if (lang === 'en') return f.dayEn
    return f.dayId
  }

  return (
    <div style={{
      width:'100%', maxWidth:420,
      display:'flex', flexDirection:'column', alignItems:'center',
      paddingBottom:80, zIndex:5, position:'relative',
    }}>
      <div style={{ height:52 }} />

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:20, padding:'10px 16px', width:'100%' }}>
        <CloudMascot message={mascotMsg} />
        <div>
          <div style={{ fontFamily:"'Press Start 2P',monospace", color:'#fbd000', fontSize:11, marginBottom:6 }}>
            {t('appName')}
          </div>
          <div style={{
            display:'flex', alignItems:'center', gap:6,
            background:'rgba(0,0,0,0.4)', border:'2px solid rgba(255,255,255,0.2)',
            padding:'4px 8px', fontSize:6, color:'#ccc',
            fontFamily:"'Press Start 2P',monospace",
          }}>
            <div style={{ width:6, height:6, background:skyTheme.dot }} />
            <span>{skyTheme.label}</span>
            {isGuest && <span style={{ color:'#666', fontSize:5, marginLeft:4 }}>| GUEST</span>}
          </div>
        </div>
      </div>

      {/* Guest banner */}
      {isGuest && (
        <div style={{
          width:'calc(100% - 32px)', maxWidth:380,
          background:'rgba(251,208,0,0.08)', border:'2px dashed rgba(251,208,0,0.3)',
          padding:'8px 12px', marginBottom:4,
          fontFamily:"'Press Start 2P',monospace", fontSize:5, color:'#aaa', lineHeight:2.4,
          display:'flex', alignItems:'center', gap:10,
        }}>
          <span style={{ fontSize:14 }}>👤</span>
          <span>{t('guestBanner')}</span>
        </div>
      )}

      <div style={{ padding:'0 16px', width:'100%' }}>
        {/* City chips */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', marginBottom:8, paddingBottom:4 }}>
          {cities.map((city, idx) => (
            <div
              key={city.id || idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                flexShrink:0, padding:'6px 10px', fontSize:6,
                fontFamily:"'Press Start 2P',monospace",
                border:'3px solid #101010', cursor:'pointer', whiteSpace:'nowrap',
                boxShadow:'3px 3px 0 #101010',
                background: activeIndex === idx ? '#fbd000' : 'rgba(255,255,255,0.1)',
                color: activeIndex === idx ? '#101010' : '#fff',
              }}
            >
              {idx === 0 ? '📍' : '🌍'} {city.name.toUpperCase()}
            </div>
          ))}
          <div
            onClick={handleAddCity}
            style={{
              flexShrink:0, padding:'6px 10px', fontSize:6,
              fontFamily:"'Press Start 2P',monospace",
              border:'3px solid #101010', cursor:'pointer', whiteSpace:'nowrap',
              boxShadow:'3px 3px 0 #101010',
              background: isGuest ? 'rgba(255,255,255,0.05)' : '#26a244',
              color: isGuest ? '#666' : '#fff',
            }}
          >
            {isGuest ? '🔒' : '＋'} {t('addCity')}
          </div>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div style={{ textAlign:'center', padding:'40px 0', color:'#88aaff', fontSize:8, fontFamily:"'Press Start 2P',monospace" }}>
            {t('loading')}
          </div>
        )}

        {error && !loading && (
          <div style={{
            textAlign:'center', padding:'30px 16px',
            background:'rgba(229,34,34,0.1)', border:'3px solid #e52222',
            marginBottom:12,
          }}>
            <div style={{ color:'#ff8888', fontSize:7, fontFamily:"'Press Start 2P',monospace", marginBottom:12 }}>
              ⚠ {t('errorFetch')}
            </div>
            <button onClick={reload} style={{
              fontFamily:"'Press Start 2P',monospace", fontSize:6,
              padding:'10px 16px', border:'3px solid #fbd000',
              background:'transparent', color:'#fbd000', cursor:'pointer',
            }}>{t('retry')}</button>
          </div>
        )}

        {/* Main card */}
        {data && !loading && (
          <div style={{
            background:'rgba(0,0,20,0.8)', border:'4px solid #fbd000',
            boxShadow:'6px 6px 0 #101010', padding:'18px', marginBottom:8,
          }}>
            {/* Location */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
              <div style={{ width:10, height:14, background:'#e52222', clipPath:'polygon(50% 100%,0 30%,20% 0,80% 0,100% 30%)', flexShrink:0 }} />
              <span style={{ color:'#fbd000', fontSize:9, fontFamily:"'Press Start 2P',monospace" }}>
                {data.name.toUpperCase()}
              </span>
            </div>
            <div style={{ color:'#888', fontSize:6, marginBottom:14, paddingLeft:18, fontFamily:"'Press Start 2P',monospace" }}>
              {data.country}
            </div>

            {/* Temp row */}
            <div style={{ display:'flex', alignItems:'flex-end', gap:12, marginBottom:14 }}>
              <div style={{ flexShrink:0, marginBottom:4 }}>
                {getWeatherIcon(data.icon, 'lg')}
              </div>
              <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:42, color:'#fff', textShadow:'3px 3px #101010', lineHeight:1 }}>{data.temp}</div>
              <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:18, color:'#fbd000', alignSelf:'flex-start', marginTop:4 }}>°C</div>
              <div style={{ marginLeft:'auto', textAlign:'right', fontFamily:"'Press Start 2P',monospace" }}>
                <div style={{ color:'#cef', fontSize:7, textTransform:'uppercase' }}>{data.desc}</div>
                <div style={{ color:'#aaa', fontSize:6, marginTop:4 }}>{t('feelsLike')} {data.feelsLike}°C</div>
                {data.hourlyRain[0]?.pct > 30 && (
                  <div style={{ color:'#88aaff', fontSize:6, marginTop:4 }}>
                    {t('rainAt')}{data.hourlyRain.find(r=>r.pct>30)?.time}
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
              <StatBox label={t('wind')}       value={`${data.wind} km/h`} />
              <StatBox label={t('humidity')}   value={`${data.humidity}%`} />
              <StatBox label={t('visibility')} value={`${data.visibility} km`} />
              <StatBox label={t('pressure')}   value={`${data.pressure} hPa`} />
            </div>

            {/* Rain forecast */}
            {data.hourlyRain.length > 0 && (
              <div style={{ marginBottom:14 }}>
                <div style={{ color:'#fbd000', fontSize:7, marginBottom:8, borderBottom:'2px solid rgba(255,255,255,0.1)', paddingBottom:6, fontFamily:"'Press Start 2P',monospace" }}>
                  {t('rainForecast')}
                </div>
                <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4 }}>
                  {data.hourlyRain.map(r => (
                    <div key={r.time} style={{ flexShrink:0, textAlign:'center' }}>
                      <span style={{ color:'#88aaff', fontSize:5, marginBottom:4, display:'block', fontFamily:"'Press Start 2P',monospace" }}>{r.time}</span>
                      <div style={{ width:28, height:48, background:'rgba(255,255,255,0.1)', border:'2px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'flex-end' }}>
                        <div style={{ width:'100%', height:`${r.pct}%`, background:'linear-gradient(180deg,#5c94fc,#1a3a8f)' }} />
                      </div>
                      <span style={{ color:'#cef', fontSize:5, marginTop:3, display:'block', fontFamily:"'Press Start 2P',monospace" }}>{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5-day forecast */}
            {data.daily.length > 0 && (
              <div>
                <div style={{ color:'#fbd000', fontSize:7, marginBottom:8, borderBottom:'2px solid rgba(255,255,255,0.1)', paddingBottom:6, fontFamily:"'Press Start 2P',monospace" }}>
                  {t('fiveDays')}
                </div>
                <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4 }}>
                  {data.daily.map(f => (
                    <div key={f.date} style={{
                      flexShrink:0, background:'rgba(255,255,255,0.07)',
                      border:'2px solid rgba(255,255,255,0.15)',
                      padding:'8px 4px', textAlign:'center', minWidth:62,
                    }}>
                      <span style={{ color:'#fbd000', fontSize:5, marginBottom:6, display:'block', fontFamily:"'Press Start 2P',monospace" }}>
                        {dayLabel(f)}
                      </span>
                      {getWeatherIcon(f.icon)}
                      <span style={{ color:'#aaa', fontSize:4, display:'block', marginTop:3, fontFamily:"'Press Start 2P',monospace", textTransform:'capitalize' }}>
                        {f.desc.split(' ')[0]}
                      </span>
                      <span style={{ color:'#fff', fontSize:7, display:'block', marginTop:4, fontFamily:"'Press Start 2P',monospace" }}>{f.hi}°</span>
                      <span style={{ color:'#88aaff', fontSize:6, display:'block', fontFamily:"'Press Start 2P',monospace" }}>{f.lo}°</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sunrise / Sunset */}
        {data && !loading && (
          <div style={{ background:'rgba(0,0,20,0.8)', border:'4px solid #fbd000', boxShadow:'6px 6px 0 #101010', padding:'14px 16px', marginBottom:8 }}>
            <div style={{ color:'#fbd000', fontSize:7, marginBottom:10, borderBottom:'2px solid rgba(255,255,255,0.1)', paddingBottom:6, fontFamily:"'Press Start 2P',monospace" }}>
              {t('sunMoon')}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ color:'#fbd000', marginBottom:6, fontSize:5, fontFamily:"'Press Start 2P',monospace" }}>{t('sunrise')}</div>
                <div style={{ color:'#fff', fontSize:7, fontFamily:"'Press Start 2P',monospace" }}>{fmt(data.sunrise)}</div>
              </div>
              <div style={{ flex:1, margin:'0 12px', position:'relative', height:4 }}>
                <div style={{ height:3, background:'linear-gradient(90deg,#fbd000,#ff6b00,#5c94fc)', width:'100%' }} />
                <div style={{
                  position:'absolute', top:'50%', transform:'translateY(-50%)',
                  left: (() => {
                    const now = Date.now(), sr = data.sunrise?.getTime() || 0, ss = data.sunset?.getTime() || 1
                    const pct = Math.min(100, Math.max(0, ((now - sr) / (ss - sr)) * 100))
                    return `${pct}%`
                  })(),
                  width:12, height:12, background:'#fbd000', border:'2px solid #c88000',
                  marginLeft:-6,
                }} />
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ color:'#88aaff', marginBottom:6, fontSize:5, fontFamily:"'Press Start 2P',monospace" }}>{t('sunset')}</div>
                <div style={{ color:'#fff', fontSize:7, fontFamily:"'Press Start 2P',monospace" }}>{fmt(data.sunset)}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popups */}
      {showGuestWarn && (
        <GuestWarningPopup
          onClose={() => setShowGuestWarn(false)}
          onGoAuth={() => { setShowGuestWarn(false); onGoAuth() }}
          t={t}
        />
      )}

      {showAddCity && (
        <AddCityModal
          onClose={() => setShowAddCity(false)}
          onAdd={addCity}
          searching={searching}
          searchResults={searchResults}
          onSearch={searchCities}
          t={t}
        />
      )}
    </div>
  )
}
