import React from 'react'
import CloudMascot from './CloudMascot'

export default function GuestWarningPopup({ t, onClose, onGoAuth }) {
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)',
      display:'flex', alignItems:'center', justifyContent:'center',
      zIndex:200, padding:'0 20px', animation:'fadeIn 0.2s ease',
    }} onClick={onClose}>
      <div
        style={{
          background:'#0d0d2b', border:'4px solid #fbd000', boxShadow:'8px 8px 0 #101010',
          padding:'24px 20px', maxWidth:320, width:'100%',
          fontFamily:"'Press Start 2P'", textAlign:'center',
          animation:'popIn 0.2s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize:24, marginBottom:12 }}>🔒</div>
        <div style={{ color:'#fbd000', fontSize:9, marginBottom:14, lineHeight:2 }}>
          {t('lockedFeature')}
        </div>
        <div style={{
          background:'rgba(255,255,255,0.05)', border:'2px solid rgba(255,255,255,0.12)',
          padding:'12px', marginBottom:16, color:'#ccc', fontSize:6, lineHeight:2.8,
        }}>
          {t('lockedMessage')}<br />
          <span style={{ color:'#88aaff' }}>{t('lockedSub')}</span>
        </div>

        <div style={{ marginBottom:16 }}>
          <CloudMascot mood="sad" small />
        </div>

        <button
          className="px-btn"
          onClick={onGoAuth}
          style={{ background:'#e52222', color:'#fff', fontSize:8, padding:'12px', marginBottom:10 }}
        >
          {t('createAccountNow')}
        </button>
        <button
          className="px-btn"
          onClick={onClose}
          style={{ background:'transparent', color:'#888', border:'3px dashed rgba(255,255,255,0.2)', boxShadow:'none', fontSize:6, padding:'10px' }}
        >
          {t('back')}
        </button>
      </div>
    </div>
  )
}
