import { useEffect, useState } from "react"
import countryService from "./services/countries"

const CountryInformation = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <p>languages:</p>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
    </div>
  )
}

const CountriesList = ({countries}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (1 < countries.length && countries.length <= 10) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.cca2}>{country.name.common}</li>
        ))}
      </ul>
    )
  } else if (countries.length === 1) {
    return (
      <CountryInformation country={countries[0]} />
    )
  } else {
    return (
      <div>
        No matches
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => {
        setCountries(initialCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countryCandidates = countries.filter((country) => (country.name.common.toLowerCase().includes(filter.toLowerCase())))

  return (
    <div>
      find countries<input value={filter} onChange={handleFilterChange} />
      <CountriesList countries={countryCandidates} />
    </div>
  )
}

export default App
