import { useState, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import WeatherCard from "./components/WeatherCard";
import DeleteIcon from "@material-ui/icons/Delete";
import Cookies from "js-cookie";
import Fade from "@material-ui/core/Fade";
import { CenteredFlexBox } from "./components/CustomComponents";
import { getDataByCity, getWeatherIconURLByCode } from "./api/OpenWeatherUtils";

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

  const useConstructor = (callBack = () => {}) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
  };
  const [textField, setTextField] = useState("");
  const [weatherCards, setWeatherCards] = useState([]);
  const textFieldError = useRef(false);
  const textFieldErrorMessage = useRef("");
  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const displayErrorOnTextField = (error) => {
    textFieldError.current = !textFieldError.current;
    textFieldErrorMessage.current = error;
  };

  const resetTextField = () => {
    textFieldError.current = false;
    textFieldErrorMessage.current = "";
  };

  const handleAddCard = async () => {
    const check = Cookies.get("cities");
    const cookies = check == null ? "" : check;
    const input = textField;
    if (cookies.toLowerCase().includes(input.toLowerCase())) {
      setTextField("");
      displayErrorOnTextField("City card already exists.");
      return;
    }
    const city = await getDataByCity(input.replace(" ", "+"))
      .then((response) => {
        setWeatherCards([
          ...weatherCards,
          <WeatherCard city={response.name} key={response.name} />,
        ]);
        return response.name;
      })
      .catch((error) => {
        return null;
      });
    if (city === null) {
      displayErrorOnTextField("City does not exist.");
      setTextField("");
      return;
    }
    if (Cookies.get("cities")) {
      setCitiesCookie(Cookies.get("cities") + "," + city);
    } else {
      setCitiesCookie(city);
    }
    setTextField("");
  };
  const setCitiesCookie = (text) => {
    Cookies.set("cities", text, {
      expires: 31,
      secure: "true",
    });
  };
  const deleteCard = async (index) => {
    const removedCard = weatherCards.splice(index, 1)[0];
    const cookies = Cookies.get("cities");
    const newCookies = cookies.split(",").filter((value) => {
      return value !== removedCard.key;
    });
    setCitiesCookie(newCookies);
    // await delay(300);
    setWeatherCards([...weatherCards]);
  };

  const addCookiesToWeatherCards = () => {
    const cookies = Cookies.get("cities");
    if (cookies) {
      const weatherCards = cookies.split(",").map((cookie) => {
        return <WeatherCard city={cookie} key={cookie} />;
      });
      setWeatherCards(weatherCards);
    }
  };

  useConstructor(() => {
    addCookiesToWeatherCards();
  });

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
          error={textFieldError.current}
          helperText={textFieldErrorMessage.current}
          value={textField}
          onChange={(e) => setTextField(e.target.value)}
          onKeyPress={(e) => {
            if (textFieldError.current) resetTextField();
            if (e.key === "Enter") {
              handleAddCard();
            }
          }}
        />
      </CenteredFlexBox>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleAddCard();
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
        {weatherCards.map((card, index) => {
          return (
            <Fade in={true} timeout={900} key={card.props.city}>
              <Box>
                <CenteredFlexBox style={{ flexDirection: "column" }}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      deleteCard(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CenteredFlexBox>
                <WeatherCard city={card.props.city} />
              </Box>
            </Fade>
          );
        })}
      </CenteredFlexBox>
    </Box>
  );
};

export default App;
