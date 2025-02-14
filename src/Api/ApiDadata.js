import axios from 'axios'
const baseURL = "https://suggestions.dadata.ru/";

const instanceWithToken = axios.create({
    withCredentials: false,
    baseURL: baseURL
})

export const token = process.env.REACT_APP_TOKEN_DADATA;

instanceWithToken.interceptors.request.use(config => {
    config.headers.Authorization = "Token " + token
    return config
});

export const getMetro = (query) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        },
        url: `${baseURL}suggestions/api/4_1/rs/suggest/metro`,
        data: JSON.stringify({ query }),
    })
} 

export const getCordinateInfo = (lat, lon) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        },
        url: `${baseURL}suggestions/api/4_1/rs/geolocate/address`,
        data: JSON.stringify({
            lat,
            lon,
            count: 1
        }),
    })
}

export const getCompanyInfo = (query, kpp) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        },
        url: `${baseURL}suggestions/api/4_1/rs/findById/party`,
        data: JSON.stringify({ 
            query, 
            count: 100,
            kpp
        }),
    })
} 
