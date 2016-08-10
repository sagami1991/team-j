import * as Handlebars from "handlebars";
interface NotificationOptions {
	dir?: string;
	lang?: string;
	body?: string;
	tag?: string;
	icon?: string;
}
//これ型定義ファイルどこにある？
declare class Notification {
	constructor(title: string, options?: NotificationOptions);
	static requestPermission(callback?: (permission: string) => void): void;
}

interface ChatLog {
	msg: string;
	date: string;
}
enum WSResType {
	error,
	initlog,
	log
}

/** チャットのレス */
interface WSRes {
	type: number;
	value: string | ChatLog | ChatLog[];
}

export class WebSocketChat {
	private static logsTmpl = Handlebars.compile(`
		{{#logs}}
		<li class="chat-log">
			<div class="chat-date">{{date}}</div>
			<div class="chat-msg">{{msg}}</div>
		</li>
		{{/logs}}
	`);
	private ws: WebSocket;
	private logs: ChatLog[] = [];
	private logElem: HTMLElement;
	private inputElem: HTMLTextAreaElement;
	private sendElem: HTMLElement;
	private tmpSendMsg: string;
	public init() {
		this.ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
		this.inputElem = <HTMLTextAreaElement> document.querySelector("#chat");
		this.logElem = <HTMLElement> document.querySelector(".chat-logs");
		this.sendElem = <HTMLElement> document.querySelector(".chat-send");
		this.ws.onopen = () => {
			this.sendElem.addEventListener("click", e => {
				this.send();
			});
			this.inputElem.addEventListener("keypress", (e) => {
				if (e.keyCode === 13 && !e.shiftKey) {
					this.send();
					e.preventDefault();
				}
			});
		};
		this.ws.onmessage = (msgEvent) => {
			const res = <WSRes>JSON.parse(msgEvent.data);
			switch (res.type) {
			case WSResType.initlog:
				this.logs = <ChatLog[]> res.value;
				this.logElem.innerHTML =  WebSocketChat.logsTmpl({logs: this.logs});
				break;
			case WSResType.log:
				const log = <ChatLog>res.value;
				this.logs.push(log);
				if (this.logs.length > 10) this.logs.shift();
				this.logElem.innerHTML =  WebSocketChat.logsTmpl({logs: this.logs});
				if (this.tmpSendMsg !== log.msg) {
					new Notification("", {body: log.msg});
				}
				break;
			default:
				break;
			}
		};


	}
	private send() {
		const value = this.inputElem.value;
		if (value) {
			this.tmpSendMsg = value;
			this.ws.send(value);
			this.inputElem.value = "";
		}
	}
	private render() {

	}


}