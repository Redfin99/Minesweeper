import { Cell } from "./cell.js";

import { SquareNumber } from "./types.js";

class Main {
    private cells: Cell[][] = [];
    
    constructor(gameSize: number, totalCells: SquareNumber) {
        this.generateCells(gameSize, totalCells);
    }
    
    private generateCells( gameSize: number, totalCells: SquareNumber): void {
        let root = Math.sqrt(totalCells);
        Cell.size = gameSize / root;

        
        let game: HTMLDivElement = document.getElementById('game') as HTMLDivElement;
        
        for (let row: number = 0; row < root; row += 1) {
            this.cells[row] = [];
            
            for (let col: number = 0; col < root; col += 1) {
                let currentCell: Cell = this.cells[row][col] = new Cell(row, col, false);
                
                game.appendChild(currentCell.dom);
            }
        }
    }
}

new Main(500, 100);