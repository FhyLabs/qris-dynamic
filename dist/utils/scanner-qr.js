var _a;
import { Jimp } from "jimp";
import QrCode from "qrcode-reader";
const isNode = typeof process !== "undefined" &&
    !!((_a = process.versions) === null || _a === void 0 ? void 0 : _a.node);
export class ScannerQR {
    static async scan(source) {
        let image;
        if (isNode) {
            if (ScannerQR.isUrl(source)) {
                image = await ScannerQR.loadFromUrl(source);
            }
            else {
                const fs = await import("fs/promises");
                const buffer = await fs.readFile(source);
                image = await Jimp.read(buffer);
            }
        }
        else {
            image = await ScannerQR.loadFromUrl(source);
        }
        return new Promise((resolve, reject) => {
            const qr = new QrCode();
            qr.callback = (err, value) => {
                if (err || !(value === null || value === void 0 ? void 0 : value.result)) {
                    reject(new Error("QR code not detected"));
                }
                else {
                    resolve(value.result);
                }
            };
            qr.decode(image.bitmap);
        });
    }
    static async loadFromUrl(url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to load image from URL: ${url}`);
        }
        const buffer = await res.arrayBuffer();
        return Jimp.read(Buffer.from(buffer));
    }
    static isUrl(text) {
        return /^https?:\/\//i.test(text);
    }
}
