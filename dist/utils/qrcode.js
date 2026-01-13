import * as QRCode from "qrcode";
export async function generateQRCodeBase64(data) {
    return QRCode.toDataURL(data);
}
