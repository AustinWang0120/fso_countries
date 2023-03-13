import axios from "axios"

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"
const api_key = process.env.REACT_APP_API_KEY

const getInfo = (lat, lon) => {
  return axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}`).then((res) => (res.data))
}

const serviceObject = {
  getInfo
}

export default serviceObject
