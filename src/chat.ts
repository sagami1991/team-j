import * as Handlebars from "handlebars";
import {Notify} from "./util";
interface ChatLog {
	msg: string;
	date: string;
}
//ここらへんサーバー側と共有したい
enum WSResType {
	error,
	initlog,
	log,
	infolog
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
		this.ws.onopen = () => this.onOpen();
		this.ws.onmessage = (msgEvent) => this.onReceiveMsg(msgEvent);
		this.ws.onclose = () => this.onClose();
	}
	private onClose() {
		Notify.error("チャットが切断されました。サーバーが落ちた可能性があります");
	}
	private onOpen() {
		this.sendElem.addEventListener("click", e => {
			this.send();
		});
		this.inputElem.addEventListener("keypress", (e) => {
			if (e.keyCode === 13 && !e.shiftKey) {
				this.send();
				e.preventDefault();
			}
		});
	}

	private onReceiveMsg(msgEvent: MessageEvent) {
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
				Notification.requestPermission();
				new Notification("", {body: log.msg});
			}
			break;
		case WSResType.infolog:
			Notify.success(<string> res.value);
			break;
		default:
			break;
		}
	}

	private send() {
		const value = this.inputElem.value;
		if (value) {
			this.tmpSendMsg = value;
			this.ws.send(value);
			this.inputElem.value = "";
		}
	}
}