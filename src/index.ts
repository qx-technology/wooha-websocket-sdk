export interface Client {
  start(): Client;
  stop(): Client;
}

class ClientProvider implements Client {
  private socket: WebSocket | null = null;
  private url: string;
  private token?: string;
  private lastReqTime: number;
  private lastRpsTime: number;
  private autoConn: boolean;

  constructor(url: string, token?: string) {
    this.url = url;
    this.token = token;
    this.lastReqTime = 0;
    this.lastRpsTime = 0;
    this.autoConn = true;
  }

  start(): Client {
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

    return this;
  }

  stop(autoConn: boolean = true): Client {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      console.log("Websocket已断开");
    }
    this.autoConn = autoConn;
    return this;
  }

  private onOpen(): void {
    console.log("Websocket已连接");
  }

  private onClose(): void {
    this.stop();
    if (this.autoConn) {
      setTimeout(() => {
        this.start();
      }, 1000);
    }
  }

  private onMessage(event: MessageEvent): void {
    console.log("Websocket收到消息:", event.data);
  }

  private onError(event: Event): void {
    console.error("Websocket连接出现错误:", event);
  }

  private isTimeout(): boolean {
    const now = Date.now();
    if (this.lastReqTime + 30000 > now) {
      return false;
    }
    if (this.lastRpsTime + 30000 > now) {
      return false;
    }
    return true;
  }
}

export function newClient(url: string, token?: string): Client {
  return new ClientProvider(url, token);
}
