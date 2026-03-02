// All pixel weather icons as pure CSS components
import React from 'react'

const s = {
  wrap:   { width:40, height:36, position:'relative', margin:'0 auto' },
  wrapLg: { width:56, height:52, position:'relative' },
}

export const SunIcon = ({ size = 'sm' }) => {
  const w = size === 'lg' ? 56 : 40
  const h = size === 'lg' ? 52 : 36
  const c = size === 'lg' ? 28 : 20
  const o = size === 'lg' ? (56-28)/2 : 10
  const rt = size === 'lg' ? 4 : 3
  return (
    <div style={{ width:w, height:h, position:'relative', margin:'0 auto' }}>
      {/* Rays */}
      {[
        {top:1, left:o+c/2-rt/2},
        {bottom:1, left:o+c/2-rt/2},
        {top:h/2-rt/2, left:1},
        {top:h/2-rt/2, right:1},
        {top:3, left:3},{top:3,right:3},
        {bottom:3,left:3},{bottom:3,right:3},
      ].map((style,i) => (
        <div key={i} style={{ position:'absolute', width:rt+1, height:rt+1, background:'#fbd000', ...style }} />
      ))}
      {/* Core */}
      <div style={{ position:'absolute', width:c, height:c, background:'#fbd000', border:`${size==='lg'?3:2}px solid #c88000`, top:(h-c)/2, left:(w-c)/2 }} />
    </div>
  )
}

export const CloudIcon = ({ size = 'sm' }) => {
  const sc = size === 'lg' ? 1.4 : 1
  return (
    <div style={{ width:Math.round(40*sc), height:Math.round(36*sc), position:'relative', margin:'0 auto' }}>
      <div style={{ position:'absolute', bottom:0, left:0, width:Math.round(40*sc), height:Math.round(16*sc), background:'#e8e8e8', border:`2px solid #aaa` }} />
      <div style={{ position:'absolute', bottom:Math.round(12*sc), left:Math.round(4*sc), width:Math.round(16*sc), height:Math.round(14*sc), background:'#e8e8e8', border:`2px solid #aaa`, borderBottom:'none' }} />
      <div style={{ position:'absolute', bottom:Math.round(14*sc), left:Math.round(14*sc), width:Math.round(20*sc), height:Math.round(18*sc), background:'#e8e8e8', border:`2px solid #aaa`, borderBottom:'none' }} />
      <div style={{ position:'absolute', bottom:Math.round(10*sc), left:Math.round(28*sc), width:Math.round(12*sc), height:Math.round(10*sc), background:'#e8e8e8', border:`2px solid #aaa`, borderBottom:'none' }} />
    </div>
  )
}

export const RainIcon = ({ size = 'sm' }) => {
  const sc = size === 'lg' ? 1.4 : 1
  return (
    <div style={{ width:Math.round(40*sc), height:Math.round(36*sc), position:'relative', margin:'0 auto' }}>
      <div style={{ position:'absolute', top:Math.round(4*sc), left:Math.round(2*sc), width:Math.round(14*sc), height:Math.round(12*sc), background:'#b0b8d0', border:`2px solid #7080a0`, borderBottom:'none' }} />
      <div style={{ position:'absolute', top:0, left:Math.round(12*sc), width:Math.round(18*sc), height:Math.round(15*sc), background:'#b0b8d0', border:`2px solid #7080a0`, borderBottom:'none' }} />
      <div style={{ position:'absolute', top:Math.round(13*sc), left:0, width:Math.round(38*sc), height:Math.round(10*sc), background:'#b0b8d0', border:`2px solid #7080a0` }} />
      {[6,16,26].map((x,i) => (
        <div key={i} style={{ position:'absolute', bottom:i===1?0:2, left:Math.round(x*sc), width:3, height:Math.round(7*sc), background:'#5c94fc', borderBottom:`2px solid #1a3a8f` }} />
      ))}
    </div>
  )
}

