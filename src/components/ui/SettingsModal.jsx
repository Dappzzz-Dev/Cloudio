import React from 'react'

const LANGS = [
  { code:'id', label:'🇮🇩 Indonesia' },
  { code:'en', label:'🇬🇧 English' },
  { code:'ja', label:'🇯🇵 日本語' },
]

export default function SettingsModal({ lang, onChangeLang, onClose, t }) {
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)',
      display:'flex', alignItems:'center', justifyContent:'center',
      zIndex:200, padding:'0 24px',
    }} onClick={onClose}>
      <div
        style={{
          background:'#0d0d2b', border:'4px solid #fbd000',
          boxShadow:'8px 8px 0 #101010',
          padding:'24px 20px', maxWidth:320, width:'100%',
          fontFamily:"'Press Start 2P',monospace",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ color:'#fbd000', fontSize:9, marginBottom:20, textAlign:'center' }}>
          {t('settings')}
        </div>

        <div style={{ color:'#88aaff', fontSize:6, marginBottom:10 }}>{t('selectLang')}</div>
        {LANGS.map(l => (
          <button
            key={l.code}
            onClick={() => onChangeLang(l.code)}
            style={{
              display:'block', width:'100%', textAlign:'left',
              fontFamily:"'Press Start 2P',monospace", fontSize:7,
              padding:'10px 12px', marginBottom:8,
              background: lang === l.code ? '#fbd000' : 'rgba(255,255,255,0.07)',
              color: lang === l.code ? '#101010' : '#fff',
              border: lang === l.code ? '3px solid #c88000' : '3px solid rgba(255,255,255,0.15)',
              boxShadow: lang === l.code ? '3px 3px 0 #101010' : 'none',
              cursor:'pointer',
            }}
          >
            {l.label}
          </button>
        ))}

        <button
          onClick={onClose}
          style={{
            marginTop:8, fontFamily:"'Press Start 2P',monospace", fontSize:6,
            padding:'10px', border:'3px solid rgba(255,255,255,0.2)',
            background:'transparent', color:'#aaa', width:'100%', cursor:'pointer',
          }}
        >
          {t('back')}
        </button>
      </div>
    </div>
  )
}
