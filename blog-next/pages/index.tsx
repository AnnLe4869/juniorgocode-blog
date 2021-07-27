import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Post } from "../types";
import Link from "next/link";
import MainCard from "../components/MainCard";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
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
  const [latestPost, ...otherPosts] = props.posts;

  // Catch error in case there is no post
  if (!props.posts) return <div>Currently no posts here</div>;
  // Catch in case there is only one post
  if (otherPosts.length < 1) {
    return (
      <Container>
        <MainCard post={latestPost} />;
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
      {/* Loop over the posts */}
      <MainCard post={latestPost} />
      {props.posts &&
        props.posts.map((post) => (
          <Link key={post.id} href={`/${post.slug}`}>
            <a>
              <h2>{post.title}</h2>
              <div>{post.user.username}</div>
            </a>
          </Link>
        ))}
    </Container>
  );
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  // Get post from our Strapi API and sort by updated date
  const res = await fetch("http://localhost:1337/posts?_sort=updated_at:desc");
  const posts: Post[] = await res.json();

  return {
    props: { posts },
  };
};
