import React from 'react'
import CloudMascot from './CloudMascot.jsx'

export default function GuestWarningPopup({ onClose, onGoAuth, t }) {
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)',
      display:'flex', alignItems:'center', justifyContent:'center',
      zIndex:200, padding:'0 24px',
    }}
      onClick={onClose}
    >
      <div
        style={{
          background:'#0d0d2b', border:'4px solid #fbd000', boxShadow:'8px 8px 0 #101010',
          padding:'24px 20px', maxWidth:320, width:'100%',
          fontFamily:"'Press Start 2P',monospace", textAlign:'center',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize:28, marginBottom:12 }}>🔒</div>
        <div style={{ color:'#fbd000', fontSize:9, marginBottom:14, lineHeight:2 }}>
          {t('featureLocked')}
        </div>
        <div style={{
          background:'rgba(255,255,255,0.05)', border:'2px solid rgba(255,255,255,0.1)',
          padding:'12px', marginBottom:16, color:'#ccc', fontSize:6, lineHeight:2.8,
        }}>
          {t('featureLockedMsg').split('\n').map((line,i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
          <CloudMascot sad />
        </div>

        <button
          onClick={onGoAuth}
          style={{
            fontFamily:"'Press Start 2P',monospace", fontSize:7,
            padding:'12px 16px', border:'4px solid #101010', boxShadow:'4px 4px 0 #101010',
            background:'#e52222', color:'#fff', width:'100%',
            marginBottom:8, cursor:'pointer', letterSpacing:1,
          }}
        >
          {t('createAccount')}
        </button>
        <button
          onClick={onClose}
          style={{
            fontFamily:"'Press Start 2P',monospace", fontSize:6,
            padding:'10px 16px', border:'3px solid rgba(255,255,255,0.25)',
            background:'transparent', color:'#aaa', width:'100%',
            cursor:'pointer', letterSpacing:1,
          }}
        >
          {t('back')}
        </button>
      </div>
    </div>
  )
}
