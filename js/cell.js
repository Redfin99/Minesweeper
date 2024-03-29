export class Cell {
    constructor(hasMine, adjacentMineCount) {
        this.adjacentMineCount = 0;
        this.state = 'hidden';
        this.hasMine = hasMine;
        this.adjacentMineCount = adjacentMineCount;
        this.dom = document.createElement('div');
        this.dom.className = "cell";
        this.dom.style.width = this.dom.style.height = this.dom.style.backgroundSize = `${Cell.size}px`;
        this.dom.addEventListener('click', () => this.reveal());
        this.dom.addEventListener('auxclick', () => this.flag());
    }
    reveal() {
        if (this.state !== "hidden") {
            return;
        }
        this.state = 'revealed';
        this.dom.className = "revealed-cell";
        if (this.hasMine) {
            this.dom.className = "mine-cell";
        }
        else if (this.adjacentMineCount > 0) {
            this.dom.innerText = this.adjacentMineCount.toString();
            const textColours = [
                'white', 'blue', 'green', 'red', 'purple', 'maroon', 'teal', 'black', 'grey'
            ];
            this.dom.style.color = textColours[this.adjacentMineCount];
        }
    }
    flag() {
        if (this.state === "hidden") {
            this.state = 'flagged';
            this.dom.className = "flag-cell";
        }
        else if (this.state === "flagged") {
            this.state = 'hidden';
            this.dom.className = "cell";
        }
    }
}
Cell.size = 0;
//# sourceMappingURL=cell.js.map