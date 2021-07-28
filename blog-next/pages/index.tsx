import { Container, makeStyles } from "@material-ui/core";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import CardItem from "../components/CardItem";
import { Post } from "../types";

const useStyles = makeStyles(() => ({
  root: {},

  mainCard: {
    margin: "0 auto",
    padding: 10,
  },
}));

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {/* Loop over the posts */}
      {props.posts &&
        props.posts.map((post) => <CardItem post={post} key={post.id} />)}
    </Container>
  );
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  // Get post from our Strapi API and sort by updated date
  const res = await fetch(
    "http://localhost:1337/posts?_sort=published_at:desc"
  );
  const posts: Post[] = await res.json();

  return {
    props: { posts },
  };
};
