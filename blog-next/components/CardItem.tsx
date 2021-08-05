import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { Post } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "block",
      marginTop: theme.spacing(4),
      padding: theme.spacing(2),
    },

    title: {
      color: "#3f51b5",
      fontWeight: 800,
      fontSize: "1.8rem",
      marginBottom: theme.spacing(1),
    },

    articleHeader: {
      marginBottom: theme.spacing(1),
    },
  })
);

export default function CardItem({ post }: { post: Post }) {
  const classes = useStyles();

  return (
    <article className={classes.root}>
      <header className={classes.articleHeader}>
        <Typography variant="h5" className={classes.title}>
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          {post.created_at}
        </Typography>
      </header>

      <section>
        <Typography variant="body1">{post.description}</Typography>
      </section>
    </article>
  );
}
