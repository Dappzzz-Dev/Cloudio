import React, { useState } from 'react'

export default function AddCityModal({ onClose, onAdd, searching, searchResults, onSearch, t }) {
  const [query, setQuery] = useState('')

  const doSearch = () => { if(query.trim()) onSearch(query) }

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)',
      display:'flex', alignItems:'center', justifyContent:'center',
      zIndex:200, padding:'0 24px',
    }} onClick={onClose}>
      <div
        style={{
          background:'#0d0d2b', border:'4px solid #fbd000',
          boxShadow:'8px 8px 0 #101010',
          padding:'20px', maxWidth:340, width:'100%',
          fontFamily:"'Press Start 2P',monospace",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ color:'#fbd000', fontSize:8, marginBottom:16 }}>🔍 {t('searchCity')}</div>

        <div style={{ display:'flex', gap:8, marginBottom:12 }}>
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
            placeholder={t('searchCity')}
            style={{
              flex:1, fontFamily:"'Press Start 2P',monospace", fontSize:7,
              padding:'10px', border:'4px solid #101010',
              background:'rgba(0,0,20,0.9)', color:'#fff', outline:'none',
            }}
          />
          <button
            onClick={doSearch}
            style={{
              fontFamily:"'Press Start 2P',monospace", fontSize:7,
              padding:'10px 12px', border:'4px solid #101010',
              background:'#fbd000', color:'#101010',
              boxShadow:'3px 3px 0 #101010', cursor:'pointer', whiteSpace:'nowrap',
            }}
          >▶</button>
        </div>

        {searching && (
          <div style={{ color:'#88aaff', fontSize:6, padding:'8px 0' }}>{t('searching')}</div>
        )}

        {searchResults.map((r, i) => (
          <div
            key={i}
            onClick={() => { onAdd(r); onClose() }}
            style={{
              padding:'10px 12px', marginBottom:6,
              background:'rgba(255,255,255,0.07)', border:'2px solid rgba(255,255,255,0.15)',
              cursor:'pointer', transition:'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(251,208,0,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.07)'}
          >
            <div style={{ color:'#fff', fontSize:7, marginBottom:4 }}>{r.name}</div>
            <div style={{ color:'#888', fontSize:5 }}>{r.state ? `${r.state}, ` : ''}{r.country}</div>
          </div>
        ))}

        {!searching && searchResults.length === 0 && query && (
          <div style={{ color:'#555', fontSize:6, textAlign:'center', padding:'12px 0' }}>
            No results found
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop:10, fontFamily:"'Press Start 2P',monospace", fontSize:6,
            padding:'10px', border:'3px solid rgba(255,255,255,0.2)',
            background:'transparent', color:'#aaa', width:'100%', cursor:'pointer',
          }}
        >✕ {t('back')}</button>
      </div>
    </div>
  )
}
