export default function getTitle(text: string) {
  const re = /Title: (.*)\r\n/;

  const results = text.match(re);

  if (!results || results.length < 1) {
    throw new Error("The file need to have a title in the file content");
  }

  return results[1];
}
