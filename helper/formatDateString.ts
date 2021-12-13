const formatDateString = (dateString: string) => {
  const date = new Date(dateString);

  if (date.toLocaleDateString() === "Invalid Date")
    throw new Error("Your date string is invalid");

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default formatDateString;
