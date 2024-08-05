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
        if (process.env.UNI_PLATFORM === "app-plus") {
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