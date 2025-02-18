import axios from 'axios'
const URL_YANDEX = process.env.REACT_APP_URL_YANDEX;
const URL_GEOCODE = process.env.REACT_APP_URL_GEOCODE;
const API_KEY_MAP = process.env.REACT_APP_API_KEY_MAP;
const API_KEY_GEOSADGEST = process.env.REACT_APP_API_KEY_GEOSADGEST;


const instanceWithToken = axios.create({
    withCredentials: false,
})

export const getAddressSuggest = (query, defaultCordinate) => {
    return instanceWithToken.get(`${URL_YANDEX}v1/suggest?apikey=${API_KEY_GEOSADGEST}&&print_address=1&text=${query}&results=5&lang=ru&attrs=uri&types=geo,street,district,locality,area,province,house,metro&ll=${defaultCordinate[1]},${defaultCordinate[0]}`);
}
export const getAddressExact = (query) => {
    return instanceWithToken.get(`${URL_GEOCODE}1.x/?apikey=${API_KEY_MAP}&geocode=${query}&rspn=0&results=1&format=json`);
}

