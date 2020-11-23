import { CellState } from "./types";

export class Cell {
    public static size: number = 0;

    public hasMine: boolean;
    public adjacentMineCount: number = 0;
    
    public dom: HTMLDivElement;
    private state: CellState = 'hidden'; 

    constructor(hasMine: boolean, adjacentMineCount: number) {
        this.hasMine = hasMine;
        this.adjacentMineCount = adjacentMineCount;
       
        this.dom = document.createElement('div');
        this.dom.className = "cell";

        this.dom.style.width = this.dom.style.height = this.dom.style.backgroundSize = `${Cell.size}px`;

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
        else if (this.adjacentMineCount > 0) {
            this.dom.innerText = this.adjacentMineCount.toString();

            const textColours: string[] = [
                'white', 'blue', 'green', 'red', 'purple', 'maroon', 'teal', 'black', 'grey'
            ]
            this.dom.style.color = textColours[this.adjacentMineCount];
        }
    }
    private flag() {
        if (this.state === "hidden") {
            this.state = 'flagged';
            this.dom.className = "flag-cell"
        }
        else if (this.state === "flagged") {
            this.state = 'hidden';
            this.dom.className = "cell";
        }
    }
}