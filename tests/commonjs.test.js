const { GenerateQris, ScannerQR } = require("../dist/index.js");
import { createCanvas } from "canvas";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

globalThis.document = {
  createElement: (tag) => (tag === "canvas" ? createCanvas(400, 400) : {})
};

(async () => {
  try {

	// QRIS Statis Image
    const qrisData = await ScannerQR.scan(path.join(__dirname, "qrcode.png"));

    const res = await GenerateQris({
      qris: qrisData,
      amount: 20000,
      type: "base64"
    });

    console.log(res);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
})();