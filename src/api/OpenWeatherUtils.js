import axios from "axios";
const BASE_URL = "https://api.openweathermap.org";
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
export const getDataByCity = async (city) => {
  const response = axios
    .get(
      BASE_URL +
        "/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        API_KEY
    )
    .then((response) => {
      return {
        name: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].main,
        weatherIconCode: response.data.weather[0].icon,
      };
    })
    .catch((error) => console.log(error));
  return response;
};
export const getDataByCityAndState = async (city, state) => {
  const response = axios
    .get(
      BASE_URL +
        "/data/2.5/weather?q=" +
        city +
        "," +
        state +
        "&units=imperial&appid=" +
        API_KEY
    )
    .then((response) => {
      return {
        name: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].main,
        weatherIconCode: response.data.weather[0].icon,
      };
    })
    .catch((error) => console.log(error));
  return response;
};
// export const getDataByCity2 = async (city) => {
//   const response = axios
//     .get(
//       BASE_URL +
//         "/data/2.5/weather?q=" +
//         city +
//         "&units=imperial&appid=" +
//         API_KEY
//     )
//     .then((response) => {
//       console.log(response);
//       const coordinates = response.data.coord;
//       return getNeighboringCities(coordinates.lat, coordinates.lon);
//     })
//     .catch((error) => console.log(error));
//   return response;
// };
// export const getNeighboringCities = async (lat, lon) => {
//   const response = axios
//     .get(
//       BASE_URL +
//         "/data/2.5/find?lat=" +
//         lat +
//         "&lon=" +
//         lon +
//         "&units=imperial&cnt=3&appid=" +
//         API_KEY
//     )
//     .then((response) => {
//       console.log(response);
//       return response.data.list;
//     })
//     .catch((error) => console.log(error));
//   return response;
// };
