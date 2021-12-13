export default function extractDate(text: string) {
  const re = /Date: (.*)\r\n/;

  const results = text.match(re);

  if (!results || results.length < 1) {
    throw new Error("The file need to have a date in the file content");
  }

  return results[1];
}
