require("./main.scss");
import Handlebars = require("handlebars");

interface Member {
	name: string;
	image: string;
}

interface Seikabutu {
	name: string;
	info: string;
	image: string;
}

class MainComponent {
	private el: Element;
	private abouts: string[] = [
		"なんでも実況Ｊから集結されたプログラマー集団",
		"グレーな仕事も軽々とこなす"
	]
	private goals: string[] = [
		"知名度を上げるアプリの作成",
		"ネット上でプロフェッショナル集団として認知される",
		"依頼された仕事をこなせるようになる"
	]
	private members:Member[] = [
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


	public init() {
		this.el = document.querySelector("my-app");
		Handlebars.registerHelper("addOne",  (index: number) => index + 1);
		this.render();
	}

	private render() {
		this.el.innerHTML = Handlebars.compile(require("./app.html"))({
			abouts: this.abouts,
			goals: this.goals,
			members: this.members
		});
		
	}
}

new MainComponent().init();