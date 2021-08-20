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

// These imports were for implementing a state code selector
//  State codes are redundant so this could be implemented for a country code selector.
// import { STATE_CODES } from "./StateCodes";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";

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
  // const [stateCode, setStateCode] = useState("");
  // const handleStateChange = (e) => {
  //   setStateCode(e.target.value);
  // };

  const [weatherCards, setWeatherCards] = useState([]);
  const handleAddCard = () => {
    setWeatherCards([...weatherCards, <WeatherCard city={textField} />]);
    if (Cookies.get("cities")) {
      Cookies.set("cities", Cookies.get("cities") + "," + textField, {
        expires: 31,
        sameSite: "strict",
      });
    } else {
      Cookies.set("cities", textField, { expires: 31, sameSite: "strict" });
    }
    setTextField("");
  };
  const deleteCard = (index) => {
    weatherCards.splice(index, 1);
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
      <Box display="flex" alignItems="center">
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="City Name"
          variant="outlined"
          value={textField}
          onChange={(e) => setTextField(e.target.value)}
        />
        {/* <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            id="demo-simple-select-label"
            className={classes.textField}
          >
            State
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stateCode}
            onChange={handleStateChange}
          >
            {STATE_CODES.map((state, index) => {
              return (
                <MenuItem value={state} key={state}>
                  {state}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
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
            <Box key={index}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteCard(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <WeatherCard city={card.props.city} key={card.props.city} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default App;
