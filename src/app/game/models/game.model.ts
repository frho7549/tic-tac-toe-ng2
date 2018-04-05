export interface IBoard
{
  rows: Array<IRow>;
  currentPlayer: Player;
}


export interface IRow
{
  cells: Array<ICell>;
}


export interface ICell
{
  state: CellState;
  isWinningCell: boolean;
}


export enum CellState
{
  EMPTY = 0,
  MINE = 1,
  THEIRS = -1
}


export enum Player
{
  PLAYER1 = 1,
  PLAYER2 = 2
}


export enum GameState
{
  XTURN = 0,
  OTURN = 1,
  WON = 2,
  DRAW = 3
}
