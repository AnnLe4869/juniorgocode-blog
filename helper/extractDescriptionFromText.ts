export default function extractDescriptionFromText(text: string) {
  // The description is the line that start with Description
  const regexExpression = /Description: (.*)\r\n/;

  const results = text.match(regexExpression);

  if (!results || results.length < 2) {
    throw new Error(
      "The text doesn't have description field or is not formatted correctly"
    );
  }

  return results[1];
}
