import { useEffect, useState } from "react"
import countryService from "./services/countries"
import weatherService from "./services/weather"

const WeatherInformation = ({country}) => {
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    weatherService
      .getInfo(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then((info) => {
        setWeatherInfo(info)
      })
  }, [country.capitalInfo.latlng])

  if (weatherInfo === null) {
    return null
  }
  
  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature: {weatherInfo.main.temp}</p>
      <p>wind: {weatherInfo.wind.speed} m/s</p>
    </div>
  )
}

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
      <WeatherInformation country={country} />
    </div>
  )
}

const CountriesList = ({countries, setFilter}) => {
  const showOneAmongMany = (name) => {
    setFilter(name)
  }
  
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
          <li key={country.cca2}>
            {country.name.common}
            <button onClick={() => {showOneAmongMany(country.name.common)}}>show</button>
          </li>
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

const SearchBar = ({filter, setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <input value={filter} onChange={handleFilterChange} />
  )
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

  const countryCandidates = countries.filter((country) => (country.name.common.toLowerCase().includes(filter.toLowerCase())))

  return (
    <div>
      find countries<SearchBar filter={filter} setFilter={setFilter} />
      <CountriesList countries={countryCandidates} setFilter={setFilter} />
    </div>
  )
}

export default App
