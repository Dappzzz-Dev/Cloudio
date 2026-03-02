import React, { useState } from 'react'
import CloudMascot from '../ui/CloudMascot.jsx'

export default function AuthScreen({ onEnter, onGuest, t, authError, loading }) {
  const [tab,         setTab]         = useState('login')
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [fullName,    setFullName]    = useState('')
  const [formError,   setFormError]   = useState('')

  const px = {
    input: {
      fontFamily:"'Press Start 2P',monospace", fontSize:7, padding:'12px',
      border:'4px solid #101010', background:'rgba(0,0,20,0.85)',
      color:'#fff', width:'100%', marginBottom:10, outline:'none', letterSpacing:1,
      display:'block',
    },
    label: {
      color:'#fbd000', fontSize:6, marginBottom:6, display:'block',
      fontFamily:"'Press Start 2P',monospace",
    },
    btnPrimary: {
      fontFamily:"'Press Start 2P',monospace", fontSize:8, padding:'12px 20px',
      border:'4px solid #101010', boxShadow:'4px 4px 0 #101010',
      cursor:'pointer', letterSpacing:1, width:'100%', marginBottom:10,
      background:'#e52222', color:'#fff',
    },
    btnYellow: {
      fontFamily:"'Press Start 2P',monospace", fontSize:8, padding:'12px 20px',
      border:'4px solid #101010', boxShadow:'4px 4px 0 #101010',
      cursor:'pointer', letterSpacing:1, width:'100%', marginBottom:10,
      background:'#fbd000', color:'#101010',
    },
    card: {
      background:'rgba(0,0,20,0.8)', border:'4px solid #fbd000',
      boxShadow:'6px 6px 0 #101010', padding:'20px', width:'100%',
    },
  }

  const handleSubmit = async () => {
    setFormError('')
    if (!email.trim() || !password.trim()) { setFormError('Isi semua field!'); return }
    if (tab === 'register') {
      if (!fullName.trim()) { setFormError('Isi nama lengkap!'); return }
      if (password !== confirmPass) { setFormError('Password tidak cocok!'); return }
      if (password.length < 6) { setFormError('Password min 6 karakter!'); return }
    }
    onEnter({ email: email.trim(), password, fullName: fullName.trim(), mode: tab })
  }

  const err = formError || authError

  return (
    <div style={{
      width:'100%', maxWidth:420, padding:'0 16px',
      paddingTop:72, paddingBottom:80,
      display:'flex', flexDirection:'column', alignItems:'center',
      zIndex:5, position:'relative',
    }}>
      <div style={{ textAlign:'center', marginBottom:16 }}>
        <CloudMascot message={tab === 'login' ? t('welcome') : t('welcomeRegister')} />
      </div>

      <div style={{ fontFamily:"'Press Start 2P',monospace", color:'#fbd000', fontSize:18, textShadow:'3px 3px #101010', marginBottom:4, textAlign:'center' }}>
        {t('appName')}
      </div>
      <div style={{ fontFamily:"'Press Start 2P',monospace", color:'#88aaff', fontSize:6, marginBottom:20, textAlign:'center' }}>
        {t('tagline')}
      </div>

      <div style={px.card}>
        {/* Tabs */}
        <div style={{ display:'flex', marginBottom:16, border:'4px solid #101010' }}>
          {['login','register'].map(tab_ => (
            <button key={tab_}
              onClick={() => { setTab(tab_); setFormError('') }}
              style={{
                flex:1, padding:'10px 4px',
                fontFamily:"'Press Start 2P',monospace", fontSize:7,
                border:'none', cursor:'pointer', letterSpacing:0.5,
                background: tab === tab_ ? '#fbd000' : 'rgba(0,0,0,0.5)',
                color: tab === tab_ ? '#101010' : '#888',
                borderRight: tab_ === 'login' ? '2px solid #101010' : 'none',
              }}
            >
              {tab_ === 'login' ? `▶ ${t('login')}` : `✦ ${t('register')}`}
            </button>
          ))}
        </div>

        {/* Error */}
        {err && (
          <div style={{ background:'rgba(229,34,34,0.15)', border:'2px solid #e52222', padding:'8px', marginBottom:10, color:'#ff8888', fontSize:6, fontFamily:"'Press Start 2P',monospace", lineHeight:2 }}>
            ⚠ {err}
          </div>
        )}

        {/* Register extra field */}
        {tab === 'register' && (
          <>
            <label style={px.label}>{t('fullName')}</label>
            <input style={px.input} placeholder="Mario Bintang" value={fullName} onChange={e=>setFullName(e.target.value)} />
          </>
        )}

        <label style={px.label}>{t('email')}</label>
        <input style={px.input} type="email" placeholder="player@email.com" value={email} onChange={e=>setEmail(e.target.value)} />

        <label style={px.label}>{t('password')}</label>
        <input style={px.input} type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()} />

        {tab === 'register' && (
          <>
            <label style={px.label}>{t('confirmPassword')}</label>
            <input style={px.input} type="password" placeholder="••••••••" value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} />
          </>
        )}

        <button style={{ ...px.btnPrimary, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? '...' : (tab === 'login' ? t('loginBtn') : t('registerBtn'))}
        </button>

        {tab === 'login' && (
          <div style={{ textAlign:'center', color:'#88aaff', fontSize:6, fontFamily:"'Press Start 2P',monospace", marginBottom:4 }}>
            <span style={{ color:'#555' }}>{t('forgotPassword')} </span>
            <span style={{ color:'#fbd000', cursor:'pointer' }}>{t('reset')}</span>
          </div>
        )}

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:8, margin:'14px 0 12px', fontFamily:"'Press Start 2P',monospace" }}>
          <div style={{ flex:1, height:2, background:'rgba(255,255,255,0.1)' }} />
          <span style={{ color:'#555', fontSize:5 }}>{t('or')}</span>
          <div style={{ flex:1, height:2, background:'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Guest button */}
        <button
          onClick={onGuest}
          style={{
            fontFamily:"'Press Start 2P',monospace", fontSize:7,
            padding:'12px 16px', border:'3px dashed rgba(255,255,255,0.25)',
            background:'rgba(255,255,255,0.04)', color:'#999',
            boxShadow:'none', width:'100%', marginBottom:0,
            cursor:'pointer', letterSpacing:1,
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          }}
        >
          <span style={{ fontSize:14 }}>👤</span> {t('guestBtn')}
        </button>

        {/* Guest warning */}
        <div style={{
          marginTop:8, padding:'8px 10px',
          background:'rgba(251,208,0,0.07)', border:'2px solid rgba(251,208,0,0.2)',
          fontFamily:"'Press Start 2P',monospace", fontSize:5, color:'#888', lineHeight:2.2,
        }}>
          ⚠ {t('guestWarning').split('\n').map((l,i) => <span key={i}>{l}{i < 2 && <br/>}</span>)}
        </div>
      </div>

      <div style={{ color:'#333', fontSize:5, fontFamily:"'Press Start 2P',monospace", marginTop:16, textAlign:'center' }}>
        © 2026 CLOUDIO — ALL RIGHTS RESERVED
      </div>
    </div>
  )
}
