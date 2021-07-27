import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "40vh",
      margin: theme.spacing(3),
      /**
       * For detail on breakpoint size, go to
       * https://material-ui.com/customization/breakpoints/#default-breakpoints
       */
      [theme.breakpoints.down("md")]: {
        display: "block",
        height: "65vh",
        maxHeight: "800px",
      },

      [theme.breakpoints.down("xs")]: {
        display: "block",
        height: "90vh",
        maxHeight: "350px",
      },
    },

    cover: {
      width: "30%",
      aspectRatio: "16/9",
      position: "relative",

      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },

    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
  })
);

export default function CardItem({ post }: { post: Post }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} title={post.title}>
        <Image
          src={`http://localhost:1337${post.imageCover.url}`}
          alt={post.title}
          layout="fill"
        />
      </CardMedia>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Link href={`/${post.slug}`}>
            <a>
              <Typography component="h4" variant="h4" color="primary">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Mac Miller
              </Typography>

              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                euismod, nulla eu feugiat lacinia, sem tellus aliquet tellus,
                quis eleifend sapien dui nec sem. Suspendisse non consequat
                nulla. Aenean euismod nibh id lorem volutpat, at tincidunt
                lectus sodales. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos.
              </Typography>
            </a>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}
