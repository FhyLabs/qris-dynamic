export declare class QrisMetadata {
    private merchant;
    private company;
    private region;
    private country;
    private postalCode;
    private merchantPan;
    private price;
    private tax;
    constructor(merchant: string, company: string, region: string, country: string, postalCode: string, merchantPan: string, price: string | null, tax: string | null);
    getMerchant(): string;
    getCompany(): string;
    getRegion(): string;
    getCountry(): string;
    static extractMetadata(qris: string): QrisMetadata;
}
//# sourceMappingURL=qris-metadata.d.ts.map