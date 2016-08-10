"use strict";
var dateFormat = require('dateformat');
(function (WSResType) {
    WSResType[WSResType["error"] = 0] = "error";
    WSResType[WSResType["initlog"] = 1] = "initlog";
    WSResType[WSResType["log"] = 2] = "log";
    WSResType[WSResType["infolog"] = 3] = "infolog";
})(exports.WSResType || (exports.WSResType = {}));
var WSResType = exports.WSResType;
var Chat = (function () {
    function Chat(wss, collection) {
        this.wss = wss;
        this.collection = collection;
    }
    Chat.prototype.init = function () {
        var _this = this;
        this.wss.on('connection', function (ws) {
            _this.sendLog10(ws);
            _this.onJoin(ws);
            ws.on('message', function (data, flags) { return _this.receiveMsg(ws, data, flags); });
            ws.on("close", function () { return _this.onClose(ws); });
        });
    };
    Chat.prototype.onClose = function (ws) {
        this.wss.clients.forEach(function (ws) {
            // if (myWs !== ws) {
            ws.send(JSON.stringify({
                type: WSResType.infolog,
                value: "誰かが切断しました"
            }));
            // }
        });
    };
    Chat.prototype.onJoin = function (myWs) {
        this.wss.clients.forEach(function (ws) {
            if (myWs !== ws) {
                ws.send(JSON.stringify({
                    type: WSResType.infolog,
                    value: "誰かがアクセスしました"
                }));
            }
        });
    };
    /**
     * DBから10行分のログ送信
     */
    Chat.prototype.sendLog10 = function (ws) {
        this.collection.find().limit(10).sort({ $natural: -1 })
            .toArray(function (err, arr) {
            if (err)
                console.log(err);
            ws.send(JSON.stringify({
                type: WSResType.initlog,
                value: arr && arr.length ? arr : []
            }));
        });
    };
    /**
     * メッセージ受け取ったら、ＤＢに格納＆全員に送信
     */
    Chat.prototype.receiveMsg = function (ws, data, flags) {
        try {
            this.validateMsg(data, flags.binary);
        }
        catch (error) {
            return;
        }
        var log = {
            msg: data,
            date: dateFormat(new Date(), "m/dd HH:MM")
        };
        this.collection.insert(log);
        this.wss.clients.forEach(function (ws) {
            ws.send(JSON.stringify({
                type: WSResType.log,
                value: log
            }));
        });
    };
    Chat.prototype.validateMsg = function (data, isBinary) {
        if (!isBinary && data.length > 20) {
            throw new Error();
        }
        if (isBinary) {
            throw new Error();
        }
    };
    return Chat;
}());
exports.Chat = Chat;
