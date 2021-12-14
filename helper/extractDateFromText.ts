import formatDateString from "./formatDateString";

export default function extractDateFromText(text: string) {
  // The date is the line that start with Date
  const regexExpression = /Date: (.*)\r\n/;

  const results = text.match(regexExpression);

  if (!results || results.length < 2) {
    throw new Error(
      "The text doesn't have any date field or is not formatted correctly" +
        text
    );
  }

  return formatDateString(results[1]);
}
