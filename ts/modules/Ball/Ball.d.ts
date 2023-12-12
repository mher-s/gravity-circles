export interface IBallParams {
	x: number;
	y: number;
	color: string;
	speedX: number;
	speedY: number;
	friction: number;
	gravity: number;
	bounce: number;
    radius: number;
}

export interface IBall {
	ballParams: IBallParams;
}
