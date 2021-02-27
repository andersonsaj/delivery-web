import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const mapboxToken = process.env.REACT_APP_ACCESS_MAPBOX_TOKEN;

export function fetchLocalMapBoxForward(local: string) {
  return axios(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`,
  );
}

export function fetchLocalMapBoxReverse(longitude: number, latitude: number) {
  return axios(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`,
  );
}
