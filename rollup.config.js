import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default {
  input: "dist/index.js",
  external: ["fs/promises"],

  output: [
    {
      file: "dist/QRISDynamic.cjs.js",
      format: "cjs",
      exports: "named"
    },
    {
      file: "dist/QRISDynamic.esm.js",
      format: "esm"
    },
    {
      file: "dist/QRISDynamic.umd.js",
      format: "umd",
      name: "QRISDynamic",
      exports: "named",
      globals: {
        "fs/promises": "fs"
      }
    }
  ],

  plugins: [
    nodePolyfills(), 
    resolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    terser()
  ],

  onwarn(warning, warn) {
    if (
      warning.code === "CIRCULAR_DEPENDENCY" ||
      warning.code === "EVAL" ||
      (warning.code === "UNRESOLVED_IMPORT" &&
        warning.source === "fs/promises")
    ) {
      return;
    }
    warn(warning);
  }
};