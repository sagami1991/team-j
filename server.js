
const express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/dist'));
app.listen(app.get('port'), function() {
  console.log('Server listening on port %s', app.get('port'));
});


// const WebSocketServer = require('ws').Server;
// const wss = new WebSocketServer({ port: 8081 });
// const WSResType = {
// 	error: 0,
// 	initlog: 1,
// 	log: 2
// };
// const dateFormat = require('dateformat');
// let chatLog = [];
// wss.on('connection', (ws) => {

// 	ws.send(JSON.stringify({
// 		type: WSResType.initlog,
// 		value: chatLog
// 	}));
// 	ws.on('message', (data, flags) => {
// 		if(!flags.binary && data.length > 20){
// 			ws.send(JSON.stringify({
// 				type: WSResType.error,
// 				value: "20文字以上は入力できません"
// 			}));
// 		}
// 		if(chatLog.length >= 10) chatLog.shift();
// 		const log = {
// 			msg: data,
// 			date: dateFormat(new Date(),"m/dd HH:MM")
// 		};
// 		chatLog.push(log);
// 		wss.clients.forEach(ws => {
// 			ws.send(JSON.stringify({
// 				type: WSResType.log,
// 				value: log
// 			}));
// 		})
// 	});

// 	ws.on("close", (code) => {
// 	})

// });
