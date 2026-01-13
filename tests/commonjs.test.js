const { GenerateQris } = require("../dist");

(async () => {
  try {
    const res = await GenerateQris({
      qris: "000201.........",
      amount: 15000,
      type: "base64", // "row" or "base64"
    });
    console.log("CommonJS Test Result:", res);
  } catch (err) {
    console.error("CommonJS Test Error:", err);
  }
})();
