import { Post } from "../types";
import formatDateString from "./formatDateString";

const formatPostTime = (post: Post): Post => {
  return {
    ...post,
    date: formatDateString(post.date),
  };
};

export default formatPostTime;
