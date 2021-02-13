import axios from "axios"

export const api = axios.create({
    baseURL: 'http://localhost:8080',
});
const mapboxToken = process.env.REACT_APP_ACCESS_MAPBOX_TOKEN;


export function fetchLocalMapBox(local: string) {
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`);
}

