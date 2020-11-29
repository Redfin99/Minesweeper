import { gameConfig } from "./types.js";
import { Game } from "./game.js";

new class main {
    constructor() {
        this.createGame();
    }

    private createGame() : void {
        const game: gameConfig = {
            size: 500,
            totalCells: 100,
            totalMines: 25
        }

        new Game(game.size, game.totalCells, game.totalMines);
    }
}
