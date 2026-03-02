import { useState, useEffect } from 'react'

export function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function getSkyTheme(hour, lang = 'id') {
  const labels = {
    id: { fajar:'FAJAR', pagi:'PAGI', siang:'SIANG', sore:'SORE', senja:'SENJA', petang:'PETANG', malam:'MALAM' },
    en: { fajar:'DAWN',  pagi:'MORNING', siang:'NOON', sore:'AFTERNOON', senja:'DUSK', petang:'EVENING', malam:'NIGHT' },
    ja: { fajar:'夜明け', pagi:'朝', siang:'昼', sore:'午後', senja:'夕暮れ', petang:'夕方', malam:'夜' },
  }
  const l = labels[lang] || labels.id
  if (hour >= 5  && hour < 7)  return { cls:'sky-dawn',      showSun:false, showMoon:false, showStars:false, label:l.fajar,  dot:'#e8733a' }
  if (hour >= 7  && hour < 10) return { cls:'sky-morning',   showSun:true,  showMoon:false, showStars:false, label:l.pagi,   dot:'#87ceeb' }
  if (hour >= 10 && hour < 15) return { cls:'sky-noon',      showSun:true,  showMoon:false, showStars:false, label:l.siang,  dot:'#5c94fc' }
  if (hour >= 15 && hour < 17) return { cls:'sky-afternoon', showSun:true,  showMoon:false, showStars:false, label:l.sore,   dot:'#e8733a' }
  if (hour >= 17 && hour < 19) return { cls:'sky-dusk',      showSun:false, showMoon:false, showStars:true,  label:l.senja,  dot:'#e8400a' }
  if (hour >= 19 && hour < 21) return { cls:'sky-evening',   showSun:false, showMoon:true,  showStars:true,  label:l.petang, dot:'#3b3b9a' }
  return                               { cls:'sky-night',    showSun:false, showMoon:true,  showStars:true,  label:l.malam,  dot:'#08041a' }
}

export function formatClock(date) {
  const p = n => String(n).padStart(2,'0')
  return `${p(date.getHours())}:${p(date.getMinutes())}:${p(date.getSeconds())}`
}
