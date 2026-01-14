import { Jimp } from "jimp";
import QrCode from "qrcode-reader";

const isNode =
  typeof process !== "undefined" &&
  !!process.versions?.node;

export class ScannerQR {
  static async scan(source: string): Promise<string> {
    let image;

    if (isNode) {
      if (ScannerQR.isUrl(source)) {
        image = await ScannerQR.loadFromUrl(source);
      } else {
        const fs = await import("fs/promises");
        const buffer = await fs.readFile(source);
        image = await Jimp.read(buffer);
      }
    } else {
      image = await ScannerQR.loadFromUrl(source);
    }

    return new Promise((resolve, reject) => {
      const qr = new QrCode();
      qr.callback = (err: unknown, value: any) => {
        if (err || !value?.result) {
          reject(new Error("QR code not detected"));
        } else {
          resolve(value.result);
        }
      };
      qr.decode(image.bitmap);
    });
  }

  static async loadFromUrl(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to load image from URL: ${url}`);
    }
    const buffer = await res.arrayBuffer();
    return Jimp.read(Buffer.from(buffer));
  }

  static isUrl(text: string): boolean {
    return /^https?:\/\//i.test(text);
  }
}
