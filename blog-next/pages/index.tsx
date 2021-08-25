import { Container, makeStyles } from "@material-ui/core";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import CardItem from "../components/CardItem";
import formatPostTime from "../helper/formatPostTime";
import { Post } from "../types";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "42rem",
  },

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
    <>
      <Head>
        <title>Junior go Code</title>
        <meta
          name="description"
          content="Junior Go Code. Blogs for developers"
        />

        <meta property="og:url" content="/" />
        <meta property="og:title" content="Junior go Code" />
        <meta
          property="og:image"
          content="https://juniorgocode.com/cover.png"
        />
        <meta
          property="og:description"
          content="Junior Go Code. Blogs for developers"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@jrgocode" />
        <meta name="twitter:title" content="Junior go Code" />
        <meta
          property="twitter:image"
          content="https://juniorgocode.com/cover.png"
        />
        <meta
          name="twitter:description"
          content="Junior Go Code. Blogs for developers"
        />
      </Head>
      <Container className={classes.root}>
        {/* Loop over the posts */}
        {props.posts &&
          props.posts.map((post) => <CardItem post={post} key={post.id} />)}
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  // Get post from our Strapi API and sort by updated date
  const res = await fetch(
    "http://localhost:1337/posts?_sort=published_at:desc"
  );
  const posts: Post[] = await res.json();

  return {
    props: { posts: posts.map((post) => formatPostTime(post)) },
  };
};
