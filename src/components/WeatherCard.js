import React, { useRef, useState } from "react";
import {
  CardContent,
  Card,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  getDataByCity,
  getWeatherIconURLByCode,
} from "../api/OpenWeatherUtils";
import RefreshIcon from "@material-ui/icons/Refresh";
import { CenteredFlexBox, WeatherIcon } from "./CustomComponents";

const useStyles = makeStyles({
  root: {
    margin: "16px",
    backgroundColor: "#f8f8ff",
  },
});

const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};

const WeatherCard = (props) => {
  const classes = useStyles();
  const [city, setCity] = useState(props.city);
  const [weatherIconURL, setWeatherIconURL] = useState(props.weatherIconURL);
  const [temperature, setTemperature] = useState(props.temperature);
  const [description, setDescription] = useState(props.description);

  const refreshCard = async (city) => {
    await getDataByCity(city.replace(" ", "+")).then((response) => {
      setCity(response.name);
      setWeatherIconURL(getWeatherIconURLByCode(response.weatherIconCode));
      setTemperature(response.temperature);
      setDescription(response.description);
    });
  };
  useConstructor(() => {
    refreshCard(props.city);
  });
  return (
    <Card className={classes.root}>
      <CenteredFlexBox style={{ flexDirection: "column" }}>
        <CardContent>
          <CenteredFlexBox
            style={{ flexDirection: "column", height: 350, width: 200 }}
          >
            <CenteredFlexBox
              style={{
                textAlign: "center",
                justifyContent: "center",
                overflow: "hidden",
                height: "33%",
                width: "100%",
              }}
            >
              <Typography variant="h3" component="h2">
                {city}
              </Typography>
            </CenteredFlexBox>
            <WeatherIcon iconURL={weatherIconURL} title={description} />
            <Typography variant="h5" component="h2">
              {temperature}
            </Typography>

            <Typography variant="h5" component="h2">
              {description}
            </Typography>
            <IconButton
              aria-label="refresh"
              onClick={() => {
                refreshCard(props.city);
              }}
            >
              <RefreshIcon />
            </IconButton>
          </CenteredFlexBox>
        </CardContent>
      </CenteredFlexBox>
    </Card>
  );
};

export default WeatherCard;
