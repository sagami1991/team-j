"use strict"

const server = require('http').createServer()
const express = require('express');
const app = express();
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/dist'));

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server: server });
const WSResType = {
	error: 0,
	initlog: 1,
	log: 2
};
const dateFormat = require('dateformat');
let chatLog = [];
wss.on('connection', (ws) => {

	ws.send(JSON.stringify({
		type: WSResType.initlog,
		value: chatLog
	}));
	ws.on('message', (data, flags) => {
		if(!flags.binary && data.length > 20){
			ws.send(JSON.stringify({
				type: WSResType.error,
				value: "20文字以上は入力できません"
			}));
		}
		if(chatLog.length >= 10) chatLog.shift();
		const log = {
			msg: data,
			date: dateFormat(new Date(),"m/dd HH:MM")
		};
		chatLog.push(log);
		wss.clients.forEach(ws => {
			ws.send(JSON.stringify({
				type: WSResType.log,
				value: log
			}));
		})
	});

	ws.on("close", (code) => {
	})

});

server.on('request', app);
server.listen(process.env.PORT || 80, function() {
  console.log('Server listening on port %s', server.address().port);
});
