import { Cell } from "./cell.js";
class Main {
    constructor(gameSize, totalCells) {
        this.cells = [];
        this.generateCells(gameSize, totalCells);
    }
    generateCells(gameSize, totalCells) {
        let root = Math.sqrt(totalCells);
        Cell.size = gameSize / root;
        let game = document.getElementById('game');
        for (let row = 0; row < root; row += 1) {
            this.cells[row] = [];
            for (let col = 0; col < root; col += 1) {
                let currentCell = this.cells[row][col] = new Cell(row, col, false);
                game.appendChild(currentCell.dom);
            }
        }
    }
}
new Main(500, 100);
//# sourceMappingURL=main.js.map