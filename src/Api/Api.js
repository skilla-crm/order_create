import axios from 'axios'
const baseURL = process.env.REACT_APP_BASE_URL;

const instanceWithToken = axios.create({
  withCredentials: false,
  baseURL: baseURL,
})

const token = document.getElementById('root_order-create').getAttribute('token')

instanceWithToken.interceptors.request.use((config) => {
  config.headers.Authorization = token
  return config
})

export const getParametrs = () => {
  return instanceWithToken.get(`${baseURL}api/orders/parameters`)
}

export const createCompany = (data) => {
  return instanceWithToken({
    method: 'post',
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
    },
    url: `${baseURL}api/companies/create`,
    data: data
  })

}
