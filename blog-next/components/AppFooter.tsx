import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    backgroundColor: "#000",
  },
  externalLink: {
    color: "#fafafa",
    transition: "all 0.3s ease-in-out 0s",
    textDecoration: "none",
    marginLeft: theme.spacing(3),
    fontSize: "1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      {/**
       * rel="noopener noreferrer" used with target="_blank" to mitigate a security risk
       * Link: https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
       */}
      <a
        href="https://twitter.com/jrgocode"
        className={classes.externalLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
      <span className={classes.externalLink}>•</span>
      <a
        href="https://github.com/AnnLe4869"
        className={classes.externalLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <span className={classes.externalLink}>•</span>

      <a
        href="https://stackoverflow.com/users/9087143/kunquan"
        className={classes.externalLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        StackOverflow
      </a>
    </footer>
  );
}
