import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    backgroundColor: "#907373",
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>Coded and Developed by Anh Le 2021</footer>
  );
}
