import { Box } from "@material-ui/core";
import "./App.css";
import WeatherCard from "./components/WeatherCard/WeatherCard";

function App() {
  return (
    <div className="container">
      <Box
        component="div"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <WeatherCard cityName="San Jose" />
        <WeatherCard cityName="Morgan Hill" />
        <WeatherCard cityName="Sacramento" />
      </Box>
    </div>
  );
}

export default App;
