import axios from 'axios'
export const baseUrl = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";

const instanceWithToken = axios.create({
    withCredentials: false,
    baseURL: baseUrl
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
        url: `${baseUrl}`,
        data: JSON.stringify({query}),
    })
} 