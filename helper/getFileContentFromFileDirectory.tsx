import { readFile, access } from "fs/promises";
import path from "path";
export default async function getFileContentFromFileDirectory(file: string) {
  try {
    await access(path.join(process.cwd(), file));
  } catch (err) {
    console.error(err);
    throw new Error(
      "The file cannot be found. Maybe the filename provided doesn't exist or you don't have permission to read the file"
    );
  }

  const fileContent = await readFile(path.join(process.cwd(), file), "ascii");

  if (fileContent.length < 1) {
    throw new Error("The file is empty. Should be something there");
  }

  return fileContent;
}
