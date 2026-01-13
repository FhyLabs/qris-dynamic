import { GenerateQris } from "../dist/QRISDynamic.esm.js";
import { createCanvas } from "canvas";

globalThis.document = {
  createElement: (tag) => {
    if (tag === "canvas") return createCanvas(400, 400);
    return {};
  }
};

(async () => {
  try {
    const res = await GenerateQris({
      qris: "000201.........",
      amount: 15000,
      type: "base64", // "row" or "base64"
    });
    console.log("ESM Test Result:", res);
  } catch (err) {
    console.error("ESM Test Error:", err);
  }
})();
