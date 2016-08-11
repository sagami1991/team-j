"use strict";
var dateFormat = require('dateformat');
/** 送信する情報のタイプ */
(function (WSResType) {
    WSResType[WSResType["error"] = 0] = "error";
    WSResType[WSResType["initlog"] = 1] = "initlog";
    WSResType[WSResType["log"] = 2] = "log";
    WSResType[WSResType["infolog"] = 3] = "infolog"; // 情報ログ
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
            _this.sendInfoMsgForAll(ws, "誰かがアクセスしました");
            ws.on('message', function (data, flags) { return _this.receiveMsg(ws, data, flags); });
            ws.on("close", function () { return _this.sendInfoMsgForAll(ws, "誰かが切断しました"); });
        });
    };
    /** 通知メッセージを全員に送る */
    Chat.prototype.sendInfoMsgForAll = function (myWs, msg) {
        this.wss.clients.forEach(function (ws) {
            if (myWs !== ws) {
                ws.send(JSON.stringify({
                    type: WSResType.infolog,
                    value: msg
                }));
            }
        });
    };
    /**
     * DBから新しい順に10行分のログ取り出して送信
     */
    Chat.prototype.sendLog10 = function (ws) {
        this.collection.find().limit(10).sort({ $natural: -1 })
            .toArray(function (err, arr) {
            if (err)
                console.log(err);
            ws.send(JSON.stringify({
                type: WSResType.initlog,
                value: arr ? arr.reverse() : []
            }));
        });
    };
    /**
     * メッセージ受け取ったら、ＤＢに格納＆全員に送信
     */
    Chat.prototype.receiveMsg = function (ws, data, flags) {
        if (!this.validateMsg(data, flags.binary)) {
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
    /** バイナリか80文字以上ははじく */
    Chat.prototype.validateMsg = function (data, isBinary) {
        if (!isBinary && data.length > 80) {
            return false;
        }
        if (isBinary) {
            return false;
        }
        return true;
    };
    return Chat;
}());
exports.Chat = Chat;
