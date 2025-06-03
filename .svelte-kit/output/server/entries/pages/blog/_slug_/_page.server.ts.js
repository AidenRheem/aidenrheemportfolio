import matter from "gray-matter";
import { e as error } from "../../../../chunks/index.js";
import fs from "fs";
import path from "path";
const load = async ({ params }) => {
  try {
    const { slug } = params;
    const filePath = path.resolve("src/posts", `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { content, data: metadata } = matter(fileContent);
    return {
      content,
      metadata
    };
  } catch (e) {
    throw error(404, "Post not found");
  }
};
export {
  load
};
