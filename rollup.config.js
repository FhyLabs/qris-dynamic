import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default {
  input: "dist/index.js",
  output: [
    { file: "dist/QRISDynamic.cjs.js", format: "cjs", exports: "named" },
    { file: "dist/QRISDynamic.esm.js", format: "esm" },
    { file: "dist/QRISDynamic.umd.js", format: "umd", name: "QRISDynamic", exports: "named" }
  ],
  plugins: [
    nodePolyfills(),
    resolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    terser()
  ]
};
