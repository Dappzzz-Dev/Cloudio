import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// Global error boundary — prevents full white screen on runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0d0d2b',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Press Start 2P', monospace",
          padding: '24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 40, marginBottom: 24 }}>☁</div>
          <div style={{ color: '#fbd000', fontSize: 12, marginBottom: 16 }}>CLOUDIO ERROR</div>
          <div style={{
            background: 'rgba(229,34,34,0.15)',
            border: '3px solid #e52222',
            padding: '16px',
            color: '#ff8888',
            fontSize: 7,
            lineHeight: 2.5,
            maxWidth: 360,
            marginBottom: 20,
          }}>
            {this.state.error?.message || 'Unknown error'}
          </div>
          <div style={{ color: '#555', fontSize: 6, lineHeight: 2.5 }}>
            Kemungkinan env variables belum diisi.<br />
            Cek VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY,<br />
            dan VITE_OWM_KEY di Vercel dashboard.
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 20,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              padding: '12px 20px',
              border: '4px solid #fbd000',
              background: 'transparent',
              color: '#fbd000',
              cursor: 'pointer',
            }}
          >↺ RELOAD</button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
