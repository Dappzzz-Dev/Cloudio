const BASE = 'https://api.openweathermap.org/data/2.5'
const GEO  = 'https://api.openweathermap.org/geo/1.0'
const KEY  = import.meta.env.VITE_OWM_KEY

// Fetch current weather by coords
export async function fetchCurrentWeather(lat, lon, lang = 'id') {
  const res = await fetch(
    `${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${KEY}`
  )
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`)
  return res.json()
}

// Fetch 5-day / 3-hour forecast
export async function fetchForecast(lat, lon, lang = 'id') {
  const res = await fetch(
    `${BASE}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${KEY}`
  )
  if (!res.ok) throw new Error(`Forecast API error: ${res.status}`)
  return res.json()
}

// Geocode city name → coords
export async function geocodeCity(cityName) {
  const res = await fetch(
    `${GEO}/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${KEY}`
  )
  if (!res.ok) throw new Error(`Geocode API error: ${res.status}`)
  return res.json()
}

// Parse forecast list → hourly rain % for today
export function parseHourlyRain(forecastData) {
  const today = new Date().toISOString().slice(0, 10)
  return forecastData.list
    .filter(item => item.dt_txt.startsWith(today))
    .map(item => ({
      time: item.dt_txt.slice(11, 16),
      pct:  Math.round((item.pop || 0) * 100),
      rain: item.rain?.['3h'] || 0,
    }))
}

// Parse forecast list → daily summary (next 5 days)
export function parseDailyForecast(forecastData) {
  const days = {}
  forecastData.list.forEach(item => {
    const date = item.dt_txt.slice(0, 10)
    if (!days[date]) days[date] = { temps: [], icons: [], descs: [] }
    days[date].temps.push(item.main.temp)
    days[date].icons.push(item.weather[0].icon)
    days[date].descs.push(item.weather[0].description)
  })

  const DAY_ID = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']
  const DAY_EN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const DAY_JA = ['日','月','火','水','木','金','土']

  return Object.entries(days).slice(0, 5).map(([date, data]) => {
    const d   = new Date(date)
    const dow = d.getDay()
    return {
      date,
      dayId: DAY_ID[dow],
      dayEn: DAY_EN[dow],
      dayJa: DAY_JA[dow],
      hi:    Math.round(Math.max(...data.temps)),
      lo:    Math.round(Math.min(...data.temps)),
      icon:  data.icons[Math.floor(data.icons.length / 2)],
      desc:  data.descs[Math.floor(data.descs.length / 2)],
    }
  })
}

// Map OWM icon code → internal type
export function iconType(owmIcon) {
  if (!owmIcon) return 'cloud'
  const code = owmIcon.replace('d','').replace('n','')
  if (['01'].includes(code)) return 'sun'
  if (['02','03','04'].includes(code)) return 'partly'
  if (['09','10'].includes(code)) return 'rain'
  if (['11'].includes(code)) return 'storm'
  if (['13'].includes(code)) return 'snow'
  return 'cloud'
}
