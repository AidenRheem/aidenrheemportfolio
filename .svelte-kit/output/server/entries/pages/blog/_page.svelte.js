import { d as attr_style, h as ensure_array_like, j as attr, e as escape_html, k as bind_props, c as pop, p as push, f as stringify } from "../../../chunks/index2.js";
function _page($$payload, $$props) {
  push();
  let statusData = "";
  let data = $$props["data"];
  function fixDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      console.error("Error parsing date:", error);
      return dateString;
    }
  }
  let dotColor = "#a6a6ad";
  console.log(dotColor, statusData);
  $$payload.out += `<div class="min-h-screen flex items-center justify-center"><div class="container max-w-screen-sm border border-overlay2 p-18 relative bg-black/50 backdrop-blur-sm text-[#28282B]"><div class="flex items-center justify-center pb-6"><div class="absolute top-2 left-6 flex items-center text-3xl group hover:text-[#dbdbde]"><a class="moonhouse text-[#a6a6ad] group-hover:text-[#dbdbde]" href="/">a</a> <a class="moonhouse group-hover:text-[#dbdbde]" href="/"${attr_style(`margin-left: -4.5px; color: ${stringify(dotColor)};`)}>.</a></div> <div class="absolute top-4.75 right-6 flex items-center"><span class="krypton text-sm text-[#a6a6ad]" style="margin-left: -2px;"><a href="/projects" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">1.</a> <a href="/socials" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">2.</a> <a href="/music" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">3.</a> <a href="/blog" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">4.</a></span></div> <div class="flex flex-col items-center justify-center"><span class="krypton"><p class="text-sm text-[#dbdbde]">down below are all of my current blog posts. i'll probably have <b>none</b>.</p></span></div></div> <div class="container max-w-screen-sm border border-overlay2 p-2 text-[#28282B]"><div class="flex flex-col space-y-4">`;
  if (data.posts.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-center text-[#a6a6ad] krypton py-4">You're too early. There are no blog posts yet!</p>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(data.posts);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      $$payload.out += `<a${attr("href", `/blog/${post.slug}`)} class="block border border-overlay2 p-4 hover:bg-black/30 transition-colors duration-200"><div class="flex flex-col"><h2 class="text-lg font-medium text-[#dbdbde] krypton">${escape_html(post.metadata.title)}</h2> <p class="text-sm text-[#a6a6ad] krypton">${escape_html(fixDate(post.metadata.date))}</p> <p class="text-sm text-[#a6a6ad] krypton">${escape_html(post.preview)}</p> <div class="mt-2"><span class="text-[#4e79a7] krypton">Read more...</span></div></div></a>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></div></div></div>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
