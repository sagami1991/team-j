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
			this.onJoin(ws);
			ws.on('message', (data, flags) => this.receiveMsg(ws, data, flags));
			ws.on("close", () => this.onClose(ws));
		});
	}

	private onClose(ws: WSWebSocket) {
		this.wss.clients.forEach(ws => {
			// if (myWs !== ws) {
				ws.send(JSON.stringify({
					type: WSResType.infolog,
					value: "誰かが切断しました"
				}));
			// }
		});
	}

	private onJoin(myWs: WSWebSocket) {
		this.wss.clients.forEach(ws => {
			if (myWs !== ws) {
				ws.send(JSON.stringify({
					type: WSResType.infolog,
					value: "誰かがアクセスしました"
				}));
			}
		});
	}

	/**
	 * DBから10行分のログ送信
	 */
	private sendLog10(ws: WSWebSocket) {
		this.collection.find().limit(10).sort({ $natural: -1 })
		.toArray((err, arr) => {
			if (err) console.log(err);
			ws.send(JSON.stringify({
				type: WSResType.initlog,
				value: arr && arr.length ? arr : []
			}));
		});
	}
	/**
	 * メッセージ受け取ったら、ＤＢに格納＆全員に送信
	 */
	private receiveMsg(ws: WSWebSocket, data: any, flags: {binary: boolean}) {
		try {
			this.validateMsg(data, flags.binary);
		} catch (error) {
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
		if (!isBinary && data.length > 20) {
			throw new Error();
		}
		if (isBinary) {
			throw new Error();
		}
	}
}