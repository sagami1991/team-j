

export class GozzilaCanvas {
	public static imageMap:{
		gozzila: HTMLImageElement,
		missile: HTMLImageElement,
		bakuhatu: HTMLImageElement,
		gozzilaAttack: HTMLImageElement
	};

	public static canvasHeight: number;
	public static canvasWidth: number;

	private canvasElm: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private missiles: Missile[] = [];
	private gozzila: Gozzila;
	private timer: number;


	public init() {
		this.canvasElm = <HTMLCanvasElement> document.querySelector("#canvas");
		if(window.location.href.indexOf("godzilla") !== - 1) {
			this.canvasElm.style.zIndex = "1";
			this.canvasElm.style.opacity = "1";
			(<HTMLElement>document.querySelector("my-app")).style.display = "none";
		}
		this.ctx = this.canvasElm.getContext('2d');
		GozzilaCanvas.canvasWidth = window.innerWidth;
		GozzilaCanvas.canvasHeight = window.innerHeight;
		this.sizeFix();
		this.gozzila = new Gozzila();
		this.loader().then(()=> {
			this.gozzila.image = GozzilaCanvas.imageMap.gozzila;
			window.addEventListener('click', (e) => this.spawnMissile(e) );
			this.timer = window.setInterval(()=> this.draw(), 30);
		});
	}

	/** 画像を読み込む（非同期なのでpromiseで待つ） */
	private loader(): Promise<void> {
		const images = [
			"./assets/gozzila.png",
			"./assets/missile.png",
			"./assets/bakuhatu.png",
			"./assets/gozzila_attack.png"
		];

		return Promise.all(images.map((src)=>{
			return new Promise<HTMLImageElement>(reslve => {
				let image = new Image();
				image.addEventListener("load", () => {
					reslve(image);
				});
				image.src = src;
			});
		})).then((imageElms)=> {
			GozzilaCanvas.imageMap = {
				gozzila: imageElms[0],
				missile: imageElms[1],
				bakuhatu: imageElms[2],
				gozzilaAttack: imageElms[3]
			}
		})
	}

	/** canvasの大きさをwindowsの大きさにする */
	private sizeFix() {
		this.ctx.canvas.width = GozzilaCanvas.canvasWidth;
		this.ctx.canvas.height = GozzilaCanvas.canvasHeight;
	}
	/** 下からのY座標を上からのY座標に変更 */
	public static convertY(y: number) {
		return GozzilaCanvas.canvasHeight - y;
	}
	/** ミサイルを出現させる（ゴジラ領域を除く） */
	private spawnMissile(e: MouseEvent) {
		if(e.clientX > 240 || e.clientY < GozzilaCanvas.canvasHeight - 240) {
			this.missiles.push(new Missile(e.clientX, e.clientY, 0, GozzilaCanvas.canvasHeight))
		}
	}

	/** 描写 */
	private draw() {
		// console.log(this.missiles.length);
		this.missiles = this.missiles.filter((missile) => missile !== undefined);
		this.ctx.clearRect(0, 0 , GozzilaCanvas.canvasWidth, GozzilaCanvas.canvasHeight);
		this.ctx.drawImage(this.gozzila.image, -80, GozzilaCanvas.canvasHeight-200, 256, 256);
		this.gozzila.attack(this.missiles, this.ctx);
		for (let i = this.missiles.length-1; i > -1; i--) {
			const missile = this.missiles[i];
			missile.decide();
			missile.move();
			this.ctx.save();
			this.ctx.translate(missile.x, missile.y); 
			this.ctx.rotate(missile.angle); 
			this.ctx.drawImage(missile.image, 0, 0);
			this.ctx.restore();
			
			if(missile._stateType === MissileState.dead) {
				delete this.missiles[i]
			}
			
		}
	}
}
class Gozzila {
	/** ビームが発射される座標 yは下から*/
	private static Beams:{x: number, y:number}[] = [
		{x:30,y:131},
		{x:47,y:115},
		{x:61,y:93},
		{x:74,y:69},
		{x:79,y:79},
		{x:55,y:192},
	]

