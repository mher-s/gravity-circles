//* Random COlor
import { getRandomColorHex } from './getRandomColorHex.js';

//* Interfaces
import { IBall } from './interfaces';

// Get canvas
const CANVAS_ELEMENT = document.querySelector('canvas') as HTMLCanvasElement;
const CTX = CANVAS_ELEMENT?.getContext('2d');

// Set canvas sizes
CANVAS_ELEMENT!.width = window.innerWidth;
CANVAS_ELEMENT!.height = window.innerHeight;

// Variables
let RADIUS: number = 20;
let SPEED_X: number = 6;
let SPEED_Y: number = SPEED_X / 2;
let GRAVITY: number = 0.5;
let FRICTION: number = 0.1;
let BOUNCE: number = 0.7;
let MAX_BALL_COUNT: number = 15;
const balls: Ball[] = [];

//! Ball instance
class Ball implements IBall {
	x: number;
	y: number;
	color!: string;
	speedX: number;
	speedY: number;
	friction: number;
	gravity: number;
	bounce: number;
	radius: number;

	constructor(x: number, y: number, radius: number, color: string, speedX: number, speedY: number, friction: number, gravity: number, bounce: number) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.speedX = speedX;
		this.speedY = speedY;
		this.friction = friction;
		this.gravity = gravity;
		this.bounce = bounce;
		this.radius = radius;
	}
}

//! Drawing balls in array
function draw(): void {
	CTX?.clearRect(0, 0, CANVAS_ELEMENT!.width, CANVAS_ELEMENT!.height);
	for (let ball of balls) {
		drawBall(ball);
		animateBall(ball);
	}
}

//! Drawing current ball
function drawBall(ball: Ball) {
	CTX?.beginPath();
	CTX!.shadowColor = ball.color; //! Bad property but cool :D
	CTX!.shadowBlur = 50; //! Bad property but cool :D
	CTX!.fillStyle = ball.color;
	CTX?.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	CTX?.fill();
}

//! Animate current ball
function animateBall(ball: Ball) {
	ball.x += ball.speedX;
	ball.y += ball.speedY;
	ball.speedY += ball.gravity;

	//? Change direction of ball in X
	if (ball.x + ball.radius > CANVAS_ELEMENT!.width || ball.x - ball.radius < 0) {
		ball.speedX *= -1;
	}

	//? Bounce when hit bottom the ball
	if (ball.y + ball.radius > CANVAS_ELEMENT!.height) {
		ball.y = CANVAS_ELEMENT!.height - ball.radius;
		ball.speedY *= -ball.bounce;

        //? Stop Y
		if (ball.speedY < 0 && ball.speedY > -2) {
			ball.speedY = 0;
		}

        //? Stop X
		if (Math.abs(ball.speedX) < 1) {
			ball.speedX = 0;
		}

		//? Stop Ball step by step
		ball.speedX > 0 && (ball.speedX = ball.speedX - ball.friction);
		ball.speedX < 0 && (ball.speedX = ball.speedX + ball.friction);
	}
}

//! CLear Elements
function clearCanvas():void {
	CTX?.clearRect(0, 0, CANVAS_ELEMENT!.width, CANVAS_ELEMENT!.height);
	balls.length = 0;
	ballCounterElement.innerHTML = String(0);
}

//! Click listener
CANVAS_ELEMENT?.addEventListener('click', (e) => {
	const { offsetX, offsetY } = e;

	if (balls.length < MAX_BALL_COUNT) {
		ballCounterElement.innerHTML = String(balls.length + 1);
		balls.push(new Ball(offsetX, offsetY, RADIUS, getRandomColorHex(), SPEED_X, SPEED_Y, FRICTION, GRAVITY, BOUNCE));
	}
});

//! Resize listener
window.addEventListener('resize', () => {
	CANVAS_ELEMENT!.width = innerWidth;
	CANVAS_ELEMENT!.height = innerHeight;
});

//! Init
function init() {
	requestAnimationFrame(init);
	draw();
}

requestAnimationFrame(init);

//! Input changes
const inputIds = ['radius', 'speed', 'gravity', 'friction', 'bounce', 'max-ball-count'];
const defaultSettingsByOrder = [20, 6, 0.5, 0.1, 0.7, 15];
const inputs = inputIds.map((id) => document.getElementById(id) as HTMLInputElement);

function handleInputChange(e: Event) {
	const target = e.target as HTMLInputElement;
	const value = Number(target.value);

	switch (target.id) {
		case 'radius':
			RADIUS = value;
			break;
		case 'speed':
			SPEED_X = value;
			break;
		case 'gravity':
			GRAVITY = value;
			break;
		case 'friction':
			FRICTION = value;
			break;
		case 'bounce':
			BOUNCE = value;
			break;
		case 'max-ball-count':
			MAX_BALL_COUNT = value;
			break;
		default:
			break;
	}
}

inputs.forEach((input) => {
	input.addEventListener('input', handleInputChange);
});

//! Set ball count
const ballCounterElement = document.getElementById('ball-counter') as HTMLInputElement;

//! Clear
const closeButton = document.getElementById('clear');
closeButton?.addEventListener('click', clearCanvas);

//! Reset setting
const resetSettingsElement = document.getElementById('reset');
resetSettingsElement?.addEventListener('click', resetSettings);

function resetSettings(): void {
	RADIUS = 20;
	SPEED_X = 6;
	GRAVITY = 0.5;
	FRICTION = 0.1;
	BOUNCE = 0.7;
	MAX_BALL_COUNT = 15;

	inputs.forEach((field, index) => {
		field.value = String(defaultSettingsByOrder[index]);
	});
}
