import { Post } from "../types";
import formatDateString from "./formatDateString";

const formatPostTime = (post: Post): Post => {
  return {
    ...post,
    created_at: formatDateString(post.created_at),
    updated_at: formatDateString(post.updated_at),
  };
};

export default formatPostTime;
