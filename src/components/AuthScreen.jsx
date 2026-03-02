import React, { useState } from 'react'
import CloudMascot from './CloudMascot'

export default function AuthScreen({ t, onLogin, onRegister, onGuest }) {
  const [tab,      setTab]      = useState('login')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [name,     setName]     = useState('')
  const [error,    setError]    = useState('')
  const [busy,     setBusy]     = useState(false)

  const mascotMsg = tab === 'login' ? t('welcomeBack') : t('welcomeNew')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError(t('errorRequired'))
    if (tab === 'register') {
      if (!name) return setError(t('errorRequired'))
      if (password !== confirm) return setError(t('errorPasswordMatch'))
    }
    setBusy(true)
    try {
      if (tab === 'login') {
        await onLogin(email, password)
      } else {
        await onRegister(email, password, name)
      }
    } catch (err) {
      setError(tab === 'login' ? t('errorLogin') : t('errorRegister'))
    } finally {
      setBusy(false)
    }
  }

  const inputStyle = {
    fontFamily:"'Press Start 2P'", fontSize:7, padding:12,
    border:'4px solid #101010', background:'rgba(0,0,20,0.85)',
    color:'#fff', width:'100%', marginBottom:10, outline:'none', letterSpacing:1,
    display:'block',
  }
  const labelStyle = { color:'#fbd000', fontSize:6, marginBottom:6, display:'block', fontFamily:"'Press Start 2P'" }

  return (
    <div style={{
      width:'100%', maxWidth:420, padding:'0 16px',
      paddingTop:72, paddingBottom:96,
      display:'flex', flexDirection:'column', alignItems:'center',
      zIndex:5, position:'relative', animation:'fadeIn 0.35s ease',
    }}>
      <div style={{ textAlign:'center', marginBottom:16 }}>
        <CloudMascot message={mascotMsg} />
      </div>

      <div style={{ fontFamily:"'Press Start 2P'", color:'#fbd000', fontSize:18, textShadow:'3px 3px #101010', marginBottom:4, textAlign:'center' }}>
        {t('appName')}
      </div>
      <div style={{ fontFamily:"'Press Start 2P'", color:'#88aaff', fontSize:6, marginBottom:20, textAlign:'center' }}>
        {t('tagline')}
      </div>

      <div className="px-card" style={{ width:'100%' }}>
        {/* Tabs */}
        <div style={{ display:'flex', marginBottom:16, border:'4px solid #101010' }}>
          {['login','register'].map(k => (
            <button
              key={k}
              onClick={() => { setTab(k); setError('') }}
              style={{
                flex:1, padding:'10px 4px', fontFamily:"'Press Start 2P'", fontSize:7,
                border:'none', cursor:'pointer', letterSpacing:0.5,
                background: tab === k ? '#fbd000' : 'rgba(0,0,0,0.5)',
                color: tab === k ? '#101010' : '#888',
                borderRight: k === 'login' ? '2px solid #101010' : 'none',
              }}
            >
              {k === 'login' ? t('login') : t('register')}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <>
              <label style={labelStyle}>{t('fullName')}</label>
              <input className="px-input" style={{ marginBottom:10 }} placeholder="Mario Bintang" value={name} onChange={e => setName(e.target.value)} />
            </>
          )}
          <label style={labelStyle}>{t('email')}</label>
          <input className="px-input" style={{ marginBottom:10 }} type="email" placeholder="player@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          <label style={labelStyle}>{t('password')}</label>
          <input className="px-input" style={{ marginBottom:10 }} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          {tab === 'register' && (
            <>
              <label style={labelStyle}>{t('confirmPassword')}</label>
              <input className="px-input" style={{ marginBottom:10 }} type="password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} />
            </>
          )}

          {error && (
            <div style={{ background:'rgba(229,34,34,0.15)', border:'2px solid #e52222', padding:'8px 10px', marginBottom:10, fontFamily:"'Press Start 2P'", fontSize:5, color:'#ff8888' }}>
              ⚠ {error}
            </div>
          )}

          <button
            className="px-btn"
            type="submit"
            disabled={busy}
            style={{ background: tab === 'login' ? '#e52222' : '#fbd000', color: tab === 'login' ? '#fff' : '#101010', fontSize:8, padding:12, marginBottom:10 }}
          >
            {busy ? t('loading') : (tab === 'login' ? t('loginBtn') : t('registerBtn'))}
          </button>

          {tab === 'login' && (
            <div style={{ textAlign:'center', fontFamily:"'Press Start 2P'", fontSize:6, color:'#555', marginBottom:0 }}>
              {t('forgotPasswordLabel')} <span style={{ color:'#fbd000', cursor:'pointer' }}>{t('forgotPassword')}</span>
            </div>
          )}
        </form>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:8, margin:'14px 0 12px', fontFamily:"'Press Start 2P'" }}>
          <div style={{ flex:1, height:2, background:'rgba(255,255,255,0.1)' }} />
          <span style={{ color:'#555', fontSize:5 }}>{t('orLabel')}</span>
          <div style={{ flex:1, height:2, background:'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Guest button */}
        <button
          className="px-btn"
          onClick={onGuest}
          style={{
            background:'rgba(255,255,255,0.04)', color:'#888',
            border:'3px dashed rgba(255,255,255,0.2)', boxShadow:'none',
            fontSize:7, padding:'12px 10px', marginBottom:10,
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          }}
        >
          <span style={{ fontSize:14 }}>👤</span> {t('guestBtn')}
        </button>

        {/* Guest notice */}
        <div style={{
          background:'rgba(251,208,0,0.06)', border:'2px solid rgba(251,208,0,0.2)',
          padding:'8px 10px', fontFamily:"'Press Start 2P'", fontSize:5, color:'#888', lineHeight:2.2,
        }}>
          ⚠ {t('guestWarning')}
        </div>
      </div>

      <div style={{ color:'#333', fontSize:5, fontFamily:"'Press Start 2P'", marginTop:14 }}>
        © {t('copyright')}
      </div>
    </div>
  )
}
