import { d as attr_style, e as escape_html, c as pop, p as push, f as stringify } from "../../chunks/index2.js";
function _page($$payload, $$props) {
  push();
  let LATimeNow = "";
  let spotifyData = null;
  let statusData = "";
  let dotColor = "#a6a6ad";
  console.log(dotColor, statusData, spotifyData);
  $$payload.out += `<div class="min-h-screen flex items-center justify-center"><div class="container max-w-screen-sm border border-overlay2 p-18 relative bg-black/50 backdrop-blur-sm text-[#28282B]"><div class="flex items-center justify-center pb-6"><div class="absolute top-2 left-6 flex items-center text-3xl group hover:text-[#dbdbde]"><a class="moonhouse text-[#a6a6ad] group-hover:text-[#dbdbde]" href="/">a</a> <a class="moonhouse group-hover:text-[#dbdbde]" href="/"${attr_style(`margin-left: -4.5px; color: ${stringify(dotColor)};`)}>.</a></div> <div class="absolute top-4.75 right-6 flex items-center"><span class="krypton text-sm text-[#a6a6ad]" style="margin-left: -2px;"><a href="/projects" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">1.</a> <a href="/socials" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">2.</a> <a href="/music" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">3.</a> <a href="/blog" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">4.</a></span></div> <div class="flex flex-col items-center justify-center"><span class="krypton"><p class="text-sm text-[#dbdbde]">hi, 안녕, i'm <b>aiden rheem</b> and i'm <b>17</b>.</p> <p class="text-sm text-[#dbdbde]">you can find my work &amp; some info about me here.</p> <p class="text-sm text-[#dbdbde]">the time in <b>Los Angeles, CA</b> is currently <span class="timenow"><b>${escape_html(LATimeNow)}</b></span></p></span></div></div> <div class="container max-w-screen-sm border border-overlay2 p-2 text-[#28282B]"><div class="flex items-center">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p id="spotify-text" class="text-sm text-[#dbdbde] krypton">currently not listening...</p>`;
  }
  $$payload.out += `<!--]--></div></div></div></div>`;
  pop();
}
export {
  _page as default
};
