import { IBallParams } from '../Ball/Ball';
import { Ball } from '../Ball/Ball.class.js';
import { IBoard } from './Board';

export class Board {
	CANVAS_ELEMENT: HTMLCanvasElement;
	CTX: CanvasRenderingContext2D | null;
	ballCounterElement: HTMLInputElement;

	constructor({ CANVAS_ELEMENT, CTX, ballCounterElement }: IBoard) {
		this.CANVAS_ELEMENT = CANVAS_ELEMENT;
		this.CTX = CTX;
		this.ballCounterElement = ballCounterElement;
	}

	click(balls: Ball[], maxBalls: number, ballParams: IBallParams) {
		console.log(ballParams, balls, maxBalls);

		if (balls.length < maxBalls) {
			this.ballCounterElement.innerHTML = String(balls.length + 1);
			balls.push(new Ball({ ballParams }));
		}
	}

	resize() {
		this.CANVAS_ELEMENT.width = innerWidth;
		this.CANVAS_ELEMENT.height = innerHeight;
	}

	draw(balls: Ball[]) {
		this.CTX?.clearRect(0, 0, this.CANVAS_ELEMENT!.width, this.CANVAS_ELEMENT!.height);

		for (let ball of balls) {
			ball.draw(this.CTX);
			ball.animate(this.CANVAS_ELEMENT);
		}
	}

	clear(balls: Ball[]): void {
		this.CTX?.clearRect(0, 0, this.CANVAS_ELEMENT!.width, this.CANVAS_ELEMENT!.height);
		balls.length = 0;
		this.ballCounterElement.innerHTML = String(0);
	}
}
