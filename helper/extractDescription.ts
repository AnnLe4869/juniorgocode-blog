export default function extractDescription(text: string) {
  const re = /Description: (.*)\r\n/;

  const results = text.match(re);

  if (!results || results.length < 1) {
    throw new Error("The file need to have a description in the file content");
  }

  return results[1];
}
