export type SquareNumber = 16 | 25 | 36 | 49 | 64 | 81 | 100 | 121 | 144;

export type CellState = 'hidden' | 'revealed' | 'flagged';

export interface gameConfig {
    size: number;
    totalCells: SquareNumber;
    totalMines: number;
}