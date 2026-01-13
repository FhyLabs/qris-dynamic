# QRIS Dynamic

Alat untuk mengubah **QRIS statis** menjadi **QRIS dinamis** dengan penambahan nominal transaksi otomatis, tanpa merusak struktur QRIS asli.
Mendukung **semua penyedia QRIS Indonesia** berdasarkan standar **EMVCo / Bank Indonesia (BI)**

(DANA, GoPay, OVO, ShopeePay, Bank QRIS, dll).

## Instalasi

```bash
npm install @fhylabs/qris-dynamic
```

## Penggunaan

### CommonJS (Node.js)

```js
const { generateQris } = require("@fhylabs/qris-dynamic");

(async () => {
  const result = await generateQris({
    qris: "00020101021126590013ID.CO.GOPAY.WWW0215...",
    amount: 15000,
    type: "base64", // "row" atau "base64"
  });

  console.log(result);
})();
```

### TypeScript / ESM

```ts
import { generateQris } from "@fhylabs/qris-dynamic";

const result = await generateQris({
  qris: "00020101021240560011ID.DANA.WWW...",
  amount: 15000,
  type: "row", // "row" atau "base64"
});

console.log(result);
```

## Output

### Jika `type: "base64"`

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

## Referensi API

### Parameter

| Nama     | Tipe                 | Wajib | Default | Deskripsi                              |
| -------- | -------------------- | ----- | ------- | -------------------------------------- |
| `qris`   | `string`             | ✅     | –       | QRIS statis (payload QRIS mentah)      |
| `amount` | `number`             | ✅     | –       | Nominal transaksi (IDR, tanpa desimal) |
| `type`   | `"row"` / `"base64"` | ❌     | `"row"` | Format output QRIS                     |

### Field Output

| Field      | Tipe     | Deskripsi                                    |
| ---------- | -------- | -------------------------------------------- |
| `owner`    | `string` | Nama merchant / pemilik QRIS                 |
| `city`     | `string` | Kota merchant                                |
| `country`  | `string` | Kode negara (ISO), default `ID`              |
| `merchant` | `string` | Penyedia QRIS (DANA, GoPay, OVO, dll)        |
| `amount`   | `number` | Nominal transaksi                            |
| `code`     | `string` | QRIS dinamis (string mentah atau Base64 PNG) |
| `date`     | `string` | Waktu generate QRIS (ISO 8601)               |

### Mendukung

| Fitur    | Keterangan                                  |
| -------- | ------------------------------------------- |
| Standar  | EMVCo / QRIS BI                             |
| Provider | DANA, GoPay, OVO, ShopeePay, Bank QRIS, dll |