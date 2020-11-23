import { Cell } from "./cell.js";

import { gameConfig, SquareNumber } from "./types.js";

class Main {
    private cells: Cell[][] = [];
    
    constructor(gameSize: number, totalCells: SquareNumber, totalMines: number) {
        this.generateCells(gameSize, totalCells, totalMines);
    }
    
    private generateCells(gameSize: number, totalCells: SquareNumber, totalMines: number): void {
        const root = Math.sqrt(totalCells);
        
        const panelSize = Math.floor(gameSize / root);
        Cell.size = panelSize - 4;

        const game: HTMLDivElement = document.getElementById('game') as HTMLDivElement;
        const titlePanel: HTMLDivElement = document.getElementById('title-panel') as HTMLDivElement;
        const infoPanel: HTMLDivElement = document.getElementById('info-panel') as HTMLDivElement;
        
        game.style.gridTemplateColumns = `repeat(${root}, 1fr)`;
        titlePanel.style.width = infoPanel.style.width = game.style.width = game.style.height = `${gameSize}px`;

        titlePanel.style.height = infoPanel.style.height = `${panelSize}px`;
        
        const mineIndexes = this.randomIntList(totalMines, totalCells);
        
        for (let row: number = 0; row < root; row += 1) {
            this.cells[row] = [];
            
            for (let col: number = 0; col < root; col += 1) {
                const index: number = ((row * root) + col) + 1;
                const isMineCell: boolean = mineIndexes.indexOf(index) > -1;
                const adjacentMineCount: number = this.checkAdjacentCells(index, mineIndexes, root);

                const currentCell: Cell = this.cells[row][col] = new Cell(isMineCell, adjacentMineCount);

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
const game: gameConfig = {
    size: 500,
    totalCells: 100,
    totalMines: 25
}
new Main(game.size, game.totalCells, game.totalMines);