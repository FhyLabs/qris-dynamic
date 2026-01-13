import { EmvParser } from "../parser/emv-parser.js";

export class QrisMetadata {
  constructor(
    private merchant: string,
    private company: string,
    private region: string,
    private country: string,
    private postalCode: string,
    private merchantPan: string,
    private price: string | null,
    private tax: string | null
  ) {}

  getMerchant() { return this.merchant; }
  getCompany() { return this.company; }
  getRegion() { return this.region; }
  getCountry() { return this.country; }

  static extractMetadata(qris: string): QrisMetadata {
    const emv = EmvParser.parseEmv(qris);

    const merchant = emv["59"] ?? "";
    const region = emv["60"] ?? "";
    const country = emv["58"] ?? "ID";
    const postal = emv["61"] ?? "";

    let company = "";
    let merchantPan = "";

    for (const tag of ["26", "27", "51"]) {
      if (!emv[tag]) continue;

      const nested = EmvParser.parseEmv(emv[tag]);
      company = nested["00"] ?? company;
      merchantPan = nested["01"] ?? nested["02"] ?? merchantPan;

      if (company || merchantPan) break;
    }

    return new QrisMetadata(
      merchant,
      company,
      region,
      country,
      postal,
      merchantPan,
      emv["54"] ?? null,
      emv["55"] ?? null
    );
  }
}
