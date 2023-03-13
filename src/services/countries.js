import axios from "axios"

const baseUrl = "https://restcountries.com/v3.1/all"

const getAll = () => {
  return axios.get(baseUrl).then((res) => (res.data))
}

const serviceObject = {
  getAll
}

export default serviceObject
