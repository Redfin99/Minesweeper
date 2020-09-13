import { CellState } from "./types";

export class Cell {
    public static size: number = 0;
    public static paddedSize: number = 0;

    public hasMine: boolean;
    public adjacentMineCount: number = 0;
    
    public dom: HTMLDivElement;
    private state: CellState = 'hidden'; 

    constructor(hasMine: boolean, adjacentMineCount: number) {
        this.hasMine = hasMine;
        this.adjacentMineCount = adjacentMineCount;
       
        this.dom = document.createElement('div');
        this.dom.className = "cell";

        this.dom.style.width = this.dom.style.height = `${Cell.paddedSize}px`;
        this.dom.style.backgroundSize = `${Cell.paddedSize}px`;

        this.dom.addEventListener('click', () => this.reveal());
        this.dom.addEventListener('auxclick', () => this.flag());
    }
    private reveal() {
        if (this.state !== "hidden") {
            return;
        }
        this.state = 'revealed';

        this.dom.className = "revealed-cell"

        if (this.hasMine) {
            this.dom.className = "mine-cell"
        }
        else if (this.adjacentMineCount === 0) {
            return;
        }
        else {
            this.dom.innerText = this.adjacentMineCount.toString();
        }
    }
    private flag() {
        if (this.state === "revealed") {
            return;
        }
        if (this.state === "flagged") {
            this.state = 'hidden';
            this.dom.className = "cell";
            return;
        }
        this.state = 'flagged';
        this.dom.className = "flag-cell"
    }
}