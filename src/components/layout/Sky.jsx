import { useMemo } from 'react'

const STARS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 40,
  size: Math.random() > 0.6 ? 3 : 2,
  delay: Math.random() * 1.5,
}))

const skyStyles = {
  'sky-night':     'linear-gradient(180deg, #08041a 0%, #1a0a4f 40%, #3b1e8e 70%, #5c94fc 100%)',
  'sky-dawn':      'linear-gradient(180deg, #1a0a4f 0%, #6b2d6b 30%, #e8733a 60%, #fbd000 80%, #5c94fc 100%)',
  'sky-morning':   'linear-gradient(180deg, #87ceeb 0%, #b0e0ff 40%, #d4f1ff 70%, #fff9e6 100%)',
  'sky-noon':      'linear-gradient(180deg, #1e6ec8 0%, #3a8ee8 40%, #5c94fc 70%, #82b4ff 100%)',
  'sky-afternoon': 'linear-gradient(180deg, #4a6fa5 0%, #e8733a 40%, #f4a460 70%, #ffd700 100%)',
  'sky-dusk':      'linear-gradient(180deg, #1a0a4f 0%, #8b1a4a 30%, #e8400a 55%, #fbd000 75%, #5c94fc 100%)',
  'sky-evening':   'linear-gradient(180deg, #0d0d2b 0%, #1a1a4f 40%, #2d2d7a 70%, #3b3b9a 100%)',
}

export default function Sky({ theme }) {
  const bg = skyStyles[theme.cls] || skyStyles['sky-noon']

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: bg,
      transition: 'background 3s ease',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      {/* Stars */}
      {theme.stars && STARS.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          background: '#fcfcfc',
          animation: `twinkle 1.5s ${s.delay}s infinite alternate`,
        }} />
      ))}
      {/* Sun */}
      {theme.sun && (
        <div style={{
          position: 'absolute', top: 60, right: 40,
          width: 40, height: 40,
          background: '#fbd000', border: '4px solid #c88000',
          boxShadow: '0 0 0 4px rgba(251,208,0,0.25)',
        }} />
      )}
      {/* Moon */}
      {theme.moon && (
        <div style={{
          position: 'absolute', top: 50, right: 50,
          width: 32, height: 32,
          background: '#e8e8c8', border: '4px solid #b0b090',
        }} />
      )}
    </div>
  )
}
