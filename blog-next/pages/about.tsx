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
  paragraph: {},
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
        className={classes.paragraph}
        paragraph
      >
        Hello world! I am Anh, a software engineer and soon to be a third year
        computer science student at University of California, San Diego. I start
        this blog with the purpose of helping other people and through that
        process also reinforce my learning.
      </Typography>
      <Typography component="p" variant="h6" paragraph>
        I write this blog using my own experience and information I found
        online, and thus, there are, inevitably, errors and misinformation in
        some articles. If you think something is incorrect or should be adjusted
        or should be changed for better, please let me know by sending me an
        email or DM me via Twitter. I am happy to receive any feedbacks.
      </Typography>
      <Typography component="p" variant="h6" paragraph>
        In my past time I enjoy learning new technologies or doing some small
        projects. Some of the most notable ones I have made is a clone of
        Evernote built with React and Firebase. The other one is called YelpCamp
        built with Node and has many features of the famous app Yelp.
      </Typography>
      <Typography component="p" variant="h6" paragraph>
        Other than programming I also play some games and read manga. My current
        favorite game is Genshin Impact and my favorite manga, well, it is hard
        to choose a favorite one. I read a lot of manga after all.
      </Typography>

      <Typography component="p" variant="h6" paragraph>
        My contacts
      </Typography>

      <Typography component="p" variant="h6" paragraph>
        Email: kunquan4869@gmail.com
      </Typography>

      <Typography component="p" variant="h6" paragraph>
        Twitter: AnnLee
      </Typography>
    </Container>
  );
}
