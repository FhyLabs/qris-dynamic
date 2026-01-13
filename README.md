# QRIS Dynamic

A utility to convert **static QRIS** into **dynamic QRIS** with automatic transaction amount insertion, without breaking the original QRIS structure.
Supports **all Indonesian QRIS providers** based on **EMVCo / Bank Indonesia (BI)** standards (DANA, GoPay, OVO, ShopeePay, Bank QRIS, etc).

## Installation

```bash
npm install @fhylabs/qris-dynamic
```

---

## Usage

### Node.js / CommonJS

```js
const { generateQris } = require("@fhylabs/qris-dynamic/QRISDynamic.cjs.js");

(async () => {
  const result = await generateQris({
    qris: "00020101021126590013ID.CO.GOPAY.WWW0215...",
    amount: 15000,
    type: "base64", // "row" or "base64"
  });

  console.log(result);
})();
```

---

### ESM / TypeScript

```ts
import { generateQris } from "@fhylabs/qris-dynamic/QRISDynamic.esm.js";

const result = await generateQris({
  qris: "00020101021240560011ID.DANA.WWW...",
  amount: 15000,
  type: "row", // "row" or "base64"
});

console.log(result);
```

---

### Browser (UMD)

Include via `<script>` tag:

```html
<script src="node_modules/@fhylabs/qris-dynamic/QRISDynamic.umd.js"></script>
<script>
  (async () => {
    const result = await QRISDynamic.generateQris({
      qris: "00020101021240560011ID.DANA.WWW...",
      amount: 15000,
      type: "row"
    });
    console.log(result);
  })();
</script>
```

---

## Output

### Example when `type: "base64"`

```json
{
  "owner": "FITRI HY",
  "city": "Tangerang Selatan",
  "country": "ID",
  "merchant": "ID.DANA.WWW",
  "amount": 15000,
  "code": "...",
  "date": "2026-01-13T08:30:00.000Z"
}
```

---

## API Reference

### Parameters

| Name     | Type                 | Required | Default | Description                           |
| -------- | -------------------- | -------- | ------- | ------------------------------------- |
| `qris`   | `string`             | ✅        | –       | Static QRIS string (raw QRIS payload) |
| `amount` | `number`             | ✅        | –       | Transaction amount (IDR, no decimals) |
| `type`   | `"row"` / `"base64"` | ❌        | `"row"` | Output QRIS format                    |

### Output Fields

| Field      | Type     | Description                             |
| ---------- | -------- | --------------------------------------- |
| `owner`    | `string` | Merchant / QRIS owner name              |
| `city`     | `string` | Merchant city                           |
| `country`  | `string` | ISO country code, default `ID`          |
| `merchant` | `string` | QRIS provider (DANA, GoPay, OVO, etc.)  |
| `amount`   | `number` | Transaction amount                      |
| `code`     | `string` | Dynamic QRIS (raw string or Base64 PNG) |
| `date`     | `string` | QRIS generation timestamp (ISO 8601)    |

---

### Supported

| Feature   | Description                                 |
| --------- | ------------------------------------------- |
| Standard  | EMVCo / QRIS BI                             |
| Providers | DANA, GoPay, OVO, ShopeePay, Bank QRIS, etc |

---

💡 **Note:**

* For **Node.js**, import `QRISDynamic.cjs.js`.
* For **ESM / TypeScript**, import `QRISDynamic.esm.js`.
* For **browser**, use `QRISDynamic.umd.js`.

Ini **menghilangkan semua kebingungan import/export**, dan siap untuk **semua environment**.