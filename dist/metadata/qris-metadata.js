import { EmvParser } from "../parser/emv-parser.js";
export class QrisMetadata {
    constructor(merchant, company, region, country, postalCode, merchantPan, price, tax) {
        this.merchant = merchant;
        this.company = company;
        this.region = region;
        this.country = country;
        this.postalCode = postalCode;
        this.merchantPan = merchantPan;
        this.price = price;
        this.tax = tax;
    }
    getMerchant() { return this.merchant; }
    getCompany() { return this.company; }
    getRegion() { return this.region; }
    getCountry() { return this.country; }
    static extractMetadata(qris) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const emv = EmvParser.parseEmv(qris);
        const merchant = (_a = emv["59"]) !== null && _a !== void 0 ? _a : "";
        const region = (_b = emv["60"]) !== null && _b !== void 0 ? _b : "";
        const country = (_c = emv["58"]) !== null && _c !== void 0 ? _c : "ID";
        const postal = (_d = emv["61"]) !== null && _d !== void 0 ? _d : "";
        let company = "";
        let merchantPan = "";
        for (const tag of ["26", "27", "51"]) {
            if (!emv[tag])
                continue;
            const nested = EmvParser.parseEmv(emv[tag]);
            company = (_e = nested["00"]) !== null && _e !== void 0 ? _e : company;
            merchantPan = (_g = (_f = nested["01"]) !== null && _f !== void 0 ? _f : nested["02"]) !== null && _g !== void 0 ? _g : merchantPan;
            if (company || merchantPan)
                break;
        }
        return new QrisMetadata(merchant, company, region, country, postal, merchantPan, (_h = emv["54"]) !== null && _h !== void 0 ? _h : null, (_j = emv["55"]) !== null && _j !== void 0 ? _j : null);
    }
}
