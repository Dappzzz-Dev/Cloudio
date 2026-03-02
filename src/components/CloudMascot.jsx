import React from 'react'

export default function CloudMascot({ message, mood = 'happy', small = false }) {
  const s = small ? 0.6 : 1
  const sad = mood === 'sad'
  return (
    <div style={{ position:'relative', display:'inline-block', animation:'float 3s ease-in-out infinite' }}>
      <div style={{ position:'relative', width:96*s, height:72*s }}>
        <div style={{ position:'absolute', bottom:36*s, left:8*s,  width:40*s, height:32*s, background:'#fff', border:`${Math.max(2,4*s)}px solid #101010`, borderBottom:'none' }} />
        <div style={{ position:'absolute', bottom:40*s, left:32*s, width:48*s, height:40*s, background:'#fff', border:`${Math.max(2,4*s)}px solid #101010`, borderBottom:'none' }} />
        <div style={{ position:'absolute', bottom:32*s, left:64*s, width:28*s, height:24*s, background:'#fff', border:`${Math.max(2,4*s)}px solid #101010`, borderBottom:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:0, width:96*s, height:44*s, background:'#fff', border:`${Math.max(2,4*s)}px solid #101010` }} />
        <div style={{ position:'absolute', width:8*s, height:8*s, background:'#101010', bottom:20*s, left:30*s }} />
        <div style={{ position:'absolute', width:8*s, height:8*s, background:'#101010', bottom:20*s, left:50*s }} />
        <div style={{ position:'absolute', width:8*s, height:4*s, background:'#ffb3ba', bottom:14*s, left:26*s }} />
        <div style={{ position:'absolute', width:8*s, height:4*s, background:'#ffb3ba', bottom:14*s, left:54*s }} />
        {sad
          ? <div style={{ position:'absolute', left:32*s, bottom:14*s, width:28*s, height:8*s, borderTop:`3px solid #101010`, borderLeft:`3px solid #101010`, borderRight:`3px solid #101010` }} />
          : <div style={{ position:'absolute', left:32*s, bottom:10*s, width:28*s, height:8*s, borderBottom:`3px solid #101010`, borderLeft:`3px solid #101010`, borderRight:`3px solid #101010` }} />
        }
      </div>
      {message && (
        <div style={{
          position:'absolute', top:-34, right:-110, whiteSpace:'nowrap',
          background:'#fff', border:'3px solid #101010', boxShadow:'3px 3px 0 #101010',
          padding:'6px 10px', fontFamily:"'Press Start 2P'", fontSize:6, color:'#101010', zIndex:10,
        }}>
          {message}
          <div style={{ position:'absolute', left:-10, bottom:8, borderTop:'5px solid transparent', borderBottom:'5px solid transparent', borderRight:'8px solid #101010' }} />
        </div>
      )}
    </div>
  )
}
