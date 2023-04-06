import axios from "axios"

const baseUrl = "https://restcountries.com/v3.1"

const getAll = () => {
  return axios.get(baseUrl).then((res) => (res.data))
}

const getOneCountry = (name) => {
  return axios.get(`${baseUrl}/name/${name}?fullText=true`).then(res => res.data)
}

const serviceObject = {
  getAll, getOneCountry
}

export default serviceObject
