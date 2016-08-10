/// <reference types="ws" />
import {Server as WebSocketServer, WSWebSocket} from 'ws';
import {Collection} from 'mongodb';
const dateFormat = require('dateformat');
export enum WSResType {
	error,
	initlog,
	log,
	infolog
}

interface ChatLog {
	msg: string;
	date: string;
}

export class Chat {
	private wss: WebSocketServer;
	private collection: Collection;
	constructor(wss: WebSocketServer,
				collection: Collection) {
		this.wss = wss;
		this.collection = collection;
	}

	public init() {
		this.wss.on('connection', (ws) => {
			this.sendLog10(ws);
			this.sendInfoMsgForAll(ws, "誰かがアクセスしました");
			ws.on('message', (data, flags) => this.receiveMsg(ws, data, flags));
			ws.on("close", () => this.sendInfoMsgForAll(ws, "誰かが切断しました"));
		});
	}
	private sendInfoMsgForAll(myWs: WSWebSocket, msg: string) {
		this.wss.clients.forEach(ws => {
			if (myWs !== ws) {
				ws.send(JSON.stringify({
					type: WSResType.infolog,
					value: msg
				}));
			}
		});
	}

	/**
	 * DBから10行分のログ取り出して送信
	 */
	private sendLog10(ws: WSWebSocket) {
		this.collection.find().limit(10).sort({ $natural: -1 })
		.toArray((err, arr) => {
			if (err) console.log(err);
			ws.send(JSON.stringify({
				type: WSResType.initlog,
				value: arr && arr.length ? arr.reverse() : []
			}));
		});
	}
	/**
	 * メッセージ受け取ったら、ＤＢに格納＆全員に送信
	 */
	private receiveMsg(ws: WSWebSocket, data: any, flags: {binary: boolean}) {
		if (!this.validateMsg(data, flags.binary)) {
			return;
		}
		const log = {
			msg: data,
			date: dateFormat(new Date(), "m/dd HH:MM")
		};
		this.collection.insert(log);
		this.wss.clients.forEach(ws => {
			ws.send(JSON.stringify({
				type: WSResType.log,
				value: log
			}));
		});
	}

	private validateMsg(data: string, isBinary: boolean, ) {
		if (!isBinary && data.length > 80) {
			return false;
		}
		if (isBinary) {
			return false;
		}
	}
}