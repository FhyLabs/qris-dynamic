import { QrisMetadata } from "./metadata/qris-metadata.js";
import { DynamicUtils } from "./utils/dynamic-utils.js";
import { generateQRCodeBase64 } from "./utils/qrcode.js";

export type OutputType = "base64" | "row";

export interface GenerateQrisConfig {
  qris: string;
  amount: number;
  type: OutputType;
}

export async function GenerateQris(config: GenerateQrisConfig) {
  let qris = config.qris;

  qris = DynamicUtils.setDynamic(qris);
  qris = DynamicUtils.setAmount(qris, config.amount);
  qris = DynamicUtils.recalculateCRC(qris);

  const meta = QrisMetadata.extractMetadata(qris);

  const code =
    config.type === "base64"
      ? await generateQRCodeBase64(qris)
      : qris;

  return {
    merchant: meta.getMerchant(),
    city: meta.getRegion(),
    country: meta.getCountry(),
    amount: config.amount,
    code,
    date: new Date().toISOString(),
  };
}

export default { GenerateQris };
