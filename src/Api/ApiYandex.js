import axios from 'axios'
const API_KEY = '76ade9cc-95ac-4852-a20f-6e53fefa307c';
const API_KEY_GEOSADGEST = 'a255bb43-0e41-4831-9c9d-ea921defed9a';


const instanceWithToken = axios.create({
    withCredentials: false,
})

export const getAddressYandex = (query, lat, lng) => {
    return instanceWithToken.get(`https://suggest-maps.yandex.ru/v1/suggest?apikey=${API_KEY_GEOSADGEST}&print_address=1&text=${query}&ll=${lat},${lng}&results=1`);
}

export const getMetro = () => {
    return instanceWithToken.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=37.6221,55.7539&kind=metro&rspn=0&results=3&format=json`);
}


/* https://geocode-maps.yandex.ru/1.x/?apikey=76ade9cc-95ac-4852-a20f-6e53fefa307c&geocode=${city}&format=json */