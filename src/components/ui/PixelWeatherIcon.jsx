// Pure CSS pixel art weather icons
const SunIcon = () => (
  <div style={{ position:'relative', width:40, height:36 }}>
    {[
      { top:0,  left:17 },
      { bottom:0, left:17 },
      { top:13, left:0  },
      { top:13, right:0 },
      { top:3,  left:5  },
      { top:3,  right:5 },
      { bottom:3, left:5 },
      { bottom:3, right:5 },
    ].map((s,i) => (
      <div key={i} style={{ position:'absolute', width:4, height:4, background:'#fbd000', ...s }} />
    ))}
    <div style={{ position:'absolute', width:20, height:20, background:'#fbd000', border:'2px solid #c88000', top:8, left:10 }} />
  </div>
)

const CloudIcon = () => (
  <div style={{ position:'relative', width:40, height:30, marginTop:6 }}>
    <div style={{ position:'absolute', bottom:12, left:4,  width:16, height:14, background:'#e8e8e8', border:'2px solid #aaa', borderBottom:'none' }} />
    <div style={{ position:'absolute', bottom:14, left:14, width:20, height:18, background:'#e8e8e8', border:'2px solid #aaa', borderBottom:'none' }} />
    <div style={{ position:'absolute', bottom:0,  left:0,  width:40, height:16, background:'#e8e8e8', border:'2px solid #aaa' }} />
  </div>
)

const RainIcon = () => (
  <div style={{ position:'relative', width:40, height:36, marginTop:4 }}>
    <div style={{ position:'absolute', top:0, left:2,  width:14, height:12, background:'#b0b8d0', border:'2px solid #7080a0', borderBottom:'none' }} />
    <div style={{ position:'absolute', top:-2, left:12, width:18, height:15, background:'#b0b8d0', border:'2px solid #7080a0', borderBottom:'none' }} />
    <div style={{ position:'absolute', top:12, left:0,  width:38, height:14, background:'#b0b8d0', border:'2px solid #7080a0' }} />
    {[[6,0],[16,-3],[26,0]].map(([l,b],i) => (
      <div key={i} style={{ position:'absolute', bottom:b, left:l, width:3, height:7, background:'#5c94fc', borderBottom:'2px solid #1a3a8f' }} />
    ))}
  </div>
)

const StormIcon = () => (
  <div style={{ position:'relative', width:40, height:36, marginTop:4 }}>
    <div style={{ position:'absolute', top:0, left:2,  width:14, height:12, background:'#505060', border:'2px solid #303040', borderBottom:'none' }} />
    <div style={{ position:'absolute', top:-2, left:12, width:18, height:15, background:'#505060', border:'2px solid #303040', borderBottom:'none' }} />
    <div style={{ position:'absolute', top:12, left:0,  width:38, height:14, background:'#505060', border:'2px solid #303040' }} />
    <div style={{ position:'absolute', bottom:1, left:15 }}>
      <div style={{ width:0, height:0, borderLeft:'6px solid transparent', borderRight:'2px solid transparent', borderTop:'10px solid #fbd000' }} />
      <div style={{ width:0, height:0, borderLeft:'2px solid transparent', borderRight:'6px solid transparent', borderBottom:'10px solid #fbd000', marginTop:-2, marginLeft:2 }} />
    </div>
  </div>
)

const PartlyCloudyIcon = () => (
  <div style={{ position:'relative', width:40, height:36, marginTop:2 }}>
    <div style={{ position:'absolute', top:0, right:0, width:18, height:18, background:'#fbd000', border:'2px solid #c88000' }} />
    <div style={{ position:'absolute', bottom:10, left:2,  width:12, height:10, background:'#e8e8e8', border:'2px solid #aaa', borderBottom:'none' }} />
    <div style={{ position:'absolute', bottom:12, left:10, width:16, height:14, background:'#e8e8e8', border:'2px solid #aaa', borderBottom:'none' }} />
    <div style={{ position:'absolute', bottom:0,  left:0,  width:30, height:12, background:'#e8e8e8', border:'2px solid #aaa' }} />
  </div>
)

const DrizzleIcon = () => (
  <div style={{ position:'relative', width:40, height:36, marginTop:4 }}>
    <div style={{ position:'absolute', top:0, left:2,  width:14, height:12, background:'#c8d0e0', border:'2px solid #8898b0', borderBottom:'none' }} />
    <div style={{ position:'absolute', top:-2, left:12, width:18, height:15, background:'#c8d0e0', border:'2px solid #8898b0', borderBottom:'none' }} />
    <div style={{ position:'absolute', top:12, left:0,  width:38, height:14, background:'#c8d0e0', border:'2px solid #8898b0' }} />
    {[[8,0],[18,-2],[28,0],[13,-4]].map(([l,b],i) => (
      <div key={i} style={{ position:'absolute', bottom:b, left:l, width:2, height:5, background:'#88aacc', borderBottom:'2px solid #5580aa' }} />
    ))}
  </div>
)

const SnowIcon = () => (
  <div style={{ position:'relative', width:40, height:36, marginTop:4 }}>
    <div style={{ position:'absolute', top:0, left:2,  width:14, height:12, background:'#d0e8f0', border:'2px solid #90b8d0', borderBottom:'none' }} />
    <div style={{ position:'absolute', top:-2, left:12, width:18, height:15, background:'#d0e8f0', border:'2px solid #90b8d0', borderBottom:'none' }} />
    <div style={{ position:'absolute', top:12, left:0,  width:38, height:14, background:'#d0e8f0', border:'2px solid #90b8d0' }} />
    {[[6,0],[16,-2],[26,0]].map(([l,b],i) => (
      <div key={i} style={{ position:'absolute', bottom:b, left:l, width:5, height:5, background:'#fff', border:'2px solid #aad0e8', borderRadius:0 }} />
    ))}
  </div>
)

const MistIcon = () => (
  <div style={{ position:'relative', width:40, height:30, marginTop:6 }}>
    {[0,8,16].map(t => (
      <div key={t} style={{ position:'absolute', top:t, left:0, width:40, height:4, background:'rgba(180,200,220,0.7)', border:'1px solid rgba(140,170,200,0.5)' }} />
    ))}
  </div>
)

const ICONS = {
  Clear: SunIcon,
  Clouds: CloudIcon,
  Rain: RainIcon,
  Thunderstorm: StormIcon,
  Drizzle: DrizzleIcon,
  Snow: SnowIcon,
  Mist: MistIcon,
  Fog: MistIcon,
  default: PartlyCloudyIcon,
}

export default function PixelWeatherIcon({ condition }) {
  const Icon = ICONS[condition] || ICONS.default
  return <Icon />
}
