"use strict";
var dateFormat = require('dateformat');
var WSResType;
(function (WSResType) {
    WSResType[WSResType["error"] = 0] = "error";
    WSResType[WSResType["initlog"] = 1] = "initlog";
    WSResType[WSResType["log"] = 2] = "log";
})(WSResType || (WSResType = {}));
;
var Chat = (function () {
    function Chat(wss, collection) {
        this.wss = wss;
        this.collection = collection;
    }
    Chat.prototype.init = function () {
        var _this = this;
        this.logs = [];
        this.collection.find().limit(10).sort({ $natural: -1 }).toArray(function (err, arr) {
            if (arr && arr.length)
                _this.logs = arr;
        });
        this.wss.on('connection', function (ws) {
            ws.send(JSON.stringify({
                type: WSResType.initlog,
                value: _this.logs
            }));
            ws.on('message', function (data, flags) { return _this.receiveMsg(ws, data, flags); });
            ws.on("close", function (code) {
            });
        });
    };
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
