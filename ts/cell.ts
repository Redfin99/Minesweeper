export class Cell {
    public static size: number = 0;

    public hasMine: boolean;
    public adjacentMineCount: number;
    
    public dom: HTMLDivElement;

    private isHidden: boolean = true;
    private isFlagged: boolean = false;

    constructor(hasMine: boolean, adjacentMineCount: number) {
        this.hasMine = hasMine;
        this.adjacentMineCount = adjacentMineCount;
       
        this.dom = document.createElement('div');
        this.dom.className = "cell hidden-cell";

        this.dom.style.width = this.dom.style.height = this.dom.style.backgroundSize = `${Cell.size}px`;

        this.dom.addEventListener('click', () => this.reveal());
        this.dom.addEventListener('auxclick', () => this.flag());
    }

    private reveal() {
        if (!this.isHidden || this.isFlagged) {
            return;
        }
        this.isHidden = false;
        this.dom.className = "cell revealed-cell";
        
        if (!this.hasMine) {
            this.dom.innerText = this.adjacentMineCount.toString();
    
            const textColours: string[] = [
                'transparent', 'blue', 'green', 'red', 'purple', 'maroon', 'teal', 'black', 'grey'
            ]
            this.dom.style.color = textColours[this.adjacentMineCount];
        }
        else {
            this.dom.className += " mine-cell";
        }
    }

    private flag() {
        if (!this.isHidden) {
            return;
        }
        this.isFlagged = !this.isFlagged;
        this.dom.className = this.isFlagged ? "cell hidden-cell flag-cell" : "cell hidden-cell";
    }
}
