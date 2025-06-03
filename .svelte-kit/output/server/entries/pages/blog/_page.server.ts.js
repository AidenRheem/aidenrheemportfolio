const load = async () => {
  const { default: matter } = await import("gray-matter");
  const postsImported = /* @__PURE__ */ Object.assign({});
  const posts = Object.entries(postsImported).map(([path, module]) => {
    const { content, data: metadata } = matter(module);
    const slug = path.split("/").pop()?.replace(".md", "");
    const preview = content.substring(0, 100) + "...";
    return { metadata, slug, preview };
  });
  return { posts };
};
export {
  load
};
