import React from 'react'
import { LANGUAGES } from '../i18n'

export default function SettingsModal({ t, lang, setLang, onClose }) {
  return (
    <div
      style={{
        position:'fixed', inset:0, background:'rgba(0,0,0,0.8)',
        display:'flex', alignItems:'center', justifyContent:'center',
        zIndex:200, padding:'0 20px', animation:'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background:'#0d0d2b', border:'4px solid #fbd000', boxShadow:'8px 8px 0 #101010',
          padding:'24px 20px', maxWidth:300, width:'100%',
          fontFamily:"'Press Start 2P'", animation:'popIn 0.2s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ color:'#fbd000', fontSize:9, marginBottom:20, textAlign:'center' }}>
          ⚙ {t('settings')}
        </div>

        <div style={{ color:'#88aaff', fontSize:6, marginBottom:10 }}>{t('language')}</div>
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
          {Object.entries(LANGUAGES).map(([code, info]) => (
            <button
              key={code}
              className="px-btn"
              onClick={() => setLang(code)}
              style={{
                background: lang === code ? '#fbd000' : 'rgba(255,255,255,0.06)',
                color: lang === code ? '#101010' : '#ccc',
                border: lang === code ? '4px solid #101010' : '3px solid rgba(255,255,255,0.2)',
                boxShadow: lang === code ? '4px 4px 0 #101010' : 'none',
                fontSize:8, padding:'12px',
                display:'flex', alignItems:'center', gap:10,
              }}
            >
              <span style={{ fontSize:16 }}>{info.flag}</span> {info.label}
            </button>
          ))}
        </div>

        <button
          className="px-btn"
          onClick={onClose}
          style={{ background:'rgba(255,255,255,0.06)', color:'#888', border:'3px dashed rgba(255,255,255,0.2)', boxShadow:'none', fontSize:6, padding:10 }}
        >
          ✕ {t('back')}
        </button>
      </div>
    </div>
  )
}
