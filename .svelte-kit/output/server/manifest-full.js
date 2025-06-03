export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["aorta.png","favicon-old.png","favicon.png","MonaspaceKrypton.ttf","Moonhouse-yE5M.ttf"]),
	mimeTypes: {".png":"image/png",".ttf":"font/ttf"},
	_: {
		client: {start:"_app/immutable/entry/start.C6P8Ex2K.js",app:"_app/immutable/entry/app.Da-6OV4D.js",imports:["_app/immutable/entry/start.C6P8Ex2K.js","_app/immutable/chunks/BPTq2t6a.js","_app/immutable/chunks/46PHf2lK.js","_app/immutable/entry/app.Da-6OV4D.js","_app/immutable/chunks/BEqilbmd.js","_app/immutable/chunks/46PHf2lK.js","_app/immutable/chunks/BmC-ciwT.js","_app/immutable/chunks/OA5hDYqi.js","_app/immutable/chunks/VB6oj1HX.js","_app/immutable/chunks/Csya8ROd.js","_app/immutable/chunks/CTCWUTPE.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/music",
				pattern: /^\/music\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/socials",
				pattern: /^\/socials\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
