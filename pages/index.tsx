import { Container, makeStyles } from "@material-ui/core";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import CardItem from "../components/CardItem";
import formatPostTime from "../helper/formatPostTime";
import { Post } from "../types";

import { readdir, readFile } from "fs/promises";
import path from "path";
import extractTitle from "../helper/extractTitle";
import extractDate from "../helper/extractDate";
import extractContent from "../helper/extractContent";
import formatDateString from "../helper/formatDateString";
import extractDescription from "../helper/extractDescription";

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
  const posts: Post[] = [];

  const subDirectories = await readdir(path.join(process.cwd(), "content"));

  for (const subDirectoryName of subDirectories) {
    const file = await readFile(
      path.join(process.cwd(), `content/${subDirectoryName}/index.md`),
      "ascii"
    );

    const post: Post = {
      id: subDirectoryName,
      title: extractTitle(file),
      date: extractDate(file),
      description: extractDescription(file),
      content: extractContent(file),
      slug: subDirectoryName,
    };
    posts.push(post);
  }

  return {
    props: {
      posts: posts
        .map((post) => formatPostTime(post))
        .sort((a, b) => (a.date > b.date ? 10000 : -10000)),
    },
  };
};
