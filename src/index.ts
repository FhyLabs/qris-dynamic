import { QrisMetadata } from "./metadata/qris-metadata";
import { DynamicUtils } from "./utils/dynamic-utils";
import { generateQRCodeBase64 } from "./utils/qrcode";

export type OutputType = "base64" | "row";

export interface GenerateQrisConfig {
  qris: string;
  amount: number;
  type: OutputType;
}

export async function generateQris(config: GenerateQrisConfig) {
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
    owner: meta.getMerchant(),
    city: meta.getRegion(),
    country: meta.getCountry(),
    merchant: meta.getCompany(),
    amount: config.amount,
    code,
    date: new Date().toISOString(),
  };
}

export default { generateQris };
