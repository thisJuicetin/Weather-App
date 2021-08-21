import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CardMedia } from "@material-ui/core";

const useStyles = makeStyles({
  weatherIcon: {
    height: "100px",
    width: "100px;",
    backgroundColor: "white",
    borderRadius: "50%",
  },
});

export const CenteredFlexBox = (props) => {
  return (
    <Box component="div" display="flex" alignItems="center" style={props.style}>
      {props.children}
    </Box>
  );
};

export const WeatherIcon = (props) => {
  const classes = useStyles();
  return (
    <CardMedia
      className={classes.weatherIcon}
      component="img"
      image={props.iconURL}
      title={props.title}
    />
  );
};
