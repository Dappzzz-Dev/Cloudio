import React, { useState } from 'react'
import AuthScreen from './components/auth/AuthScreen.jsx'
import WeatherScreen from './components/weather/WeatherScreen.jsx'
import SkyBackground from './components/ui/SkyBackground.jsx'
import SettingsModal from './components/ui/SettingsModal.jsx'
import { useAuth } from './hooks/useAuth.js'
import { useClock, getSkyTheme, formatClock } from './hooks/useClock.js'
import { translations, t as translate } from './i18n/index.js'

export default function App() {
  const [lang,         setLang]         = useState('id')
  const [showSettings, setShowSettings] = useState(false)
  const [authError,    setAuthError]    = useState('')
  const [authLoading,  setAuthLoading]  = useState(false)

  const { user, isGuest, loading: authLoading_, signIn, signUp, signOut, enterAsGuest } = useAuth()
  const now      = useClock()
  const skyTheme = getSkyTheme(now.getHours(), lang)
  const clockStr = formatClock(now)

  const t = (key) => translate(lang, key)

  const isOnWeather = !!user || isGuest

  const handleAuth = async ({ email, password, fullName, mode }) => {
    setAuthError('')
    setAuthLoading(true)
    try {
      if (mode === 'login') await signIn(email, password)
      else await signUp(email, password, fullName)
    } catch (e) {
      setAuthError(e.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className={skyTheme.cls} style={{
      minHeight:'100vh', position:'relative',
      overflow:'hidden', display:'flex',
      flexDirection:'column', alignItems:'center',
      transition:'background 2s ease',
    }}>
      {/* Sky */}
      <SkyBackground skyTheme={skyTheme} />

      {/* Ground */}
      <div style={{
        position:'fixed', bottom:0, left:0, right:0, height:48, zIndex:10,
        background:'repeating-linear-gradient(90deg,#c84b11 0,#c84b11 16px,#a03309 16px,#a03309 32px)',
        borderTop:'4px solid #101010',
      }}>
        <div style={{
          position:'absolute', top:-16, left:0, right:0, height:16,
          background:'repeating-linear-gradient(90deg,#26a244 0,#26a244 16px,#1e8a36 16px,#1e8a36 32px)',
          borderTop:'4px solid #101010',
        }} />
      </div>

      {/* HUD bar */}
      <div style={{
        position:'fixed', top:0, left:'50%', transform:'translateX(-50%)',
        width:'100%', maxWidth:420, padding:'8px 16px',
        display:'flex', justifyContent:'space-between', alignItems:'center',
        background:'rgba(0,0,0,0.78)', zIndex:20,
        fontSize:7, borderBottom:'3px solid rgba(255,255,255,0.08)',
        fontFamily:"'Press Start 2P',monospace",
      }}>
        <span style={{ color:'#fcfcfc', display:'flex', alignItems:'center', gap:5 }}>
          ☁ CLOUDIO
          {isGuest && <span style={{ color:'#666', fontSize:5, marginLeft:4 }}>[GUEST]</span>}
        </span>
        <span style={{ color:'#fbd000', fontSize:9, letterSpacing:2 }}>{clockStr}</span>
        {isOnWeather
          ? (
            <div style={{ display:'flex', gap:6 }}>
              <button
                onClick={() => setShowSettings(true)}
                style={{ background:'none', border:'2px solid rgba(255,255,255,0.3)', color:'#fff', fontFamily:"'Press Start 2P',monospace", fontSize:7, padding:'4px 8px', cursor:'pointer' }}
              >⚙</button>
              <button
                onClick={handleLogout}
                style={{ background:'none', border:'2px solid rgba(255,255,255,0.3)', color:'#fff', fontFamily:"'Press Start 2P',monospace", fontSize:7, padding:'4px 8px', cursor:'pointer' }}
              >{t('logout')}</button>
            </div>
          )
          : <span style={{ fontSize:6, color:'#555' }}>{t('notLoggedIn')}</span>
        }
      </div>

      {/* Content */}
      {!isOnWeather
        ? (
          <AuthScreen
            onEnter={handleAuth}
            onGuest={enterAsGuest}
            t={t}
            authError={authError}
            loading={authLoading}
          />
        )
        : (
          <WeatherScreen
            user={user}
            isGuest={isGuest}
            lang={lang}
            t={t}
            skyTheme={skyTheme}
            onGoAuth={() => signOut()}
          />
        )
      }

      {/* Modals */}
      {showSettings && (
        <SettingsModal
          lang={lang}
          onChangeLang={setLang}
          onClose={() => setShowSettings(false)}
          t={t}
        />
      )}
    </div>
  )
}
