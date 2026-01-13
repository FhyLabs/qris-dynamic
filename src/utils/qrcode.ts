import * as QRCode from "qrcode";

export async function generateQRCodeBase64(data: string): Promise<string> {
  return QRCode.toDataURL(data);
}
