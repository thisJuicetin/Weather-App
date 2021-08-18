import axios from "axios";
const BASE_URL = "https://api.openweathermap.org";
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
export const getDataByCity = (city) => {
  axios
    .get(BASE_URL + "/data/2.5/weather?q=" + city + "&appid=" + API_KEY)
    .then((res) => console.log(res.data));
};
