import { LANGUAGES } from '../../i18n'

export default function SettingsPanel({ t, lang, unit, onLang, onUnit, onClose }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', display:'flex', alignItems:'flex-end', justifyContent:'center', zIndex:200, padding:'0 0 64px' }}
      onClick={e => { if (e.target===e.currentTarget) onClose() }}>
      <div className="anim-popin" style={{ background:'#0d0d2b', border:'4px solid #fbd000', boxShadow:'0 -4px 0 #101010', padding:'20px', width:'100%', maxWidth:480, fontFamily:'var(--font)' }}>
        <div style={{ color:'#fbd000', fontSize:9, marginBottom:16 }}>{t.settings}</div>

        <div style={{ color:'#88aaff', fontSize:6, marginBottom:8 }}>{t.language}</div>
        <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
          {Object.entries(LANGUAGES).map(([k,v]) => (
            <button key={k} className="px-btn" onClick={() => onLang(k)}
              style={{ fontSize:6, padding:'8px 12px', background: lang===k?'#fbd000':'rgba(255,255,255,0.08)', color: lang===k?'#101010':'#aaa', border: lang===k?'3px solid #101010':'3px solid rgba(255,255,255,0.2)', boxShadow: lang===k?'3px 3px 0 #101010':'none' }}>
              {v.label}
            </button>
          ))}
        </div>

        <div style={{ color:'#88aaff', fontSize:6, marginBottom:8 }}>{t.unit}</div>
        <div style={{ display:'flex', gap:8, marginBottom:20 }}>
          {[['C', t.celsius], ['F', t.fahrenheit]].map(([k,label]) => (
            <button key={k} className="px-btn" onClick={() => onUnit(k)}
              style={{ fontSize:6, padding:'8px 12px', background: unit===k?'#fbd000':'rgba(255,255,255,0.08)', color: unit===k?'#101010':'#aaa', border: unit===k?'3px solid #101010':'3px solid rgba(255,255,255,0.2)', boxShadow: unit===k?'3px 3px 0 #101010':'none' }}>
              {label}
            </button>
          ))}
        </div>

        <button className="px-btn" onClick={onClose} style={{ background:'rgba(255,255,255,0.08)', color:'#ccc', border:'2px solid rgba(255,255,255,0.2)', boxShadow:'none', fontSize:7, padding:'10px', width:'100%' }}>
          ✕ {t.back}
        </button>
      </div>
    </div>
  )
}
