import { Cell } from "./cell.js";
class Main {
    constructor(gameSize, totalCells, totalMines) {
        this.cells = [];
        this.generateCells(gameSize, totalCells, totalMines);
    }
    generateCells(gameSize, totalCells, totalMines) {
        const root = Math.sqrt(totalCells);
        const panelSize = Math.floor(gameSize / root);
        Cell.size = panelSize - 4;
        const game = document.getElementById('game');
        const titlePanel = document.getElementById('title-panel');
        const infoPanel = document.getElementById('info-panel');
        game.style.gridTemplateColumns = `repeat(${root}, 1fr)`;
        titlePanel.style.width = infoPanel.style.width = game.style.width = game.style.height = `${gameSize}px`;
        titlePanel.style.height = infoPanel.style.height = `${panelSize}px`;
        const mineIndexes = this.randomIntList(totalMines, totalCells);
        for (let row = 0; row < root; row += 1) {
            this.cells[row] = [];
            for (let col = 0; col < root; col += 1) {
                const index = ((row * root) + col) + 1;
                const isMineCell = mineIndexes.indexOf(index) > -1;
                const adjacentMineCount = this.checkAdjacentCells(index, mineIndexes, root);
                const currentCell = this.cells[row][col] = new Cell(isMineCell, adjacentMineCount);
                game.appendChild(currentCell.dom);
            }
        }
    }
    randomIntList(length, limit) {
        const intList = [];
        while (intList.length < length) {
            const randomInt = Math.floor(Math.random() * limit) + 1;
            if (intList.indexOf(randomInt) === -1) {
                intList.push(randomInt);
            }
            ;
        }
        return intList;
    }
    checkAdjacentCells(index, mineIndexes, rowLength) {
        const adjacentIndexes = [
            (index + rowLength),
            (index - rowLength),
            (index + 1),
            (index + rowLength + 1),
            (index - rowLength + 1),
            (index - 1),
            (index + rowLength - 1),
            (index - rowLength - 1)
        ];
        if (index % 10 === 0) {
            adjacentIndexes.splice(2, 3);
        }
        if (index % 10 === 1) {
            adjacentIndexes.splice(5, 3);
        }
        let adjacentMineCount = 0;
        for (const adIndex of adjacentIndexes) {
            if (mineIndexes.indexOf(adIndex) > -1) {
                adjacentMineCount += 1;
            }
        }
        return adjacentMineCount;
    }
}
const game = {
    size: 500,
    totalCells: 100,
    totalMines: 25
};
new Main(game.size, game.totalCells, game.totalMines);
//# sourceMappingURL=main.js.map