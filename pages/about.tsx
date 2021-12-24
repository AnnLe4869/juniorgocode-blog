import { makeStyles } from "@material-ui/core";
import { Container, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    fontWeight: 900,
    textRendering: "optimizeLegibility",
    fontSize: "2.5rem",
    lineHeight: 1.1,
  },
  externalLink: {
    color: "rgb(87, 62, 222)",
    transition: "all 0.3s ease-in-out 0s",
    textDecoration: "none",
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography component="h1" variant="h1" className={classes.title}>
        About me
      </Typography>
      <Typography
        component="p"
        variant="h6"
        paragraph
        style={{ marginBottom: "1.5rem" }}
      >
        Hello world! I am Anh, a computer science student at University of
        California, San Diego. I started this blog with the purpose of helping
        other people and through that process also reinforce my learning.
      </Typography>
      <Typography
        component="p"
        variant="h6"
        paragraph
        style={{ marginBottom: "1.5rem" }}
      >
        I write this blog using my own experience and information I found
        online, and thus, there are, inevitably, errors and misinformation in
        some articles. If you think something is incorrect or should be
        adjusted, please let me know by{" "}
        <a
          href="mailto:juniorgocode@gmail.com"
          className={classes.externalLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          sending me an email
        </a>{" "}
        or{" "}
        <a
          href="https://twitter.com/juniorgocode"
          className={classes.externalLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          DM me via Twitter
        </a>
        . I am happy to receive feedbacks.
      </Typography>
      <Typography
        component="p"
        variant="h6"
        paragraph
        style={{ marginBottom: "1.5rem" }}
      >
        In my free time, I enjoy learning new technologies or doing some small
        projects. Some of the most notable ones I have made is a clone of
        Evernote built with React and Firebase. The other one is called YelpCamp
        built with Node that has many features of the famous app Yelp.
      </Typography>
      <Typography
        component="p"
        variant="h6"
        paragraph
        style={{ marginBottom: "1.5rem" }}
      >
        Other than programming I also play games and read manga. My current
        favorite game is Genshin Impact and my favorite manga, well, it is hard
        to choose a favorite one. I read a lot of manga after all.
      </Typography>

      <Typography
        component="p"
        variant="h6"
        paragraph
        style={{ marginBottom: "1.5rem" }}
      >
        <a
          href="https://twitter.com/juniorgocode"
          className={classes.externalLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow me on Twitter
        </a>
      </Typography>
    </Container>
  );
}
