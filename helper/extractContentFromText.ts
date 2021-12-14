export default function extractContentFromText(text: string) {
  // The content start with the first line that starts with ## and last till the end of file
  const regexExpression = /(## [\w\W]*)/;

  const results = text.match(regexExpression);

  if (!results || results.length < 2) {
    console.log(results);

    throw new Error(
      "The text either doesn't have any content field or is not formatted correctly" +
        text
    );
  }

  return results[1];
}
