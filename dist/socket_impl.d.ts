import { PlatformType } from "./types";
export interface WebFuketInterface {
    onopen: ((this: WebFuketInterface, ev: Event) => any) | null;
    onmessage: ((this: WebFuketInterface, ev: MessageEvent) => any) | null;
    onerror: ((this: WebFuketInterface, ev: Event) => any) | null;
    onclose: ((this: WebFuketInterface, ev: CloseEvent) => any) | null;
    close(): void;
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
}
export declare class WebFuket implements WebFuketInterface {
    url: string;
    token?: string;
    socket: any;
    platform: PlatformType;
    constructor(url: string, token?: string, platform?: PlatformType);
    onopen: ((this: WebFuketInterface, ev: Event) => any) | null;
    onmessage: ((this: WebFuketInterface, ev: MessageEvent) => any) | null;
    onerror: ((this: WebFuketInterface, ev: Event) => any) | null;
    onclose: ((this: WebFuketInterface, ev: CloseEvent) => any) | null;
    close(): void;
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
}