	/** ミサイルの存在数ごとのビームのターゲット */
	private static targetMap:{targetLength:number, targets:number[]}[] = [
		{
			targetLength: 0,
			targets: []
		},{
			targetLength: 1,
			targets:[0,0,0,0,0,0]
		},{
			targetLength: 2,
			targets:[0,1,0,1,0,1]
		},{
			targetLength: 3,
			targets:[0,1,2,0,1,2]
		},{
			targetLength: 4,
			targets:[0,1,2,3,0,1]
		},{
			targetLength: 5,
			targets:[0,1,2,3,4,0]
		},{
			targetLength: Infinity,
			targets:[0,1,2,3,4,5]
		},
	];

	public image: HTMLImageElement;
	/** ビームを発射 */
	public attack(missiles: Missile[], ctx: CanvasRenderingContext2D) {
		this.image = missiles.length? GozzilaCanvas.imageMap.gozzilaAttack : GozzilaCanvas.imageMap.gozzila;
		const {targets} = Gozzila.targetMap.find(target => target.targetLength >= missiles.length);
		Gozzila.Beams.forEach((beam,i) => {
			if(targets[i] !== undefined) {
				const target = missiles[targets[i]];
				if(target.stateType === MissileState.normal) target.hp--;
				this.drawBeam(ctx, beam.x, beam.y, target.x, target.y)
			}
		})

	}

	/** 直線を描写する */
	private drawBeam(ctx: CanvasRenderingContext2D, beginX: number, beginY: number, toX: number, toY: number) {
		
		toY = GozzilaCanvas.canvasHeight - toY;
		const y3 = beginX < toX ? GozzilaCanvas.canvasWidth : 0;
		const endY = (toY + 18 - beginY) * (y3 - beginX) / (toX - beginX) + beginY;
		ctx.strokeStyle = "#317cff";
		ctx.shadowColor = "#317cff";
		ctx.shadowBlur  = 8;
		ctx.beginPath();
		ctx.moveTo(beginX, GozzilaCanvas.canvasHeight - beginY);
		ctx.lineTo(y3, GozzilaCanvas.convertY(endY));
		ctx.closePath();
		ctx.stroke();
		ctx.shadowBlur  = 0;
	}


}

enum MissileState {
	normal,
	broking,
	dead
}
class Missile {
	private _image: HTMLImageElement; 
	get image() {
		return this._image;
	}
	private _x: number;
	get x() {
		return this._x;
	}
	private _y: number;
	get y() {
		return this._y;
	}
	public hp: number;
	private targetX: number;
	private targetY: number;
	private dx: number;
	private dy: number;
	private _angle: number;
	get angle() {
		return this._angle
	}

	public _stateType: number;
	get stateType() {
		return this._stateType;
	}
	constructor(x: number, y: number, targetX: number, targetY: number) {
		this._x = x;
		this._y = y;
		this.targetX = targetX;
		this.targetY = targetY;
		this.dx = (targetX - x) / 500;
		this.dy = (targetY - y) / 500;
		this._stateType = MissileState.normal;
		this._image = GozzilaCanvas.imageMap.missile;
		this.hp = 40;
	}

	public move() {
		if(this._stateType !== MissileState.normal) return;
		this._angle = Math.PI + Math.atan2(Math.abs(this.targetX - this.x) , this.targetY - this.y);
		this._x += this.dx;
		this._y += this.dy;
		if(this.dx < 12 && this.dy < 12) {
			this.dx *= 1.08;
			this.dy *= 1.08;
		}
	}

	/** 状態判定 */
	public decide() {
		switch (this._stateType) {
		case MissileState.normal:
			if(this.hp <= 0 || (this._x < 150 && this._y > GozzilaCanvas.canvasHeight - 150)) {
				this._stateType = MissileState.broking;
				this.hp = 0;
				this._image = GozzilaCanvas.imageMap.bakuhatu;
			}
			break;
		case MissileState.broking:
			this.hp--;
			if(this.hp < -10) {
				this._stateType = MissileState.dead;
			}
			break;
		case MissileState.dead:
			break;
		}
	}
}