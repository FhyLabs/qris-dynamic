const fs = require("fs");
const path = require("path");

const rootPackage = path.resolve(__dirname, "../package.json");
const distPackage = path.resolve(__dirname, "../dist/package.json");

const raw = fs.readFileSync(rootPackage, "utf-8");
const pkg = JSON.parse(raw);

const distPkg = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description || "Convert static QRIS to dynamic QRIS",
  main: "index.js",
  types: "index.d.ts",
  keywords: pkg.keywords || ["qris", "dynamic", "static", "qr-code", "payment"],
  author: pkg.author || "Fhylabs <cs@fhylabs.com>",
  license: pkg.license || "MIT",
  engines: pkg.engines || { node: ">=18" }
};

fs.writeFileSync(distPackage, JSON.stringify(distPkg, null, 2));
console.log("dist/package.json created.");
