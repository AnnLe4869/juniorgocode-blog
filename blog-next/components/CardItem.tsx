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
      height: "50vh",
      margin: theme.spacing(3),
    },

    cover: {
      height: "100%",
      aspectRatio: "16/9",
      position: "relative",
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
          alt="image title"
          layout="fill"
        />
      </CardMedia>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Link href={`/${post.slug}`}>
            <a>
              <Typography component="h5" variant="h5">
                Live From Space
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Mac Miller
              </Typography>
            </a>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}
