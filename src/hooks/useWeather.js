import { useState, useEffect, useCallback } from 'react'
import {
  fetchCurrentWeather,
  fetchForecast,
  parseHourlyRain,
  parseDailyForecast,
  iconType,
} from '../lib/weather.js'

export function useWeather(city, lang = 'id') {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const load = useCallback(async () => {
    if (!city?.lat || !city?.lon) return
    setLoading(true)
    setError(null)
    try {
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(city.lat, city.lon, lang),
        fetchForecast(city.lat, city.lon, lang),
      ])
      setData({
        name:        current.name,
        country:     current.sys.country,
        temp:        Math.round(current.main.temp),
        feelsLike:   Math.round(current.main.feels_like),
        desc:        current.weather[0].description,
        icon:        iconType(current.weather[0].icon),
        wind:        Math.round(current.wind.speed * 3.6), // m/s → km/h
        humidity:    current.main.humidity,
        visibility:  Math.round((current.visibility || 0) / 1000),
        pressure:    current.main.pressure,
        sunrise:     new Date(current.sys.sunrise * 1000),
        sunset:      new Date(current.sys.sunset  * 1000),
        uvi:         null, // needs One Call API
        hourlyRain:  parseHourlyRain(forecast),
        daily:       parseDailyForecast(forecast),
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [city?.lat, city?.lon, lang])

  useEffect(() => { load() }, [load])

  return { data, loading, error, reload: load }
}
