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
declare const _default: {
    GenerateQris: typeof GenerateQris;
};
export default _default;
//# sourceMappingURL=index.d.ts.map