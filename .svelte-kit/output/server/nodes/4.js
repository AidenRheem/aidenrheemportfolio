import * as universal from '../entries/pages/blog/_slug_/_page.ts.js';
import * as server from '../entries/pages/blog/_slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/[slug]/+page.ts";
export { server };
export const server_id = "src/routes/blog/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.DFoAPU26.js","_app/immutable/chunks/OA5hDYqi.js","_app/immutable/chunks/46PHf2lK.js","_app/immutable/chunks/BOzniV7d.js","_app/immutable/chunks/BmC-ciwT.js","_app/immutable/chunks/VB6oj1HX.js","_app/immutable/chunks/CiHQZm9d.js","_app/immutable/chunks/CTCWUTPE.js","_app/immutable/chunks/CllbdEkA.js","_app/immutable/chunks/Csya8ROd.js","_app/immutable/chunks/C5_Q2o1K.js","_app/immutable/chunks/CautmLz1.js"];
export const stylesheets = ["_app/immutable/assets/4.5QzORMdU.css"];
export const fonts = [];
