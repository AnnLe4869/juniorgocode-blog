import { Container, makeStyles } from "@material-ui/core";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import CardItem from "../components/CardItem";
import extractContentFromText from "../helper/extractContentFromText";
import extractDateFromText from "../helper/extractDateFromText";
import extractDescriptionFromText from "../helper/extractDescriptionFromText";
import extractTitleFromText from "../helper/extractTitleFromText";
import getAllContentNameFromDirectory from "../helper/getAllContentNameFromDirectory";
import getFileContentFromFileDirectory from "../helper/getFileContentFromFileDirectory";
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
  const posts: Post[] = [];

  const subDirectories = await getAllContentNameFromDirectory("content");

  for (const subDirectoryName of subDirectories) {
    // The subdirectory'name is the article name and the actual article is the index.md file inside
    const fileContent = await getFileContentFromFileDirectory(
      `content/${subDirectoryName}/index.md`
    );

    const post: Post = {
      id: subDirectoryName,
      title: extractTitleFromText(fileContent),
      date: extractDateFromText(fileContent),
      description: extractDescriptionFromText(fileContent),
      content: extractContentFromText(fileContent),
    };
    posts.push(post);
  }

  return {
    props: {
      posts: posts.sort((a, b) => (a.date > b.date ? 10000 : -10000)),
    },
  };
};
