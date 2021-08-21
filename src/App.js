import { useState, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import WeatherCard from "./components/WeatherCard";
import DeleteIcon from "@material-ui/icons/Delete";
import Cookies from "js-cookie";
import Fade from "@material-ui/core/Fade";

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
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleAddCard = () => {
    setWeatherCards([...weatherCards, <WeatherCard city={textField} />]);
    if (Cookies.get("cities")) {
      setCitiesCookie(Cookies.get("cities") + "," + textField);
    } else {
      setCitiesCookie(textField);
    }
    setTextField("");
  };
  const setCitiesCookie = (text) => {
    Cookies.set("cities", text, { expires: 31, sameSite: "strict" });
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
    console.log(Cookies.get().cities);
  };
  useConstructor(() => {
    addCookiesToWeatherCards();
  });
  return (
    <Box className={classes.container}>
      <Box display="flex" alignItems="center">
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="City Name"
          variant="outlined"
          value={textField}
          onChange={(e) => setTextField(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleAddCard();
        }}
      >
        Add City
      </Button>
      <Box
        component="div"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {weatherCards.map((card, index) => {
          return (
            <Fade in={true} timeout={900} unmountOnExit key={card}>
              <Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      deleteCard(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <WeatherCard city={card.props.city} key={card.props.city} />
              </Box>
            </Fade>
          );
        })}
      </Box>
    </Box>
  );
};

export default App;
