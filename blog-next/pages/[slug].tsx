import { Container } from "@material-ui/core";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// Candidates: atomDark, coldarkDark, night owl (need to customize)
// @ts-ignore
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; // !Error here due to bugs in TS file in @types/react-highlight
import gfm from "remark-gfm";
/**
 * Need to use CSS file style since we Material-UI useStyles that can only be used in a component
 * And we the `components` that has in itself React component
 */
import styles from "../styles/DetailPost.module.css";
import { Post } from "../types";

/**
 * No idea what is this, but this is from the react-markdown document for syntax highlighting
 * * Link: https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
 * And it seem to works :)
 *
 * * Reason(guessing): it take the name of the element (i.e <code>, <img>, etc.) as key and
 * the value is a function that return a React element.
 * Link: https://github.com/vercel/next.js/discussions/18383 and there is a link to a blog about solving for <img>
 * Note that they use renderer property, which is deprecated and the modern one (with same syntax) is components
 *
 * !Warning: I have to use `any` type here because I cannot figure out the correct type for the function parameter.
 * !Normal HTMLElement won't work at all
 *
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

  /**
   * * We have to use img together with p
   * For some reasons some page can work just fine without this img but some won't
   * Best guess would be some difference in the markdown file
   */
  img(image: any) {
    return (
      <div className={styles.imageContainer}>
        <Image
          src={`http://localhost:1337${image.src}`}
          alt={image.alt}
          layout="fill"
        />
      </div>
    );
  },

  /**
   * We use p element TOGETHER WITH img element because we want to avoid the Warning message
   * Reason is that, it look like the react-markdown auto wrap our image inside a p and we don't want that
   */
  p(paragraph: any) {
    const { node } = paragraph;

    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      return (
        <div className={styles.imageContainer}>
          <Image
            src={`http://localhost:1337${image.properties.src}`}
            alt={image.properties.alt}
            layout="fill"
          />
        </div>
      );
    }

    return <p>{paragraph.children}</p>;
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
      <Container>
        <ReactMarkdown components={components} remarkPlugins={[gfm]}>
          {props.post.content}
        </ReactMarkdown>
      </Container>
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
