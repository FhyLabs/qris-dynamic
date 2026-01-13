const { generateQris } = require("../dist");

(async () => {
  const res = await generateQris({
    qris: "Static QRIS Payload", // Standart EMVCo Bank Indonesia (BI)
    amount: 15000,
    type: "base64",
  });

  console.log(res);
})();