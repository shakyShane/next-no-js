const manifest = require("./public/modfed-entry.json");
const entry = manifest.children.find((child) => child.name === "modfed-entry");
const bootstrap = entry.assetsByChunkName.bootstrap[0];
console.log(bootstrap);
