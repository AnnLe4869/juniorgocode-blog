import { Post } from "../types";

export default function extractContentFromText(text: Post["content"]) {
  const re = /(## [\w\W]*)/;

  const results = text.match(re);

  if (!results || results.length < 1) {
    throw new Error("The file need to have content in the file content");
  }

  return results[1];
}
