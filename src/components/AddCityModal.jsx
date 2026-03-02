import React, { useState } from 'react'

export default function AddCityModal({ t, onAdd, onClose }) {
  const [query, setQuery] = useState('')
  const [busy,  setBusy]  = useState(false)
  const [error, setError] = useState('')

  async function handleAdd(e) {
    e.preventDefault()
    if (!query.trim()) return setError(t('errorRequired'))
    setBusy(true)
    setError('')
    try {
      await onAdd(query.trim())
      onClose()
    } catch (err) {
      setError(err.message || t('errorWeather'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      style={{
        position:'fixed', inset:0, background:'rgba(0,0,0,0.8)',
        display:'flex', alignItems:'center', justifyContent:'center',
        zIndex:200, padding:'0 20px', animation:'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background:'#0d0d2b', border:'4px solid #fbd000', boxShadow:'8px 8px 0 #101010',
          padding:'24px 20px', maxWidth:320, width:'100%',
          fontFamily:"'Press Start 2P'", animation:'popIn 0.2s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ color:'#fbd000', fontSize:9, marginBottom:16, textAlign:'center' }}>
          ＋ {t('addCity')}
        </div>
        <form onSubmit={handleAdd}>
          <input
            className="px-input"
            style={{ marginBottom:10, fontSize:7 }}
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {error && (
            <div style={{ background:'rgba(229,34,34,0.15)', border:'2px solid #e52222', padding:'8px', marginBottom:10, fontSize:5, color:'#ff8888' }}>
              ⚠ {error}
            </div>
          )}
          <button
            type="submit"
            className="px-btn"
            disabled={busy}
            style={{ background:'#26a244', color:'#fff', fontSize:8, padding:12, marginBottom:10 }}
          >
            {busy ? t('saving') : '🔍 ' + t('addCity')}
          </button>
          <button
            type="button"
            className="px-btn"
            onClick={onClose}
            style={{ background:'transparent', color:'#888', border:'3px dashed rgba(255,255,255,0.2)', boxShadow:'none', fontSize:6, padding:10 }}
          >
            {t('back')}
          </button>
        </form>
      </div>
    </div>
  )
}
