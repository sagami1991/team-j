/// <reference path="./custom-typings.d.ts" />

require("expose?humane!humane-js");
require("!style!css!humane-js/themes/libnotify.css");
require("./main.scss");
/** templateエンジン */
import * as Handlebars from "handlebars";
import {GozzilaCanvas} from "./canvas";
import {WebSocketChat} from "./chat.ts";
import 'core-js/es6/array';
import 'core-js/es6/promise';
// 更新日、webpackビルド時に付与される
declare var LAST_UPDATED: string;

interface NotificationOptions {
	dir?: string;
	lang?: string;
	body?: string;
	tag?: string;
	icon?: string;
}
//これ型定義ファイルどこにあるの？
declare class Notification {
	constructor(title: string, options?: NotificationOptions);
	static requestPermission(callback?: (permission: string) => void): void;
}

interface Member {
	name: string;
	image: string;
}

interface Seikabutu {
	name: string;
	info: string;
	image: string;
	url: string;
}

class MainComponent {
	private el: Element;
	private canvas: GozzilaCanvas;
	private chat: WebSocketChat;
	private abouts: string[] = [
		"なんでも実況Ｊから集結されたプログラマー集団",
		"グレーな案件、ハードな仕事など、どんな依頼も引き受け軽々とこなす"
	];

	private goals: string[] = [
		"知名度を上げるアプリの作成",
		"天才プログラマー〝tehu〟を超える",
		"ネット上でプロフェッショナル集団として認知される",
		"依頼された仕事をこなせるようになる"
	];

	private members: Member[] = [
		{
			name: "yasuaki（リーダー）",
			image: "yasuaki.png"
		}, {
			name: "うんち",
			image: "unti.png"
		}, {
			name: "やまだ",
			image: "user.png"
		}
	];

	private seikabutus: Seikabutu[] = [
		{
			name: "なんJワーククラウド",
			info: "なんでも実況Jで今人気のワードを視野的に表示するwebアプリ",
			image: "word_crowd.png",
			url: "http://jcloud.wktk.so/"
		}
	];

	private bosyuYoukou: string[] = [
		"プログラマー（未経験者歓迎）",
		"デザイナー（未経験者歓迎）",
		"マーケティング・広報担当（未経験者歓迎）",
		"営業担当（未経験者歓迎）"
	];

	constructor(canvas: GozzilaCanvas,
				chat: WebSocketChat) {
		this.canvas = canvas;
		this.chat = chat;
	}

	public init() {
		this.el = document.querySelector("my-app");
		Handlebars.registerHelper("addOne",  (index: number) => index + 1);
		this.render();
		this.canvas.init();
		this.chat.init();
	}

	private render() {
		this.el.innerHTML = Handlebars.compile(require("./app.html"))({
			abouts: this.abouts,
			goals: this.goals,
			members: this.members,
			seikabutus: this.seikabutus,
			bosyuYoukou: this.bosyuYoukou,
			lastUpdated: LAST_UPDATED
		});
	}
}

new MainComponent(new GozzilaCanvas(), new WebSocketChat()).init();