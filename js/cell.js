export class Cell {
    constructor(row, column, hasMine) {
        this.hasMine = hasMine;
        let coord = [row, column];
        let newSize = Cell.size - 4;
        this.dom = document.createElement('div');
        this.dom.className = "cell";
        this.dom.id = this.dom.innerText = "cell: " + coord.toString();
        this.dom.style.width = this.dom.style.height = newSize.toString() + "px";
        this.dom.onclick = () => {
            window.console.log(this);
        };
    }
}
Cell.size = 0;
//# sourceMappingURL=cell.js.map