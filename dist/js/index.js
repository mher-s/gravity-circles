//* Random COlor
import { getRandomColorHex } from './getRandomColorHex.js';
// Get canvas
const CANVAS_ELEMENT = document.querySelector('canvas');
const CTX = CANVAS_ELEMENT === null || CANVAS_ELEMENT === void 0 ? void 0 : CANVAS_ELEMENT.getContext('2d');
// Set canvas sizes
CANVAS_ELEMENT.width = window.innerWidth;
CANVAS_ELEMENT.height = window.innerHeight;
// Variables
let RADIUS = 20;
let SPEED_X = 6;
let SPEED_Y = SPEED_X / 2;
let GRAVITY = 0.5;
let FRICTION = 0.1;
let BOUNCE = 0.7;
const balls = [];
class Ball {
    constructor(x, y, radius, color, speedX, speedY, friction, gravity, bounce) {
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
function draw() {
    CTX === null || CTX === void 0 ? void 0 : CTX.clearRect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);
    for (let ball of balls) {
        drawBall(ball);
        animateBall(ball);
    }
}
function drawBall(ball) {
    CTX === null || CTX === void 0 ? void 0 : CTX.beginPath();
    CTX.shadowColor = ball.color; //! Bad property but cool :D
    CTX.shadowBlur = 50; //! Bad property but cool :D
    CTX.fillStyle = ball.color;
    CTX === null || CTX === void 0 ? void 0 : CTX.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    CTX === null || CTX === void 0 ? void 0 : CTX.fill();
}
function animateBall(ball) {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    ball.speedY += ball.gravity;
    if (ball.x + ball.radius > CANVAS_ELEMENT.width || ball.x - ball.radius < 0) {
        ball.speedX *= -1;
    }
    if (ball.y + ball.radius > CANVAS_ELEMENT.height) {
        ball.y = CANVAS_ELEMENT.height - ball.radius;
        ball.speedY *= -ball.bounce;
        if (ball.speedY < 0 && ball.speedY > -2.1) {
            ball.speedY = 0;
        }
        if (Math.abs(ball.speedX) < 1.1) {
            ball.speedX = 0;
        }
        //* Stop Ball step by step
        ball.speedX > 0 && (ball.speedX = ball.speedX - ball.friction);
        ball.speedX < 0 && (ball.speedX = ball.speedX + ball.friction);
    }
}
//! Click listener
CANVAS_ELEMENT === null || CANVAS_ELEMENT === void 0 ? void 0 : CANVAS_ELEMENT.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    if (balls.length < 15) {
        ballCounterElement.innerHTML = String(balls.length + 1);
        balls.push(new Ball(offsetX, offsetY, RADIUS, getRandomColorHex(), SPEED_X, SPEED_Y, FRICTION, GRAVITY, BOUNCE));
    }
});
//! Resize listener
window.addEventListener('resize', () => {
    CANVAS_ELEMENT.width = innerWidth;
    CANVAS_ELEMENT.height = innerHeight;
});
let lastTime = 1;
function init(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    requestAnimationFrame(init);
    draw();
}
requestAnimationFrame(init);
//! Input changes
const inputIds = ['radius', 'speed', 'gravity', 'friction', 'bounce'];
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
        default:
            break;
    }
}
inputs.forEach((input) => {
    input.addEventListener('input', handleInputChange);
});
//! Set ball count
const ballCounterElement = document.getElementById('ball-counter');
