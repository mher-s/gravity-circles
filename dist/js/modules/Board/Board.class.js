import { Ball } from '../Ball/Ball.class.js';
export class Board {
    constructor({ CANVAS_ELEMENT, CTX, ballCounterElement }) {
        this.CANVAS_ELEMENT = CANVAS_ELEMENT;
        this.CTX = CTX;
        this.ballCounterElement = ballCounterElement;
    }
    click(balls, maxBalls, ballParams) {
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
    draw(balls) {
        var _a;
        (_a = this.CTX) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.CANVAS_ELEMENT.width, this.CANVAS_ELEMENT.height);
        for (let ball of balls) {
            ball.draw(this.CTX);
            ball.animate(this.CANVAS_ELEMENT);
        }
    }
    clear(balls) {
        var _a;
        (_a = this.CTX) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.CANVAS_ELEMENT.width, this.CANVAS_ELEMENT.height);
        balls.length = 0;
        this.ballCounterElement.innerHTML = String(0);
    }
}
