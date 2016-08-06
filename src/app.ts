require("./main.scss");

class MainComponent {
	private el: Element;
	constructor(){

	}

	public init() {
		this.el = document.querySelector("my-app")
		this.render();
	}

	private render() {
		this.el.innerHTML = require("./app.html");
		
	}
}

new MainComponent().init();