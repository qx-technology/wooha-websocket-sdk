//@ts-ignore
import socket from "plus-websocket";

export interface WebFuketInterface {
  onopen: ((this: WebFuketInterface, ev: Event) => any) | null;
  onmessage: ((this: WebFuketInterface, ev: MessageEvent) => any) | null;
  onerror: ((this: WebFuketInterface, ev: Event) => any) | null;
  onclose: ((this: WebFuketInterface, ev: CloseEvent) => any) | null;
  close(): void;
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
}

export class WebFuket implements WebFuketInterface {
  url: string;
  token?: string;
  socket: any;
  constructor(url: string, token?: string) {
    this.url = url;
    this.token = token;
    this.onopen = null;
    this.onmessage = null;
    this.onerror = null;
    this.onclose = null;

    const protocols: string[] = [];
    if (this.token) {
      protocols.push("token");
      protocols.push(this.token);
    }

    console.log("process.env['UNI_PLATFORM']", process.env['UNI_PLATFORM']);
    if (process.env['UNI_PLATFORM'] === "app-plus") {
      //@ts-ignore
      Object.assign(uni, socket);
      //@ts-ignore
      this.socket = uni.connectSocket({
        url: this.url,
        header: { "content-type": "application/json" },
        protocols: protocols,
        method: "GET",
        complete: () => {},
        success: () => {
          setTimeout(() => {
            if (this.onopen) this.onopen(null!);
          }, 100);
        },
        fail: () => {
          setTimeout(() => {
            if (this.onclose) this.onclose(null!);
          }, 100);
        }
      });
      this.socket.onOpen(() => {
        if (this.onopen) this.onopen(null!);
      });
      this.socket.onMessage((ev: any) => {
        if (this.onmessage) this.onmessage(ev);
      });
      this.socket.onError((ev: any) => {
        if (this.onerror) this.onerror(ev);
      });
      this.socket.onClose((ev: any) => {
        if (this.onclose) this.onclose(ev);
      });
    } else {
      this.socket = new WebSocket(this.url, protocols);
      this.socket.onopen = (ev: Event) => {
        if (this.onopen) this.onopen(ev);
      };
      this.socket.onmessage = (ev: MessageEvent) => {
        if (this.onmessage) this.onmessage(ev);
      };
      this.socket.onerror = (ev: Event) => {
        if (this.onerror) this.onerror(ev);
      };
      this.socket.onclose = (ev: CloseEvent) => {
        if (this.onclose) this.onclose(ev);
      };
    }
  }

  onopen: ((this: WebFuketInterface, ev: Event) => any) | null;
  onmessage: ((this: WebFuketInterface, ev: MessageEvent) => any) | null;
  onerror: ((this: WebFuketInterface, ev: Event) => any) | null;
  onclose: ((this: WebFuketInterface, ev: CloseEvent) => any) | null;

  close(): void {
    this.socket.close();
  }
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (process.env['UNI_PLATFORM'] === "app-plus") {
      this.socket.send({ data });
      return;
    }
    this.socket.send(data);
  }
}
