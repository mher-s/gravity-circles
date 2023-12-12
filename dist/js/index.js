//* Random COlor
import { getRandomColorHex } from './getRandomColorHex.js';
import { Ball } from './modules/Ball/Ball.class.js';
// Get canvas
const CANVAS_ELEMENT = document.querySelector('canvas');
const CTX = CANVAS_ELEMENT === null || CANVAS_ELEMENT === void 0 ? void 0 : CANVAS_ELEMENT.getContext('2d');
// Set canvas sizes
CANVAS_ELEMENT.width = window.innerWidth;
CANVAS_ELEMENT.height = window.innerHeight;
// Variables
let RADIUS = 20;
let SPEED_X = 10;
let SPEED_Y = SPEED_X / 2;
let GRAVITY = 0.5;
let FRICTION = 0.1;
let BOUNCE = 0.7;
let MAX_BALL_COUNT = 15;
const balls = [];
//! Drawing balls in array
function draw() {
    CTX === null || CTX === void 0 ? void 0 : CTX.clearRect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);
    for (let ball of balls) {
        ball.draw(CTX);
        ball.animate(CANVAS_ELEMENT);
    }
}
//! CLear Elements
function clearCanvas() {
    CTX === null || CTX === void 0 ? void 0 : CTX.clearRect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);
    balls.length = 0;
    ballCounterElement.innerHTML = String(0);
}
//! Click listener
CANVAS_ELEMENT === null || CANVAS_ELEMENT === void 0 ? void 0 : CANVAS_ELEMENT.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    if (balls.length < MAX_BALL_COUNT) {
        ballCounterElement.innerHTML = String(balls.length + 1);
        balls.push(new Ball({ ballParams: { x: offsetX, y: offsetY, radius: RADIUS, color: getRandomColorHex(), speedX: SPEED_X, speedY: SPEED_Y, friction: FRICTION, gravity: GRAVITY, bounce: BOUNCE } }));
    }
});
//! Resize listener
window.addEventListener('resize', () => {
    CANVAS_ELEMENT.width = innerWidth;
    CANVAS_ELEMENT.height = innerHeight;
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
const inputs = inputIds.map((id) => document.getElementById(id));
function handleInputChange(e) {
    const target = e.target;
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
const ballCounterElement = document.getElementById('ball-counter');
//! Clear
const closeButton = document.getElementById('clear');
closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', clearCanvas);
//! Reset setting
const resetSettingsElement = document.getElementById('reset');
resetSettingsElement === null || resetSettingsElement === void 0 ? void 0 : resetSettingsElement.addEventListener('click', resetSettings);
function resetSettings() {
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
