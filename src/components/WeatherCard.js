import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box, IconButton } from "@material-ui/core";
import { getDataByCity } from "../api/OpenWeatherUtils";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles({
  root: {
    margin: "16px",
    backgroundColor: "#f8f8ff",
  },
  weatherIcon: {
    height: "100px",
    width: "100px;",
    backgroundColor: "white",
    borderRadius: "50%",
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
  const [weatherIconCode, setWeatherIconCode] = useState("10d");
  const [temperature, setTemperature] = useState();
  const [description, setDescription] = useState();

  const initializeCard = async () => {
    getDataByCity(city.replace(" ", "+")).then((response) => {
      console.log(response);
      setCity(response.name);
      setWeatherIconCode(response.weatherIconCode);
      setTemperature(response.temperature);
      setDescription(response.description);
      return;
    });
  };
  useConstructor(() => {
    initializeCard();
  });
  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Card className={classes.root}>
        <CardContent>
          <Box
            component="div"
            display="flex"
            flexDirection="column"
            alignItems="center"
            align="center"
            height={350}
            width={200}
          >
            <Box
              component="div"
              height={1 / 3}
              width={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
            >
              <Typography variant="h3" component="h2">
                {city}
              </Typography>
            </Box>
            <CardMedia
              className={classes.weatherIcon}
              component="img"
              alt="Weather Icon"
              image={
                "http://openweathermap.org/img/wn/" +
                weatherIconCode +
                "@2x.png"
              }
              title={description}
            />
            <Typography variant="h5" component="h2">
              {temperature}
            </Typography>

            <Typography variant="h5" component="h2">
              {description}
            </Typography>
            <IconButton aria-label="refresh" onClick={initializeCard}>
              <RefreshIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeatherCard;
