import * as server from '../entries/pages/blog/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.Cl-vm-DP.js","_app/immutable/chunks/OA5hDYqi.js","_app/immutable/chunks/46PHf2lK.js","_app/immutable/chunks/BOzniV7d.js","_app/immutable/chunks/BmC-ciwT.js","_app/immutable/chunks/VB6oj1HX.js","_app/immutable/chunks/CllbdEkA.js","_app/immutable/chunks/CautmLz1.js","_app/immutable/chunks/CiHQZm9d.js","_app/immutable/chunks/CTCWUTPE.js"];
export const stylesheets = [];
export const fonts = [];
