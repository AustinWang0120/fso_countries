import { useEffect, useState } from "react"
import countryService from "../services/countries"

export const useCountry = (name) => {
  const [countryData, setCountryData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (name) {
      setLoading(true)
      countryService
        .getOneCountry(name)
        .then(data => setCountryData(data[0]))
        .catch(error => setError(error.message))
        .finally(() => setLoading(false))
    }
  }, [name])

  return {
    countryData,
    loading,
    error
  }
}
