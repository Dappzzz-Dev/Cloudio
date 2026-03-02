import React from 'react'

export default function CloudMascot({ message, sad = false }) {
  return (
    <div style={{ position:'relative', display:'inline-block', animation:'float 3s ease-in-out infinite' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
      <div style={{ position:'relative', width:96, height:72 }}>
        <div style={{ position:'absolute', bottom:36, left:8,  width:40, height:32, background:'#fff', border:'4px solid #101010', borderBottom:'none' }} />
        <div style={{ position:'absolute', bottom:40, left:32, width:48, height:40, background:'#fff', border:'4px solid #101010', borderBottom:'none' }} />
        <div style={{ position:'absolute', bottom:32, left:64, width:28, height:24, background:'#fff', border:'4px solid #101010', borderBottom:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:0, width:96, height:44, background:'#fff', border:'4px solid #101010' }} />
        {/* Eyes */}
        <div style={{ position:'absolute', bottom:20, left:30, width:8, height:8, background:'#101010' }} />
        <div style={{ position:'absolute', bottom:20, left:50, width:8, height:8, background:'#101010' }} />
        {/* Blush */}
        <div style={{ position:'absolute', bottom:14, left:26, width:8, height:4, background:'#ffb3ba' }} />
        <div style={{ position:'absolute', bottom:14, left:54, width:8, height:4, background:'#ffb3ba' }} />
        {/* Mouth — smile or sad */}
        {sad
          ? <div style={{ position:'absolute', bottom:6, left:32, width:28, height:8, borderTop:'4px solid #101010', borderLeft:'4px solid #101010', borderRight:'4px solid #101010' }} />
          : <div style={{ position:'absolute', bottom:6, left:32, width:28, height:8, borderBottom:'4px solid #101010', borderLeft:'4px solid #101010', borderRight:'4px solid #101010' }} />
        }
      </div>
      {message && (
        <div style={{
          background:'#fff', border:'3px solid #101010', boxShadow:'3px 3px 0 #101010',
          padding:'6px 10px', fontSize:6, color:'#101010', fontFamily:"'Press Start 2P',monospace",
          position:'absolute', top:-30, right:-102, whiteSpace:'nowrap', zIndex:10,
        }}>
          {message}
          <div style={{ position:'absolute', left:-8, bottom:8, width:0, height:0, borderTop:'5px solid transparent', borderBottom:'5px solid transparent', borderRight:'8px solid #101010' }} />
        </div>
      )}
    </div>
  )
}
