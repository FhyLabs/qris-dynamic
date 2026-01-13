import { crc16 } from "./crc.js";
export class DynamicUtils {
    static setDynamic(qris) {
        return qris.replace(/^000201010211/, "000201010212");
    }
    static setAmount(qris, amount) {
        const amt = amount.toString();
        const field = `54${amt.length.toString().padStart(2, "0")}${amt}`;
        qris = qris.replace(/54\d{2}\d+/, "");
        return qris.replace("5802ID", `${field}5802ID`);
    }
    static recalculateCRC(qris) {
        qris = qris.replace(/6304[A-F0-9]{4}$/, "");
        const payload = qris + "6304";
        return payload + crc16(payload);
    }
}
