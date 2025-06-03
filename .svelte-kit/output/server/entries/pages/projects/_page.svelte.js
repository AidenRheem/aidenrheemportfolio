import { d as attr_style, c as pop, p as push, f as stringify } from "../../../chunks/index2.js";
function _page($$payload, $$props) {
  push();
  let spotifyData = null;
  let statusData = "";
  let dotColor = "#a6a6ad";
  console.log(dotColor, statusData, spotifyData);
  $$payload.out += `<div class="min-h-screen flex items-center justify-center"><div class="container max-w-screen-sm border border-overlay2 p-18 relative bg-black/50 backdrop-blur-sm text-[#28282B]"><div class="flex items-center justify-center pb-6"><div class="absolute top-2 left-6 flex items-center text-3xl group hover:text-[#dbdbde]"><a class="moonhouse text-[#a6a6ad] group-hover:text-[#dbdbde]" href="/">a</a> <a class="moonhouse group-hover:text-[#dbdbde]" href="/"${attr_style(`margin-left: -4.5px; color: ${stringify(dotColor)};`)}>.</a></div> <div class="absolute top-4.75 right-6 flex items-center"><span class="krypton text-sm text-[#a6a6ad]" style="margin-left: -2px;"><a href="/projects" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">1.</a> <a href="/socials" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">2.</a> <a href="/music" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">3.</a> <a href="/blog" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">4.</a></span></div> <div class="flex flex-col items-center justify-center"><span class="krypton"><p class="text-sm text-[#dbdbde]">some things that I'm currently involved in.</p> <p class="text-sm text-[#dbdbde]">i'm too lazy to rework this. go to my linkedin.</p></span></div></div> <div class="projects-grid svelte-1ng7ckp"><div class="project-item group svelte-1ng7ckp"><a href="https://google.com" rel="noopener noreferrer" target="_blank"><div class="project-container svelte-1ng7ckp"><div class="image-container svelte-1ng7ckp"><img width="246" height="64" class="project-image svelte-1ng7ckp" src="aorta.png" alt="Project Preview"> <span class="hover-overlay svelte-1ng7ckp"><span class="font-mono underline krypton text-[#dbdbde]">learn more</span></span></div> <div class="info-cont svelte-1ng7ckp"><div class="project-title krypton svelte-1ng7ckp"><b>biomedical engineering</b></div> <div class="project-desc krypton svelte-1ng7ckp">3D printed aortas</div></div></div></a></div></div></div></div>`;
  pop();
}
export {
  _page as default
};
