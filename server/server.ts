import {createServer}  from 'http';
const server = createServer();
import * as express from 'express';
import {MongoClient} from 'mongodb';
import {Chat} from "./chat";
import {Server as WebSocketServer} from 'ws';

function dbinit() {
	return new Promise((resolve) => {
		MongoClient.connect(process.env.MONGODB_URI , (err, db) => {
			if (err) throw err;
			const collection = db.collection("chatlog");
			new Chat(new WebSocketServer({ server: server }), collection).init();
			resolve();
		});
	});
}
const app = express();
app.use((<any>express).logger('dev'));
app.use((<any>express).compress());
app.use(express.static(__dirname + '/../dist'));

dbinit().then(() => {
	server.on('request', app);
	server.listen(process.env.PORT || 3000, function() {
	console.log('Server listening on port %s', server.address().port);
	});
});