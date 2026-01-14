import { Buffer } from "buffer";
if (typeof window !== "undefined" && !window.Buffer) {
    window.Buffer = Buffer;
}
if (typeof globalThis !== "undefined" && !globalThis.Buffer) {
    globalThis.Buffer = Buffer;
}
