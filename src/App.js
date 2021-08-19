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
  const [textField, setTextField] = useState("San Jose");
  const [mainCity, setMainCity] = useState(textField);
  const [weatherIconCode, setWeatherIconCode] = useState("10d");
  const [temperature, setTemperature] = useState("Temperature");
  const [description, setDescription] = useState("Description");
  const classes = useStyles();

  const updateMainCard = async () => {
    getDataByCity(textField.replace(" ", "+")).then((response) => {
      console.log(response);
      setMainCity(response.name);
      setWeatherIconCode(response.weatherIconCode);
      setTemperature(response.temperature);
      setDescription(response.description);
    });
  };

  return (
    <Box className={classes.container}>
      <TextField
        id="outlined-basic"
        className={classes.textField}
        label="City Name"
        variant="outlined"
        value={textField}
        onChange={(e) => setTextField(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => updateMainCard()}
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
        <WeatherCard
          cityName={mainCity}
          weatherIconCode={weatherIconCode}
          temperature={temperature + "\u00B0F"}
          description={description}
        />
      </Box>
    </Box>
  );
};

export default App;
