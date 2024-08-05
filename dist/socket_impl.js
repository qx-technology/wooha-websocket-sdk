"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebFuket = void 0;
class WebFuket {
    constructor(url, token) {
        this.url = url;
        this.token = token;
        this.onopen = null;
        this.onmessage = null;
        this.onerror = null;
        this.onclose = null;
        const protocols = [];
        if (this.token) {
            protocols.push("token");
            protocols.push(this.token);
        }
        console.log("process.env.UNI_PLATFORM", process.env.UNI_PLATFORM);
        if (process.env.UNI_PLATFORM === "app-plus") {
            //@ts-ignore
            this.socket = uni.connectSocket({
                url: this.url,
                header: { "content-type": "application/json" },
                protocols: protocols,
                method: "GET",
                complete: () => { }
            });
            this.socket.onOpen = (ev) => {
                if (this.onopen)
                    this.onopen(ev);
            };
            this.socket.onMessage = (ev) => {
                if (this.onmessage)
                    this.onmessage(ev);
            };
            this.socket.onError = (ev) => {
                if (this.onerror)
                    this.onerror(ev);
            };
            this.socket.onClose = (ev) => {
                if (this.onclose)
                    this.onclose(ev);
            };
            this.socket.send = (data) => {
                console.log("uni websocket send");
                this.socket.send({ data });
            };
        }
        else {
            this.socket = new WebSocket(this.url, protocols);
            this.socket.onopen = (ev) => {
                if (this.onopen)
                    this.onopen(ev);
            };
            this.socket.onmessage = (ev) => {
                if (this.onmessage)
                    this.onmessage(ev);
            };
            this.socket.onerror = (ev) => {
                if (this.onerror)
                    this.onerror(ev);
            };
            this.socket.onclose = (ev) => {
                if (this.onclose)
                    this.onclose(ev);
            };
        }
    }
    close() {
        this.socket.close();
    }
    send(data) {
        this.socket.send(data);
    }
}
exports.WebFuket = WebFuket;
//# sourceMappingURL=socket_impl.js.map