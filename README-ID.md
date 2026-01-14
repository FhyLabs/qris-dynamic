# Dynamic QRIS

Sebuah utilitas untuk mengubah **QRIS statis** menjadi **QRIS dinamis** dengan menambahkan jumlah transaksi secara otomatis, tanpa mengubah struktur QRIS asli.
Mendukung **semua penyedia QRIS Indonesia** sesuai standar **EMVCo / Bank Indonesia (BI)**, termasuk **DANA, GoPay, OVO, ShopeePay, Bank QRIS, dan lainnya**.

## Instalasi

```bash
npm install @fhylabs/qris-dynamic
```

### CommonJS

#### Menggunakan Gambar QRIS

```javascript
const { GenerateQris, ScannerQR } = require("@fhylabs/qris-dynamic");
const path = require("path");

(async () => {
  try {

    // QRIS Statis dari Gambar
    const qrisData = await ScannerQR.scan(path.join(__dirname, "qrcode.png"));
    
    const res = await GenerateQris({
      qris: qrisData,
      amount: 20000, // jumlah transaksi
      type: "base64" // output dalam format Base64
    });

    console.log(res);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
})();
```

#### Menggunakan String QRIS

```javascript
const { GenerateQris } = require("@fhylabs/qris-dynamic");

(async () => {
  try {

    // QRIS Statis dalam bentuk string
    const qrisData = "000201010211...";
    
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
```

### ESM (Module)

#### Menggunakan Gambar QRIS

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

    // QRIS Statis dari Gambar
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
```

#### Menggunakan String QRIS

```javascript
import { GenerateQris } from "@fhylabs/qris-dynamic";
import { createCanvas } from "canvas";

globalThis.document = {
  createElement: (tag) => (tag === "canvas" ? createCanvas(400, 400) : {})
};

(async () => {
  try {

    // QRIS Statis dalam bentuk string
    const qrisData = "000201010211...";

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
```

### UMD (Browser)

#### Menggunakan Gambar QRIS

```html
<script src="https://cdn.jsdelivr.net/gh/FhyLabs/qris-dynamic@v1.0.3/dist/QRISDynamic.umd.js"></script>
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
      console.error("Terjadi kesalahan:", err);
    }
  })();
</script>
```

#### Menggunakan String QRIS

```html
<script src="https://cdn.jsdelivr.net/gh/FhyLabs/qris-dynamic@v1.0.3/dist/QRISDynamic.umd.js"></script>
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
      console.error("Terjadi kesalahan:", err);
    }
  })();
</script>
```

## Referensi API

### Parameter

| Nama     | Tipe                 | Wajib | Default | Deskripsi                                  |
| -------- | -------------------- | ----- | ------- | ------------------------------------------ |
| `qris`   | `string`             | ✅     | –       | String QRIS statis (payload asli QRIS)     |
| `amount` | `number`             | ✅     | –       | Jumlah transaksi dalam IDR (tanpa desimal) |
| `type`   | `"row"` / `"base64"` | ❌     | `"row"` | Format output QRIS                         |

### Field Output

| Field     | Tipe     | Deskripsi                                  |
| --------- | -------- | ------------------------------------------ |
| `owner`   | `string` | Nama merchant / pemilik QRIS               |
| `city`    | `string` | Kota merchant                              |
| `country` | `string` | Kode negara ISO, default `ID`              |
| `amount`  | `number` | Jumlah transaksi                           |
| `code`    | `string` | QRIS dinamis (string asli atau PNG Base64) |
| `date`    | `string` | Timestamp pembuatan QRIS (ISO 8601)        |

---

### Didukung

| Fitur    | Deskripsi                                   |
| -------- | ------------------------------------------- |
| Standar  | EMVCo / Bank Indonesia (BI)                 |
| Penyedia | DANA, GoPay, OVO, ShopeePay, Bank QRIS, dll |