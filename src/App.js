import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Fade,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import WeatherCard from "./components/WeatherCard";
import Cookies from "js-cookie";
import { CenteredFlexBox } from "./components/CustomComponents";
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
  textField: { backgroundColor: "#f8f8ff", marginBottom: 16 },
  addCityButton: { padding: "16px" },
  formControl: {
    width: 100,
    backgroundColor: "#f8f8ff",
    marginLeft: 16,
    marginBottom: 16,
  },
});

const App = () => {
  const classes = useStyles();

  const [textField, setTextField] = useState("");
  const [textFieldError, setTextFieldError] = useState("");
  const [cities, setCities] = useState([]);

  const addWeatherCard = async () => {
    if ((await getDataByCity(textField)) == null) {
      setTextField("");
      setTextFieldError("City doesn't exist.");
    } else {
      setCities([...cities, textField]);
      setTextField("");
    }
  };
  const deleteWeatherCard = (index) => {
    cities.splice(index, 1);
    setCities([...cities]);
  };

  const updateCookies = () => {
    Cookies.set("cities", cities, {
      expires: 31,
      secure: "true",
    });
    console.log("Updating cookies!");
  };

  useEffect(() => {
    const cookies = Cookies.get("cities");
    if (cookies) {
      setCities(cookies.split(","));
    }
  }, []);

  useEffect(updateCookies, [cities]);

  return (
    <Box className={classes.container}>
      <CenteredFlexBox style={{ flexDirection: "column", textAlign: "center" }}>
        <Typography variant="h2" style={{ fontWeight: 400 }} gutterBottom>
          OpenWeather Application
        </Typography>
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="City Name"
          variant="outlined"
          error={textFieldError === "" ? false : true}
          helperText={textFieldError}
          value={textField}
          onChange={(e) => setTextField(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addWeatherCard();
            }
            if (textFieldError !== "") {
              setTextFieldError("");
            }
          }}
        />
      </CenteredFlexBox>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          addWeatherCard();
        }}
        style={{ marginBottom: "8px" }}
      >
        Add City
      </Button>
      <CenteredFlexBox
        style={{
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {cities.map((city, index) => {
          return (
            <Fade in={true} timeout={1500} key={city}>
              <Box>
                <CenteredFlexBox style={{ flexDirection: "column" }}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      deleteWeatherCard(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CenteredFlexBox>
                <WeatherCard city={city} />
              </Box>
            </Fade>
          );
        })}
      </CenteredFlexBox>
    </Box>
  );
};

export default App;
