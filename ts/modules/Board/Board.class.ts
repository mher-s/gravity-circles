import { IBoard } from './Board';

export class Board {
	CANVAS_ELEMENT: HTMLCanvasElement;
	CTX: CanvasRenderingContext2D | null;

	constructor({ CANVAS_ELEMENT, CTX }: IBoard) {
		this.CANVAS_ELEMENT = CANVAS_ELEMENT;
		this.CTX = CTX;
    }
    
    clear() {

    }
}
