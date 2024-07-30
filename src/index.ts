import { ChannelType } from "./types";

export class Client {
  private socket: WebSocket | null = null;
  private url: string;
  private token?: string;
  private lastReqTime: number;
  private lastRpsTime: number;

  constructor(url: string, token?: string) {
    this.url = url;
    this.token = token;
    this.lastReqTime = 0;
    this.lastRpsTime = 0;
  }

  start(): void {
    this.stop();

    const now = Date.now();
    this.lastReqTime = now;
    this.lastRpsTime = now;

    const protocols: string[] = [];
    if (this.token) {
      protocols.push("token");
      protocols.push(this.token);
    }
    this.socket = new WebSocket(this.url, protocols);

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onerror = this.onError.bind(this);
  }

  isTimeout(): boolean {
    const now = Date.now();
    if (this.lastReqTime + 30000 > now) {
      return false;
    }
    if (this.lastRpsTime + 30000 > now) {
      return false;
    }
    return true;
  }

  stop(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  private sendMessage(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  private onOpen(): void {}

  private onClose(): void {}

  private onMessage(): void {}

  private onError(): void {}
}
