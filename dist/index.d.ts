import "./polyfill.js";
import { QrisMetadata } from "./metadata/qris-metadata.js";
import { DynamicUtils } from "./utils/dynamic-utils.js";
import { generateQRCodeBase64 } from "./utils/qrcode.js";
import { ScannerQR } from "./utils/scanner-qr.js";
export type OutputType = "base64" | "row";
export interface GenerateQrisConfig {
    qris: string;
    amount: number;
    type: OutputType;
}
export declare function GenerateQris(config: GenerateQrisConfig): Promise<{
    merchant: string;
    city: string;
    country: string;
    amount: number;
    code: string;
    date: string;
}>;
export { ScannerQR, QrisMetadata, DynamicUtils, generateQRCodeBase64 };
//# sourceMappingURL=index.d.ts.map