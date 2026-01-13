import { GenerateQris } from "../dist/index.js";
import { createCanvas } from "canvas";

// Polyfill for canvas in Node.js
globalThis.document = {
  createElement: (tag) => (tag === "canvas" ? createCanvas(400, 400) : {}),
};

(async () => {
  try {
    const res = await GenerateQris({
      qris: "000201.........",
      amount: 15000,
      type: "base64", // "row" or "base64"
    });
    console.log("ESM Result:", res);
  } catch (err) {
    console.error("ESM Error:", err);
  }
})();