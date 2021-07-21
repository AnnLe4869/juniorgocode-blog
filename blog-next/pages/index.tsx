import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Post } from "../types";
import Link from "next/link";

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <div>
      {/* Loop over the posts */}
      {props.posts &&
        props.posts.map((post) => (
          <Link key={post.id} href={`/${post.slug}`}>
            <a>
              <h2>{post.title}</h2>
              <div>{post.user.username}</div>
            </a>
          </Link>
        ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  // Get post from our Strapi API

  const res = await fetch("http://localhost:1337/posts");
  const posts: Post[] = await res.json();

  return {
    props: { posts },
  };
};
