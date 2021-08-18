import { useState } from "react";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import { getDataByCity } from "./api/OpenWeatherUtils";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "64px",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "aliceblue",
  },
  textField: { backgroundColor: "#f8f8ff", paddingBottom: "16px" },
});

const App = () => {
  const [city, setCity] = useState("San Jose");
  const classes = useStyles();

  // const getWeather = (e) => {};

  return (
    <Box className={classes.container}>
      <TextField
        id="outlined-basic"
        className={classes.textField}
        label="City Name"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => getDataByCity(city)}
      >
        Get Weather
      </Button>
      <Box
        component="div"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <WeatherCard cityName="San Jose" />
      </Box>
    </Box>
  );
};

export default App;
