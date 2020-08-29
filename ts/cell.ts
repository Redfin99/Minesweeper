export class Cell {
    public static size: number = 0;

    public hasMine: boolean;
    public dom: HTMLDivElement;

    // private adjacentMines: number = 0;

    constructor(row: number, column: number, hasMine: boolean) {
        this.hasMine = hasMine;
        
        let coord: [number, number] = [row, column]
        let newSize: number = Cell.size - 4;
       
        this.dom = document.createElement('div');
        this.dom.className = "cell";
        this.dom.id = this.dom.innerText = "cell: " + coord.toString();
        this.dom.style.width = this.dom.style.height = newSize.toString() + "px";

        this.dom.onclick = () => {
            window.console.log(this);
        };
    }
}