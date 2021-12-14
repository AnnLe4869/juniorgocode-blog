import { Post } from "../types";
import formatDateString from "./formatDateString";

export default function extractDateFromText(text: Post["content"]) {
  const re = /Date: (.*)\r\n/;

  const results = text.match(re);

  if (!results || results.length < 1) {
    throw new Error("The file need to have a date in the file content");
  }

  return formatDateString(results[1]);
}
