import {Server as WebSocketServer} from 'ws';
import {Collection} from 'mongodb';
const dateFormat = require('dateformat');

enum WSResType  {
	error,
	initlog,
	log,
};

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
			this.sendLog10(<any>ws);
			ws.on('message', (data, flags) => this.receiveMsg(<any> ws, data, flags));
			ws.on("close", (code) => {
			});
		});
	}

	/**
	 * DBから10行分のログ送信
	 */
	private sendLog10(ws: WebSocket) {
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
	private receiveMsg(ws: WebSocket, data: any, flags: {binary: boolean}) {
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