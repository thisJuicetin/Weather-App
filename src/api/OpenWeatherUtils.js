import axios from "axios";

const BASE_URL = "https://api.openweathermap.org";
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const config = {
  params: { units: "imperial", appid: API_KEY },
};

export const getDataByCity = async (city) => {
  const response = await axios
    .get(BASE_URL + "/data/2.5/weather?q=" + city, config)
    .then((response) => {
      return {
        name: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].main,
        weatherIconURL: getWeatherIconURLByCode(response.data.weather[0].icon),
      };
    })
    .catch((error) => {
      return null;
    });
  return response;
};

export const getWeatherIconURLByCode = (code) => {
  return "https://openweathermap.org/img/wn/" + code + "@2x.png";
};
