import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

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

export default function WeatherCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box
          component="div"
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          height={350}
          width={200}
        >
          <Box
            component="div"
            height={1 / 3}
            width={1}
            display="flex"
            alignItems="center"
            overflow="hidden"
          >
            <Typography variant="h3" component="h2">
              {props.cityName}
            </Typography>
          </Box>
          <CardMedia
            className={classes.weatherIcon}
            component="img"
            alt="Weather Icon"
            image={
              "http://openweathermap.org/img/wn/" +
              props.weatherIconCode +
              "@2x.png"
            }
            title="Contemplative Reptile"
          />
          <Typography variant="h5" component="h2">
            {props.temperature}
          </Typography>

          <Typography variant="h5" component="h2">
            {props.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
