import axios from 'axios'
 const baseURL = "http://suggestions.dadata.ru/";
 const metroURL = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/metro"


const instanceWithToken = axios.create({
    withCredentials: false,
    baseURL: baseURL
})

const token = "72577aae3cb1de1dba79415c54bddfb11a28db21";

instanceWithToken.interceptors.request.use(config => {
    config.headers.Authorization = "Token " + token
    return config
});

export const getAddress = (query) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        },
        url: `${baseURL}suggestions/api/4_1/rs/suggest/address`,
        data: JSON.stringify({query,
            count: 1
        }),
    })
} 

export const getMetro= (query) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        },
        url: `${baseURL}suggestions/api/4_1/rs/suggest/metro`,
        data: JSON.stringify({query}),
    })
} 