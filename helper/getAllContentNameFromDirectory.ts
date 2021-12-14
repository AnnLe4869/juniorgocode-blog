import { readdir, access } from "fs/promises";
import path from "path";

/**
 * Return all contents' name, including the file and subdirectories
 * @param directory : the name of the directory we want to get all its content from
 */
export default async function getAllContentNameFromDirectory(
  directory: string
) {
  try {
    await access(path.join(process.cwd(), directory));
  } catch (err) {
    throw new Error(
      "The directory cannot be found. Maybe the directory doesn't exist or you don't have permission to read the directory"
    );
  }

  const subContents = await readdir(path.join(process.cwd(), directory));
  if (subContents.length < 1) {
    throw new Error(
      "There is no content inside the directory. Maybe the directory name is incorrect"
    );
  }

  if (new Set(subContents).size !== subContents.length) {
    throw new Error("There are two elements with same name in the directory");
  }

  return subContents;
}