export const StormIcon = ({ size = 'sm' }) => {
  const sc = size === 'lg' ? 1.4 : 1
  return (
    <div style={{ width:Math.round(40*sc), height:Math.round(36*sc), position:'relative', margin:'0 auto' }}>
      <div style={{ position:'absolute', top:Math.round(4*sc), left:Math.round(2*sc), width:Math.round(14*sc), height:Math.round(12*sc), background:'#505060', border:`2px solid #303040`, borderBottom:'none' }} />
      <div style={{ position:'absolute', top:0, left:Math.round(12*sc), width:Math.round(18*sc), height:Math.round(15*sc), background:'#505060', border:`2px solid #303040`, borderBottom:'none' }} />
      <div style={{ position:'absolute', top:Math.round(13*sc), left:0, width:Math.round(38*sc), height:Math.round(10*sc), background:'#505060', border:`2px solid #303040` }} />
      <div style={{ position:'absolute', bottom:1, left:Math.round(14*sc) }}>
        <div style={{ width:0, height:0, borderLeft:`${Math.round(6*sc)}px solid transparent`, borderRight:`${Math.round(2*sc)}px solid transparent`, borderTop:`${Math.round(10*sc)}px solid #fbd000` }} />
        <div style={{ width:0, height:0, borderLeft:`${Math.round(2*sc)}px solid transparent`, borderRight:`${Math.round(6*sc)}px solid transparent`, borderBottom:`${Math.round(10*sc)}px solid #fbd000`, marginTop:-2, marginLeft:2 }} />
      </div>
    </div>
  )
}

export const PartlyCloudyIcon = ({ size = 'sm' }) => {
  const sc = size === 'lg' ? 1.4 : 1
  return (
    <div style={{ width:Math.round(40*sc), height:Math.round(36*sc), position:'relative', margin:'0 auto' }}>
      <div style={{ position:'absolute', top:0, right:0, width:Math.round(18*sc), height:Math.round(18*sc), background:'#fbd000', border:`2px solid #c88000` }} />
      <div style={{ position:'absolute', bottom:0, left:0, width:Math.round(30*sc), height:Math.round(12*sc), background:'#e8e8e8', border:`2px solid #aaa` }} />
      <div style={{ position:'absolute', bottom:Math.round(10*sc), left:Math.round(2*sc), width:Math.round(12*sc), height:Math.round(10*sc), background:'#e8e8e8', border:`2px solid #aaa`, borderBottom:'none' }} />
      <div style={{ position:'absolute', bottom:Math.round(12*sc), left:Math.round(10*sc), width:Math.round(16*sc), height:Math.round(14*sc), background:'#e8e8e8', border:`2px solid #aaa`, borderBottom:'none' }} />
    </div>
  )
}

export const SnowIcon = ({ size = 'sm' }) => {
  const sc = size === 'lg' ? 1.4 : 1
  return (
    <div style={{ width:Math.round(40*sc), height:Math.round(36*sc), position:'relative', margin:'0 auto' }}>
      <div style={{ position:'absolute', top:Math.round(4*sc), left:Math.round(2*sc), width:Math.round(14*sc), height:Math.round(12*sc), background:'#c8d8f0', border:`2px solid #90a8d0`, borderBottom:'none' }} />
      <div style={{ position:'absolute', top:0, left:Math.round(12*sc), width:Math.round(18*sc), height:Math.round(15*sc), background:'#c8d8f0', border:`2px solid #90a8d0`, borderBottom:'none' }} />
      <div style={{ position:'absolute', top:Math.round(13*sc), left:0, width:Math.round(38*sc), height:Math.round(10*sc), background:'#c8d8f0', border:`2px solid #90a8d0` }} />
      {[5,14,23,32].map((x,i) => (
        <div key={i} style={{ position:'absolute', bottom:i%2===0?2:0, left:Math.round(x*sc), width:4, height:4, background:'#e0f0ff', border:'1px solid #90a8d0' }} />
      ))}
    </div>
  )
}

export function getWeatherIcon(type, size = 'sm') {
  switch(type) {
    case 'sun':    return <SunIcon size={size} />
    case 'rain':   return <RainIcon size={size} />
    case 'storm':  return <StormIcon size={size} />
    case 'snow':   return <SnowIcon size={size} />
    case 'partly': return <PartlyCloudyIcon size={size} />
    default:       return <CloudIcon size={size} />
  }
}
