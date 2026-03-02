import React from 'react'

const W = 40, H = 36

export function SunIcon() {
  return (
    <div style={{ position:'relative', width:W, height:H, margin:'0 auto' }}>
      {[{t:2,l:17},{b:2,l:17},{t:13,l:2},{t:13,r:2},{t:4,l:5},{t:4,r:5},{b:4,l:5},{b:4,r:5}].map((s,i)=>(
        <div key={i} style={{ position:'absolute', width:4, height:4, background:'#fbd000', ...s }} />
      ))}
      <div style={{ position:'absolute', width:20, height:20, background:'#fbd000', border:'2px solid #c88000', top:8, left:10 }} />
    </div>
  )
}

export function CloudIcon() {
  return (
    <div style={{ position:'relative', width:W, height:H, margin:'0 auto', marginTop:6 }}>
      <div style={{ position:'absolute', bottom:12, left:4,  width:16, height:14, background:'#e8e8e8', border:'2px solid #aaa', borderBottom:'none' }} />
      <div style={{ position:'absolute', bottom:14, left:14, width:20, height:18, background:'#e8e8e8', border:'2px solid #aaa', borderBottom:'none' }} />
      <div style={{ position:'absolute', bottom:10, left:28, width:12, height:10, background:'#e8e8e8', border:'2px solid #aaa', borderBottom:'none' }} />
      <div style={{ position:'absolute', bottom:0,  left:0,  width:40, height:16, background:'#e8e8e8', border:'2px solid #aaa' }} />
    </div>
  )
}

export function RainIcon() {
  return (
    <div style={{ position:'relative', width:W, height:H, margin:'0 auto', marginTop:2 }}>
      <div style={{ position:'absolute', top:1, left:2,  width:14, height:12, background:'#b0b8d0', border:'2px solid #7080a0', borderBottom:'none' }} />
      <div style={{ position:'absolute', top:-2,left:12, width:18, height:15, background:'#b0b8d0', border:'2px solid #7080a0', borderBottom:'none' }} />
      <div style={{ position:'absolute', top:10,left:0,  width:38, height:14, background:'#b0b8d0', border:'2px solid #7080a0' }} />
      <div style={{ position:'absolute', bottom:1, left:6,  width:3, height:7, background:'#5c94fc', borderBottom:'2px solid #1a3a8f' }} />
      <div style={{ position:'absolute', bottom:-2,left:16, width:3, height:7, background:'#5c94fc', borderBottom:'2px solid #1a3a8f' }} />
      <div style={{ position:'absolute', bottom:1, left:26, width:3, height:7, background:'#5c94fc', borderBottom:'2px solid #1a3a8f' }} />
    </div>
  )
}

export function StormIcon() {
  return (
    <div style={{ position:'relative', width:W, height:H, margin:'0 auto', marginTop:2 }}>
      <div style={{ position:'absolute', top:1, left:2,  width:14, height:12, background:'#505060', border:'2px solid #303040', borderBottom:'none' }} />
      <div style={{ position:'absolute', top:-2,left:12, width:18, height:15, background:'#505060', border:'2px solid #303040', borderBottom:'none' }} />
      <div style={{ position:'absolute', top:10,left:0,  width:38, height:14, background:'#505060', border:'2px solid #303040' }} />
      <div style={{ position:'absolute', bottom:0, left:14 }}>
        <div style={{ width:0, height:0, borderLeft:'6px solid transparent', borderRight:'2px solid transparent', borderTop:'10px solid #fbd000' }} />
        <div style={{ width:0, height:0, borderLeft:'2px solid transparent', borderRight:'6px solid transparent', borderBottom:'10px solid #fbd000', marginTop:-2, marginLeft:2 }} />
      </div>
    </div>
  )
}

export function PartlyCloudyIcon() {
  return (
    <div style={{ position:'relative', width:W, height:H, margin:'0 auto', marginTop:2 }}>
      <div style={{ position:'absolute', top:0, right:0, width:18, height:18, background:'#fbd000', border:'2px solid #c88000' }} />
      <div style={{ position:'absolute', bottom:10, left:2,  width:12, height:10, background:'#e8e8e8', border:'2px solid #aaa', borderBottom:'none' }} />
      <div style={{ position:'absolute', bottom:12, left:10, width:16, height:14, background:'#e8e8e8', border:'2px solid #aaa', borderBottom:'none' }} />
      <div style={{ position:'absolute', bottom:0,  left:0,  width:30, height:12, background:'#e8e8e8', border:'2px solid #aaa' }} />
    </div>
  )
}

export function DrizzleIcon() {
  return (
    <div style={{ position:'relative', width:W, height:H, margin:'0 auto', marginTop:2 }}>
      <div style={{ position:'absolute', top:1, left:2,  width:14, height:12, background:'#c8d0e0', border:'2px solid #9aaabf', borderBottom:'none' }} />
      <div style={{ position:'absolute', top:-2,left:12, width:18, height:15, background:'#c8d0e0', border:'2px solid #9aaabf', borderBottom:'none' }} />
      <div style={{ position:'absolute', top:10,left:0,  width:38, height:14, background:'#c8d0e0', border:'2px solid #9aaabf' }} />
      <div style={{ position:'absolute', bottom:2, left:8,  width:2, height:5, background:'#82b4ff' }} />
      <div style={{ position:'absolute', bottom:0, left:20, width:2, height:5, background:'#82b4ff' }} />
      <div style={{ position:'absolute', bottom:2, left:30, width:2, height:5, background:'#82b4ff' }} />
    </div>
  )
}

export function SnowIcon() {
  return (
    <div style={{ position:'relative', width:W, height:H, margin:'0 auto', marginTop:2 }}>
      <div style={{ position:'absolute', top:1, left:2,  width:14, height:12, background:'#d8e8ff', border:'2px solid #9ab0d0', borderBottom:'none' }} />
      <div style={{ position:'absolute', top:-2,left:12, width:18, height:15, background:'#d8e8ff', border:'2px solid #9ab0d0', borderBottom:'none' }} />
      <div style={{ position:'absolute', top:10,left:0,  width:38, height:14, background:'#d8e8ff', border:'2px solid #9ab0d0' }} />
      {[6,16,26].map(l => (
        <div key={l} style={{ position:'absolute', bottom:2, left:l, width:4, height:4, background:'#fff', border:'1px solid #9ab0d0' }} />
      ))}
    </div>
  )
}

export function MistIcon() {
  return (
    <div style={{ position:'relative', width:W, height:H, margin:'0 auto', marginTop:4 }}>
      {[2,10,18,26].map((t,i) => (
        <div key={i} style={{ position:'absolute', top:t, left:i%2===0?2:8, width:i%2===0?32:28, height:4, background:'rgba(200,210,220,0.8)', border:'1px solid #aabbcc' }} />
      ))}
    </div>
  )
}

const ICON_MAP = {
  Clear: SunIcon,
  Clouds: CloudIcon,
  Rain: RainIcon,
  Drizzle: DrizzleIcon,
  Thunderstorm: StormIcon,
  Snow: SnowIcon,
  Mist: MistIcon,
  Haze: MistIcon,
  Fog: MistIcon,
  Smoke: MistIcon,
  Dust: MistIcon,
  Sand: StormIcon,
}

export function WeatherIcon({ condition = 'Clear' }) {
  const Icon = ICON_MAP[condition] || CloudIcon
  return <Icon />
}
