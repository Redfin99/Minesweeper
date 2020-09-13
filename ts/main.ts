import { Cell } from "./cell.js";

import { SquareNumber } from "./types.js";

class Main {
    private cells: Cell[][] = [];
    
    constructor(gameSize: number, totalCells: SquareNumber, totalMines: number) {
        this.generateCells(gameSize, totalCells, totalMines);
    }
    
    private generateCells( gameSize: number, totalCells: SquareNumber, totalMines: number): void {
        const root = Math.sqrt(totalCells);
        
        Cell.size = (gameSize / root);
        Cell.paddedSize = (Cell.size - 4);

        const game: HTMLDivElement = document.getElementById('game') as HTMLDivElement;
        
        const mineIndexes = this.randomIntList(totalMines, totalCells);
        
        for (let row: number = 0; row < root; row += 1) {
            this.cells[row] = [];
            
            for (let col: number = 0; col < root; col += 1) {
                const index: number = ((row * root) + col) + 1;
                const isMineCell: boolean = mineIndexes.indexOf(index) > -1;
                const adjacentMineCount: number = this.checkAdjacentCells(index, mineIndexes, root);

                let currentCell: Cell = this.cells[row][col] = new Cell(isMineCell, adjacentMineCount);

                game.appendChild(currentCell.dom);
            }
        }
    }

    private randomIntList(length: number, limit: number): number[] {
        const intList: number[] = [];
        while(intList.length < length){
            const randomInt = Math.floor(Math.random() * limit) + 1;
            if(intList.indexOf(randomInt) === -1) {
                intList.push(randomInt);
            };
        }
        return intList;
    }

    private checkAdjacentCells(index: number, mineIndexes: number[], rowLength: number): number {
        const adjacentIndexes: number[] = [
            (index + rowLength),
            (index - rowLength),
            (index + 1),
            (index + rowLength + 1),
            (index - rowLength + 1),
            (index - 1),
            (index + rowLength - 1),
            (index - rowLength - 1)
        ]
        if (index % 10 === 0) {
            adjacentIndexes.splice(2, 3)
        }
        if (index % 10 === 1) {
            adjacentIndexes.splice(5, 3)
        }
        let adjacentMineCount: number = 0;
        for (const adIndex of adjacentIndexes) {
            if (mineIndexes.indexOf(adIndex) > -1) {
                adjacentMineCount += 1;
            }
        }
        return adjacentMineCount;
    }
}
new Main(500, 100, 25);