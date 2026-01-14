# Dynamic QRIS

A utility to convert **static QRIS** into **dynamic QRIS** by automatically adding the transaction amount, without altering the original QRIS structure.
Supports **all Indonesian QRIS providers** according to **EMVCo / Bank Indonesia (BI)** standards, including **DANA, GoPay, OVO, ShopeePay, Bank QRIS, and others**.

## Installation

```bash
npm install @fhylabs/qris-dynamic
```

### CommonJS

#### Image

```javascript
const { GenerateQris, ScannerQR } = require("@fhylabs/qris-dynamic");
const path = require("path");

(async () => {
  try {

    // Static QRIS Image
    const qrisData = await ScannerQR.scan(path.join(__dirname, "qrcode.png"));
    
    const res = await GenerateQris({
      qris: qrisData,
      amount: 20000,
      type: "base64"
    });

    console.log(res);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

#### String

```javascript
const { GenerateQris } = require("@fhylabs/qris-dynamic");

(async () => {
  try {

    // Static QRIS String
    const qrisData = "000201010211...";
    
    const res = await GenerateQris({
      qris: qrisData,
      amount: 20000,
      type: "base64"
    });

    console.log(res);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

### ESM

#### Image

```javascript
import { GenerateQris, ScannerQR } from "@fhylabs/qris-dynamic";
import { createCanvas } from "canvas";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

globalThis.document = {
  createElement: (tag) => (tag === "canvas" ? createCanvas(400, 400) : {})
};

(async () => {
  try {

    // Static QRIS Image
    const qrisData = await ScannerQR.scan(path.join(__dirname, "qrcode.png"));

    const res = await GenerateQris({
      qris: qrisData,
      amount: 20000,
      type: "base64"
    });

    console.log(res);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

#### String

```javascript
import { GenerateQris } from "@fhylabs/qris-dynamic";
import { createCanvas } from "canvas";

globalThis.document = {
  createElement: (tag) => (tag === "canvas" ? createCanvas(400, 400) : {})
};

(async () => {
  try {

    // Static QRIS String
    const qrisData = "000201010211...";

    const res = await GenerateQris({
      qris: qrisData,
      amount: 20000,
      type: "base64"
    });

    console.log(res);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

### UMD Browser

#### Image

```html
<script src="https://cdn.jsdelivr.net/gh/FhyLabs/qris-dynamic@v1.0.0/dist/QRISDynamic.umd.js"></script>
<img id="qrImage" alt="QR Code" />
<script>
  (async () => {
    try {
      const qrisData = await QRISDynamic.ScannerQR.scan("qrcode.png");

      const res = await QRISDynamic.GenerateQris({
        qris: qrisData,
        amount: 15000,
        type: "base64"
      });

      console.log(res);
      document.getElementById("qrImage").src = res.code;
    } catch (err) {
      console.error("Error:", err);
    }
  })();
</script>
```

#### String

```html
<script src="https://cdn.jsdelivr.net/gh/FhyLabs/qris-dynamic@v1.0.0/dist/QRISDynamic.umd.js"></script>
<img id="qrImage" alt="QR Code" />
<script>
  (async () => {
    try {
      const qrisData = "000201010211...";

      const res = await QRISDynamic.GenerateQris({
        qris: qrisData,
        amount: 15000,
        type: "base64"
      });

      console.log(res);
      document.getElementById("qrImage").src = res.code;
    } catch (err) {
      console.error("Error:", err);
    }
  })();
</script>
```

## API Reference

### Parameters

| Name     | Type                 | Required | Default | Description                             |
| -------- | -------------------- | -------- | ------- | --------------------------------------- |
| `qris`   | `string`             | ✅        | –       | Static QRIS string (raw QRIS payload)   |
| `amount` | `number`             | ✅        | –       | Transaction amount in IDR (no decimals) |
| `type`   | `"row"` / `"base64"` | ❌        | `"row"` | Output QRIS format                      |

### Output Fields

| Field     | Type     | Description                             |
| --------- | -------- | --------------------------------------- |
| `owner`   | `string` | Merchant / QRIS owner name              |
| `city`    | `string` | Merchant city                           |
| `country` | `string` | ISO country code, default `ID`          |
| `amount`  | `number` | Transaction amount                      |
| `code`    | `string` | Dynamic QRIS (raw string or Base64 PNG) |
| `date`    | `string` | QRIS generation timestamp (ISO 8601)    |

---

### Supported

| Feature   | Description                                 |
| --------- | ------------------------------------------- |
| Standard  | EMVCo / Bank Indonesia (BI)                 |
| Providers | DANA, GoPay, OVO, ShopeePay, Bank QRIS, etc |