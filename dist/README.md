# QRIS Dynamic

A utility to convert **static QRIS** into **dynamic QRIS** with automatic transaction amount insertion, without breaking the original QRIS structure.
Supports **all Indonesian QRIS providers** based on **EMVCo / Bank Indonesia (BI)** standards, including **DANA, GoPay, OVO, ShopeePay, Bank QRIS, and more**.

## Installation

```bash
npm install @fhylabs/qris-dynamic
```

---

## Usage

### Node.js / CommonJS

```js
const { GenerateQris } = require("@fhylabs/qris-dynamic");

(async () => {
  try {
    const res = await GenerateQris({
      qris: "000201.........",
      amount: 15000,
      type: "base64", // "row" or "base64"
    });
    console.log("CommonJS Result:", res);
  } catch (err) {
    console.error("CommonJS Error:", err);
  }
})();
```

---

### ESM / TypeScript

```ts
import { GenerateQris } from "@fhylabs/qris-dynamic";
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
```

---

### Browser (UMD)

Include via `<script>` tag:

```html
<script src="https://cdn.jsdelivr.net/gh/FhyLabs/qris-dynamic@v1.0.0/dist/QRISDynamic.umd.js"></script>
<script>
  (async () => {
    try {
      const res = await QRISDynamic.GenerateQris({
        qris: "000201.........",
        amount: 15000,
        type: "base64" // "row" or "base64"
      });
      document.body.innerHTML = `<pre>${JSON.stringify(res, null, 2)}</pre>`;
    } catch (err) {
      console.error("UMD Error:", err);
    }
  })();
</script>
```

---

## Output Example

### When `type: "base64"`

```json
{
  "owner": "FITRI HERMA YANTI",
  "city": "Kota Tangerang",
  "country": "ID",
  "amount": 15000,
  "code": "...",
  "date": "2026-01-13T08:30:00.000Z"
}
```

---

## API Reference

### Parameters

| Name     | Type                 | Required | Default | Description                             |
| -------- | -------------------- | -------- | ------- | --------------------------------------- |
| `qris`   | `string`             | ✅        | –       | Static QRIS string (raw QRIS payload)   |
| `amount` | `number`             | ✅        | –       | Transaction amount in IDR (no decimals) |
| `type`   | `"row"` / `"base64"` | ❌        | `"row"` | Output QRIS format                      |

### Output Fields

| Field      | Type     | Description                                |
| ---------- | -------- | ------------------------------------------ |
| `owner`    | `string` | Merchant / QRIS owner name                 |
| `city`     | `string` | Merchant city                              |
| `country`  | `string` | ISO country code, default `ID`             |
| `amount`   | `number` | Transaction amount                         |
| `code`     | `string` | Dynamic QRIS (raw string or Base64 PNG)    |
| `date`     | `string` | QRIS generation timestamp (ISO 8601)       |

---

### Supported

| Feature   | Description                                 |
| --------- | ------------------------------------------- |
| Standard  | EMVCo / QRIS Bank Indonesia (BI)            |
| Providers | DANA, GoPay, OVO, ShopeePay, Bank QRIS, etc |