import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    title: {
      flexGrow: 1,
      cursor: "pointer",
    },
  })
);

export default function AppHeader() {
  const classes = useStyles();
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  const goAbout = () => {
    router.push("/about");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={goHome}>
            Junior go Code
          </Typography>
          <Button color="inherit" onClick={goAbout}>
            About
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
