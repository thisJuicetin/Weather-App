import React, { useEffect, useState } from "react";
import {
  CardContent,
  Card,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { getDataByCity } from "../api/OpenWeatherUtils";
import RefreshIcon from "@material-ui/icons/Refresh";
import { CenteredFlexBox, WeatherIcon } from "./CustomComponents";

// const example = {
//   name: "San Jose",
//   temperature: 77.7,
//   description: "Lucky",
//   weatherIconURL: "http://openweathermap.org/img/wn/02d@2x.png",
// };

const useStyles = makeStyles({
  root: {
    margin: "16px",
    backgroundColor: "#f8f8ff",
  },
});

const WeatherCard = (props) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const updateItems = async (city) => {
    const data = await getDataByCity(city);
    setItems(data);
  };
  useEffect(() => {
    updateItems(props.city);
  }, [props]);
  return (
    <Card className={classes.root}>
      <CenteredFlexBox style={{ flexDirection: "column" }}>
        <CardContent>
          <CenteredFlexBox
            // style={{ flexDirection: "column", height: 350, width: 200 }}
            style={{ flexDirection: "column", height: 350 }}
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
                {items.name}
              </Typography>
            </CenteredFlexBox>
            <WeatherIcon
              iconURL={items.weatherIconURL}
              title={items.description}
            />
            <Typography variant="h5" component="h2">
              {items.temperature}
            </Typography>

            <Typography variant="h5" component="h2">
              {items.description}
            </Typography>
            <IconButton
              aria-label="refresh"
              onClick={() => {
                updateItems(props.city);
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
