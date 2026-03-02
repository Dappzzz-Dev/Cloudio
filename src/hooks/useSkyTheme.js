export function useSkyTheme(hour) {
  if (hour >= 5  && hour < 7)  return { cls: 'sky-dawn',      sun: false, moon: false, stars: false, label: 'dawn',      dot: '#e8733a' }
  if (hour >= 7  && hour < 10) return { cls: 'sky-morning',   sun: true,  moon: false, stars: false, label: 'morning',   dot: '#87ceeb' }
  if (hour >= 10 && hour < 15) return { cls: 'sky-noon',      sun: true,  moon: false, stars: false, label: 'noon',      dot: '#5c94fc' }
  if (hour >= 15 && hour < 17) return { cls: 'sky-afternoon', sun: true,  moon: false, stars: false, label: 'afternoon', dot: '#e8733a' }
  if (hour >= 17 && hour < 19) return { cls: 'sky-dusk',      sun: false, moon: false, stars: true,  label: 'dusk',      dot: '#e8400a' }
  if (hour >= 19 && hour < 21) return { cls: 'sky-evening',   sun: false, moon: true,  stars: true,  label: 'evening',   dot: '#3b3b9a' }
  return                              { cls: 'sky-night',      sun: false, moon: true,  stars: true,  label: 'night',     dot: '#08041a' }
}
