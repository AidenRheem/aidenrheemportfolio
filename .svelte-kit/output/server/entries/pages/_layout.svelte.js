import "clsx";
import { c as pop, p as push } from "../../chunks/index2.js";
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<div class="relative min-h-screen w-full h-full"><div class="absolute inset-0 w-full h-full z-0"></div> <div class="min-h-screen relative z-10">`;
  children($$payload);
  $$payload.out += `<!----></div></div>`;
  pop();
}
export {
  _layout as default
};
