export class Ball {
    constructor({ ballParams }) {
        this.ballParams = ballParams;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.shadowColor = this.ballParams.color;
        ctx.shadowBlur = 50;
        ctx.fillStyle = this.ballParams.color;
        ctx.arc(this.ballParams.x, this.ballParams.y, this.ballParams.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    animate({ width, height }) {
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
