export default function extractTitleFromText(text: string) {
  // The title is the line that start with Title
  const regexExpression = /Title: (.*)\r\n/;

  const results = text.match(regexExpression);

  if (!results || results.length < 2) {
    throw new Error(
      "The text doesn't have title field or is not formatted correctly"
    );
  }

  return results[1];
}
