export class Cell {
    constructor(hasMine, adjacentMineCount) {
        this.adjacentMineCount = 0;
        this.state = 'hidden';
        this.hasMine = hasMine;
        this.adjacentMineCount = adjacentMineCount;
        this.dom = document.createElement('div');
        this.dom.className = "cell";
        this.dom.style.width = this.dom.style.height = `${Cell.paddedSize}px`;
        this.dom.style.backgroundSize = `${Cell.paddedSize}px`;
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
        else if (this.adjacentMineCount === 0) {
            return;
        }
        else {
            this.dom.innerText = this.adjacentMineCount.toString();
        }
    }
    flag() {
        if (this.state === "revealed") {
            return;
        }
        if (this.state === "flagged") {
            this.state = 'hidden';
            this.dom.className = "cell";
            return;
        }
        this.state = 'flagged';
        this.dom.className = "flag-cell";
    }
}
Cell.size = 0;
Cell.paddedSize = 0;
//# sourceMappingURL=cell.js.map