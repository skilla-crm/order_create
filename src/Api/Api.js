import axios from 'axios'
const baseURL = process.env.REACT_APP_BASE_URL;

const instanceWithToken = axios.create({
  withCredentials: false,
  baseURL: baseURL,
})

const token = document.getElementById('root_order_create').getAttribute('token')

instanceWithToken.interceptors.request.use((config) => {
  config.headers.Authorization = token
  return config
})

export const getParametrs = () => {
  return instanceWithToken.get(`${baseURL}api/orders/parameters`)
}
/* api/orders/parameters?partnership_id={id} */
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

export const getHistoryOrders = (type, query) => {
  return instanceWithToken.get(`${baseURL}api/orders/history?${type == 1 ? 'company_id' : 'phone'}=${query}`)
}

export const createOrder = (data) => {
  return instanceWithToken({
    method: 'post',
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
    },
    url: `${baseURL}api/orders/create`,
    data: data
  })
}

export const checkCompany = (id) => {
  return instanceWithToken.get(`${baseURL}api/orders/check_company/${id}`)
}

export const checkPhone = (phone) => {
  return instanceWithToken.get(`${baseURL}api/orders/check_phone?phone=${phone}`)
}


export const contactCompany = (id) => {
  return instanceWithToken.get(`${baseURL}api/orders/company_contacts/${id}`)
}

export const orderRetry = (id) => {
  return instanceWithToken.get(`${baseURL}api/orders/retry/${id}`)
}

export const getDetails = (id) => {
  return instanceWithToken.get(`${baseURL}api/orders/detail/${id}`)
}

export const getPartnershipCompanies = (id) => {
  return instanceWithToken.get(`${baseURL}api/orders/companies/${id}`)
}

export const editOrder = (data, id) => {
  return instanceWithToken({
    method: 'post',
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
    },
    url: `${baseURL}api/orders/update/${id}`,
    data: data
  })
}


export const rejectOrder = (order_id) => {
  return instanceWithToken.post(`${baseURL}api/orders/reject/${order_id}`)
}




