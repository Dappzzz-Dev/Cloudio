import React, { useMemo } from 'react'

export default function Stars({ visible }) {
  const stars = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 40,
    size: Math.random() > 0.6 ? 3 : 2,
    delay: (Math.random() * 1.5).toFixed(2),
  })), [])

  if (!visible) return null
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0 }}>
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          left:`${s.x}%`, top:`${s.y}%`,
          width:s.size, height:s.size,
          animationDelay:`${s.delay}s`,
        }} />
      ))}
    </div>
  )
}
