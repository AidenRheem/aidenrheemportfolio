import { h as ensure_array_like, d as attr_style, j as attr, e as escape_html, c as pop, p as push, f as stringify } from "../../../chunks/index2.js";
function _page($$payload, $$props) {
  push();
  let spotifyData = null;
  let statusData = "";
  let dotColor = "#a6a6ad";
  let topTracks = [];
  let topArtists = [];
  console.log(dotColor, statusData, spotifyData);
  const each_array = ensure_array_like(topTracks);
  const each_array_1 = ensure_array_like(topArtists);
  $$payload.out += `<div class="min-h-screen flex items-center justify-center"><div class="container max-w-screen-sm border border-overlay2 p-18 relative bg-black/50 backdrop-blur-sm text-[#28282B]"><div class="flex items-center justify-center pb-6"><div class="absolute top-2 left-6 flex items-center text-3xl group hover:text-[#dbdbde]"><a class="moonhouse text-[#a6a6ad] group-hover:text-[#dbdbde]" href="/">a</a> <a class="moonhouse group-hover:text-[#dbdbde]" href="/"${attr_style(`margin-left: -4.5px; color: ${stringify(dotColor)};`)}>.</a></div> <div class="absolute top-4.75 right-6 flex items-center"><span class="krypton text-sm text-[#a6a6ad]" style="margin-left: -2px;"><a href="/projects" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">1.</a> <a href="/socials" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">2.</a> <a href="/music" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">3.</a> <a href="/blog" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">4.</a></span></div></div> <div class="container max-w-screen-sm border border-overlay2 p-2 text-[#28282B]"><div class="container max-w-screen-sm border border-overlay2 p-2 text-[#28282B]"><div class="flex items-center justify-between mb-2"><div class="flex items-end gap-2"><span class="text-lg font-medium text-[#dbdbde] krypton">Top tracks</span> <span class="text-sm mb-2 font-medium text-[#54545c] krypton">(4 weeks)</span></div></div> <div class="tracks-slider svelte-bymdcy"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let track = each_array[$$index];
    $$payload.out += `<a${attr("href", track.url)} target="_blank" rel="noopener noreferrer" class="track-card svelte-bymdcy"><div class="track-overlay-text svelte-bymdcy"><p class="track-name krypton svelte-bymdcy">${escape_html(track.position)}. ${escape_html(track.name)}</p></div> <div class="track-overlay svelte-bymdcy"></div> <img${attr("src", track.imageUrl)}${attr("alt", track.name)} class="track-image svelte-bymdcy"></a>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="container max-w-screen-sm border border-overlay2 p-2 mt-4 text-[#28282B]"><div class="flex items-center justify-between mb-2"><div class="flex items-end gap-2"><span class="text-lg font-medium text-[#dbdbde] krypton">Top artists</span> <span class="text-sm mb-2 font-medium text-[#54545c] krypton">(4 weeks)</span></div></div> <div class="tracks-slider svelte-bymdcy"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let artistItem = each_array_1[$$index_1];
    $$payload.out += `<a${attr("href", artistItem.url)} target="_blank" rel="noopener noreferrer" class="track-card svelte-bymdcy"><div class="track-overlay-text svelte-bymdcy"><p class="track-name krypton svelte-bymdcy">${escape_html(artistItem.artist.name)}</p></div> <div class="track-overlay svelte-bymdcy"></div> <img${attr("src", artistItem.artist.image)}${attr("alt", artistItem.artist.name)} class="track-image svelte-bymdcy"></a>`;
  }
  $$payload.out += `<!--]--></div></div></div></div></div>`;
  pop();
}
export {
  _page as default
};
