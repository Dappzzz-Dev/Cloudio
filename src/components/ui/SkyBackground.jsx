import React, { useMemo } from 'react'

const STARS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: (Math.sin(i * 7.3) * 0.5 + 0.5) * 100,
  y: (Math.cos(i * 3.7) * 0.5 + 0.5) * 45,
  size: i % 3 === 0 ? 3 : 2,
  delay: (i * 0.2) % 1.5,
}))

export default function SkyBackground({ skyTheme }) {
  return (
    <>
      <style>{`
        .sky-night     { background: linear-gradient(180deg,#08041a 0%,#1a0a4f 40%,#3b1e8e 70%,#5c94fc 100%); }
        .sky-dawn      { background: linear-gradient(180deg,#1a0a4f 0%,#6b2d6b 30%,#e8733a 60%,#fbd000 80%,#5c94fc 100%); }
        .sky-morning   { background: linear-gradient(180deg,#87ceeb 0%,#b0e0ff 40%,#d4f1ff 70%,#fff9e6 100%); }
        .sky-noon      { background: linear-gradient(180deg,#1e6ec8 0%,#3a8ee8 40%,#5c94fc 70%,#82b4ff 100%); }
        .sky-afternoon { background: linear-gradient(180deg,#4a6fa5 0%,#e8733a 40%,#f4a460 70%,#ffd700 100%); }
        .sky-dusk      { background: linear-gradient(180deg,#1a0a4f 0%,#8b1a4a 30%,#e8400a 55%,#fbd000 75%,#5c94fc 100%); }
        .sky-evening   { background: linear-gradient(180deg,#0d0d2b 0%,#1a1a4f 40%,#2d2d7a 70%,#3b3b9a 100%); }
        @keyframes twinkle { from{opacity:.2} to{opacity:1} }
      `}</style>

      {/* Stars */}
      {skyTheme.showStars && (
        <div style={{ position:'absolute', top:0, left:0, width:'100%', height:'45%', pointerEvents:'none', zIndex:0 }}>
          {STARS.map(s => (
            <div key={s.id} style={{
              position:'absolute', background:'#fcfcfc',
              left:`${s.x}%`, top:`${s.y}%`,
              width:s.size, height:s.size,
              animation:`twinkle ${1 + s.delay}s infinite alternate`,
              animationDelay:`${s.delay}s`,
            }} />
          ))}
        </div>
      )}

      {/* Sun */}
      {skyTheme.showSun && (
        <div style={{
          position:'absolute', top:60, right:40, width:40, height:40,
          background:'#fbd000', border:'4px solid #c88000',
          boxShadow:'0 0 0 4px rgba(251,208,0,0.3)',
          zIndex:1,
        }} />
      )}

      {/* Moon */}
      {skyTheme.showMoon && (
        <div style={{
          position:'absolute', top:52, right:50, width:32, height:32,
          background:'#e8e8c8', border:'4px solid #b0b090',
          zIndex:1,
        }} />
      )}
    </>
  )
}
