import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { geocodeCity } from '../lib/weather.js'

const DEFAULT_CITY = { id: 'default', name: 'Jakarta', country: 'ID', lat: -6.2088, lon: 106.8456, isHome: true }

export function useCities(user, isGuest) {
  const [cities,       setCities]       = useState([DEFAULT_CITY])
  const [activeIndex,  setActiveIndex]  = useState(0)
  const [searchQuery,  setSearchQuery]  = useState('')
  const [searchResults,setSearchResults]= useState([])
  const [searching,    setSearching]    = useState(false)

  // Load user's saved cities from Supabase
  useEffect(() => {
    if (!user) { setCities([DEFAULT_CITY]); return }
    supabase
      .from('user_cities')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at')
      .then(({ data }) => {
        if (data?.length) {
          setCities(data.map(r => ({
            id: r.id, name: r.name, country: r.country,
            lat: r.lat, lon: r.lon, isHome: r.is_home,
          })))
        } else {
          setCities([DEFAULT_CITY])
        }
      })
  }, [user])

  const addCity = async (city) => {
    if (!user) return
    const { data, error } = await supabase.from('user_cities').insert({
      user_id: user.id,
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      is_home: cities.length === 0,
    }).select().single()
    if (!error && data) {
      setCities(prev => [...prev, { id: data.id, name: data.name, country: data.country, lat: data.lat, lon: data.lon, isHome: data.is_home }])
    }
  }

  const removeCity = async (cityId) => {
    if (!user) return
    await supabase.from('user_cities').delete().eq('id', cityId)
    setCities(prev => {
      const next = prev.filter(c => c.id !== cityId)
      return next.length ? next : [DEFAULT_CITY]
    })
    setActiveIndex(0)
  }

  const searchCities = async (query) => {
    if (!query.trim()) { setSearchResults([]); return }
    setSearching(true)
    try {
      const results = await geocodeCity(query)
      setSearchResults(results.map(r => ({
        name: r.name,
        country: r.country,
        state: r.state || '',
        lat: r.lat,
        lon: r.lon,
      })))
    } catch { setSearchResults([]) }
    finally { setSearching(false) }
  }

  // Use browser geolocation for home city
  const detectLocation = (onSuccess) => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      pos => onSuccess({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => {} // silent fail, use default
    )
  }

  return {
    cities, activeIndex, setActiveIndex,
    activeCity: cities[activeIndex] || DEFAULT_CITY,
    searchQuery, setSearchQuery,
    searchResults, searching,
    addCity, removeCity, searchCities,
    detectLocation,
  }
}
