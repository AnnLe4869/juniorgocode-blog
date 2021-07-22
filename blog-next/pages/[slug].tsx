import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Post } from "../types";
import Link from "next/link";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styles from "../styles/DetailPost.module.css";

// Candidates: atomDark, coldarkDark, night owl (need to customize)
// @ts-ignore
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; // Error here due to bug in TS file in @types

/**
 * No idea what is this, but this is from the react-markdown document for syntax highlighting
 * Link: https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
 * And it seem to works :)
 */
const components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={coldarkDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default function DetailedPost(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();

  return (
    <div>
      <Link href="/">
        <a>Go back to Home</a>
      </Link>
      <h1>{props.post.title}</h1>
      {/* TODO: Need to implement NextJS Image component for the img element */}
      <div className={styles.container}>
        <ReactMarkdown components={components}>
          {props.post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// For each individual page: Get detail data for each page
export const getStaticProps: GetStaticProps<{ post: Post }, { slug: string }> =
  async (context) => {
    const { params } = context;

    if (!params) throw new Error("No parameter is provided to the function");

    // This return an array of all data that match the query and we only want the first one
    const res = await fetch(`http://localhost:1337/posts?slug=${params.slug}`);
    const post: Post = (await res.json())[0];

    return {
      props: { post },
    };
  };

// Tell NextJS How many pages are there
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://localhost:1337/posts`);

  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    // This setup will make the page display 404 if page doesn't exist
    fallback: false,
  };
};
