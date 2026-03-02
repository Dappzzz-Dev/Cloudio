export default function HudBar({ clockStr, isGuest, t, onLogout, onSettings }) {
  return (
    <div style={{ position:'fixed', top:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:480, padding:'8px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(0,0,0,0.78)', zIndex:100, borderBottom:'2px solid rgba(255,255,255,0.08)', fontFamily:'var(--font)' }}>
      <span style={{ color:'#fcfcfc', fontSize:7 }}>
        ☁ {t.appName}
        {isGuest && <span style={{ color:'#777', fontSize:5, marginLeft:5 }}>[{t.guestMode}]</span>}
      </span>
      <span style={{ color:'#fbd000', fontSize:9, letterSpacing:2 }}>{clockStr}</span>
      <div style={{ display:'flex', gap:6 }}>
        <button className="px-btn" onClick={onSettings} style={{ background:'rgba(255,255,255,0.08)', color:'#ccc', border:'2px solid rgba(255,255,255,0.2)', boxShadow:'none', fontSize:6, padding:'4px 8px' }}>⚙</button>
        <button className="px-btn" onClick={onLogout}   style={{ background:'rgba(255,255,255,0.08)', color:'#ccc', border:'2px solid rgba(255,255,255,0.2)', boxShadow:'none', fontSize:6, padding:'4px 8px' }}>◀ {t.logout}</button>
      </div>
    </div>
  )
}
