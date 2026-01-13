# QRIS Dinamis

Utility untuk mengubah **QRIS statis** menjadi **QRIS dinamis** dengan penambahan otomatis jumlah transaksi, tanpa merusak struktur QRIS asli.
Mendukung **semua penyedia QRIS Indonesia** sesuai standar **EMVCo / Bank Indonesia (BI)**, termasuk **DANA, GoPay, OVO, ShopeePay, Bank QRIS, dan lainnya**.

## Instalasi

```bash
npm install @fhylabs/qris-dynamic
```

---

## Penggunaan

### Node.js / CommonJS

```js
const { GenerateQris } = require("@fhylabs/qris-dynamic");

(async () => {
  try {
    const res = await GenerateQris({
      qris: "000201.........",
      amount: 15000,
      type: "base64", // "row" atau "base64"
    });
    console.log("Hasil CommonJS:", res);
  } catch (err) {
    console.error("Error CommonJS:", err);
  }
})();
```

---

### ESM / TypeScript

```ts
import { GenerateQris } from "@fhylabs/qris-dynamic";
import { createCanvas } from "canvas";

// Polyfill canvas untuk Node.js
globalThis.document = {
  createElement: (tag) => (tag === "canvas" ? createCanvas(400, 400) : {}),
};

(async () => {
  try {
    const res = await GenerateQris({
      qris: "000201.........",
      amount: 15000,
      type: "base64", // "row" atau "base64"
    });
    console.log("Hasil ESM:", res);
  } catch (err) {
    console.error("Error ESM:", err);
  }
})();
```

---

### Browser (UMD)

Tambahkan lewat tag `<script>`:

```html
<script src="https://cdn.jsdelivr.net/gh/FhyLabs/qris-dynamic@v1.0.0/dist/QRISDynamic.umd.js"></script>
<script>
  (async () => {
    try {
      const res = await QRISDynamic.GenerateQris({
        qris: "000201.........",
        amount: 15000,
        type: "base64" // "row" atau "base64"
      });
      document.body.innerHTML = `<pre>${JSON.stringify(res, null, 2)}</pre>`;
    } catch (err) {
      console.error("Error UMD:", err);
    }
  })();
</script>
```

---

## Contoh Output

### Jika `type: "base64"`

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

## Referensi API

### Parameter

| Nama     | Tipe                 | Wajib | Default | Deskripsi                                  |
| -------- | -------------------- | ----- | ------- | ------------------------------------------ |
| `qris`   | `string`             | ✅     | –       | String QRIS statis (payload QRIS asli)     |
| `amount` | `number`             | ✅     | –       | Jumlah transaksi dalam IDR (tanpa desimal) |
| `type`   | `"row"` / `"base64"` | ❌     | `"row"` | Format output QRIS                         |

### Field Output

| Field      | Tipe     | Deskripsi                                     |
| ---------- | -------- | --------------------------------------------- |
| `owner`    | `string` | Nama pemilik / merchant QRIS                  |
| `city`     | `string` | Kota merchant                                 |
| `country`  | `string` | Kode negara ISO, default `ID`                 |
| `amount`   | `number` | Jumlah transaksi                              |
| `code`     | `string` | QRIS dinamis (string mentah atau Base64 PNG)  |
| `date`     | `string` | Timestamp pembuatan QRIS (ISO 8601)           |

---

### Didukung

| Fitur    | Deskripsi                                   |
| -------- | ------------------------------------------- |
| Standar  | EMVCo / QRIS Bank Indonesia (BI)            |
| Penyedia | DANA, GoPay, OVO, ShopeePay, Bank QRIS, dll |