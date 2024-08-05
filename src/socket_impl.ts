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

    if (process.env.UNI_PLATFORM === "app-plus") {
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
    this.socket.send(data);
  }
}
