import { useState, useEffect } from "react";
import {
  getDataByCity,
  getWeatherIconURLByCode,
} from "../api/OpenWeatherUtils";

const useWeatherCard = (city) => {
  const [cardInfo, setCardInfo] = useState();
  const fetchCityInfo = (city) => {
    getDataByCity(city.replace(" ", "+")).then((response) => {
      setCardInfo({
        city: response.name,
        weatherIconURL: getWeatherIconURLByCode(response.weatherIconCode),
        temperature: response.temperature,
        description: response.description,
      });
    });
  };

  useEffect(() => {
    fetchCityInfo(city);
  }, [city]);

  return cardInfo;
};

export default useWeatherCard;
