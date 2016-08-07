require("./main.scss");
/** templateエンジン */
import * as Handlebars from "handlebars";
import {GozzilaCanvas} from "./canvas";
import 'core-js/es6/array';
import 'core-js/es6/promise';
// 更新日、webpackビルド時に付与される
declare var LAST_UPDATED: string;

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

	private abouts: string[] = [
		"なんでも実況Ｊから集結されたプログラマー集団",
		"グレーな案件、ハードな仕事など、どんな依頼も引き受け軽々とこなす"
	]

	private goals: string[] = [
		"知名度を上げるアプリの作成",
		"天才プログラマー〝tehu〟を超える",
		"ネット上でプロフェッショナル集団として認知される",
		"依頼された仕事をこなせるようになる"
	]

	private members: Member[] = [
		{
			name:"yasuaki（リーダー）",
			image: "yasuaki.png"
		}, {
			name:"うんち",
			image: "unti.png"
		}, {
			name:"やまだ",
			image: "user.png"
		}
	]

	private seikabutus: Seikabutu[] = [
		{
			name: "なんJワーククラウド",
			info: "なんでも実況Jで今人気のワードを視野的に表示するwebアプリ",
			image: "word_crowd.png",
			url: "http://jcloud.wktk.so/"
		}
	]

	constructor(canvas: GozzilaCanvas) {
		this.canvas = canvas;
	}

	public init() {
		this.el = document.querySelector("my-app");
		this.canvas.init();
		// templateエンジンに関数を登録
		Handlebars.registerHelper("addOne",  (index: number) => index + 1);
		this.render();
	}

	private render() {
		this.el.innerHTML = Handlebars.compile(require("./app.html"))({
			abouts: this.abouts,
			goals: this.goals,
			members: this.members,
			seikabutus: this.seikabutus,
			lastUpdated: LAST_UPDATED
		});
		
	}
}

new MainComponent(new GozzilaCanvas()).init();