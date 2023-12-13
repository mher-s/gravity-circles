import { getRandomColorHex } from './getRandomColorHex.js';
import { Ball } from './modules/Ball/Ball.class.js';
import { Board } from './modules/Board/Board.class.js';

let RADIUS: number = 20;
let SPEED_X: number = 6;
let SPEED_Y: number = SPEED_X / 2;
let GRAVITY: number = 0.5;
let FRICTION: number = 0.1;
let BOUNCE: number = 0.7;
let MAX_BALL_COUNT: number = 15;
const balls: Ball[] = [];

const CANVAS_ELEMENT = document.querySelector('canvas') as HTMLCanvasElement;
const CTX = CANVAS_ELEMENT?.getContext('2d');
const ballCounterElement = document.getElementById('ball-counter') as HTMLInputElement;

CANVAS_ELEMENT!.width = window.innerWidth;
CANVAS_ELEMENT!.height = window.innerHeight;

const board = new Board({ CANVAS_ELEMENT, CTX, ballCounterElement });

window.addEventListener('resize', () => board.resize());
CANVAS_ELEMENT?.addEventListener('click', (e) => board.click(balls, MAX_BALL_COUNT, { x: e.offsetX, y: e.offsetY, radius: RADIUS, color: getRandomColorHex(), speedX: SPEED_X, speedY: SPEED_Y, friction: FRICTION, gravity: GRAVITY, bounce: BOUNCE }));

function init() {
	requestAnimationFrame(init);
	board.draw(balls);
}

init();

//! Settings
const clearButton = document.getElementById('clear');
clearButton?.addEventListener('click', () => board.clear(balls));

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
