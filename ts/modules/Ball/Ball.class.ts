import { IBall, IBallParams } from './Ball';

export class Ball {
	CANVAS_ELEMENT: HTMLCanvasElement;
	CTX: CanvasRenderingContext2D | null;
	ballParams: IBallParams;

	constructor({ CANVAS_ELEMENT, CTX, ballParams }: IBall) {
		this.CANVAS_ELEMENT = CANVAS_ELEMENT;
		this.CTX = CTX;
		this.ballParams = ballParams;
	}

	draw() {
		this.CTX!.beginPath();
		this.CTX!.shadowColor = this.ballParams.color;
		this.CTX!.shadowBlur = 50;
		this.CTX!.fillStyle = this.ballParams.color;
		this.CTX!.arc(this.ballParams.x, this.ballParams.y, this.ballParams.radius, 0, Math.PI * 2);
		this.CTX!.fill();
	}

	animate() {
		const { width, height } = this.CANVAS_ELEMENT;

		this.ballParams.x += this.ballParams.speedX;
		this.ballParams.y += this.ballParams.speedY;
		this.ballParams.speedY += this.ballParams.gravity;

		if (this.ballParams.x + this.ballParams.radius > width || this.ballParams.x - this.ballParams.radius < 0) {
			this.ballParams.speedX *= -1;
		}

		if (this.ballParams.y + this.ballParams.radius > height) {
			this.ballParams.y = height - this.ballParams.radius;
			this.ballParams.speedY *= -this.ballParams.bounce;

			if (this.ballParams.speedY < 0 && this.ballParams.speedY > -2.2) {
				this.ballParams.speedY = 0;
			}

			if (Math.abs(this.ballParams.speedX) < 1.1) {
				this.ballParams.speedX = 0;
			}

			this.ballParams.speedX > 0 && (this.ballParams.speedX = this.ballParams.speedX - this.ballParams.friction);
			this.ballParams.speedX < 0 && (this.ballParams.speedX = this.ballParams.speedX + this.ballParams.friction);
		}
	}
}
