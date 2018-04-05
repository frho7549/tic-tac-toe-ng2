import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CellState, GameState, IBoard, ICell, IRow, Player } from '../models/game.model';

import 'rxjs/add/observable/of';


@Injectable()
export class GameService
{
  private _board: IBoard;
  private _winRows: IRow[] = [];
  private _gameState: GameState;
  private _state: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(GameState.XTURN);
  
  
  constructor()
  {
  }
  
  
  startNewGame(): Observable<IBoard>
  {
    console.log('--> startNewGame()');
    return this.reset();
  }
  
  
  private createWinRows()
  {
    this._winRows = [];
    const winCols = [{cells: []}, {cells: []}, {cells: []}];
    const winDiagonals = [{cells: []}, {cells: []}];
    
    for (let i = 0; i < this._board.rows.length; i++)
    {
      const row = this._board.rows[i];
      
      // rows
      this._winRows.push(row);
      
      
      for (let j = 0; j < row.cells.length; j++)
      {
        // columns
        winCols[j].cells.push(row.cells[j]);
      }
      
      
      // diagonals
      winDiagonals[0].cells.push(this._board.rows[i].cells[i]);
      winDiagonals[1].cells.push(this._board.rows[i].cells[2 - i]);
    }
    
    
    this._winRows = this._winRows.concat(winCols, winDiagonals);
    
    console.log(this._winRows);
    
    
  }
  
  
  private doTurn(cell: ICell)
  {
    if (cell.state === CellState.EMPTY && this._gameState !== GameState.WON && this._gameState !== GameState.DRAW)
    {
      switch (this._board.currentPlayer)
      {
        case Player.PLAYER1:
          cell.state = CellState.MINE;
          this._board.currentPlayer = Player.PLAYER2;
          break;
    
        case Player.PLAYER2:
          cell.state = CellState.THEIRS;
          this._board.currentPlayer = Player.PLAYER1;
          break;
      }
      const won = this.hasWon();
      if (won)
      {
        this.setGameState(GameState.WON);
        return;
      }
      const draw = false;
      if (draw)
      {
        this.setGameState(GameState.DRAW);
        return;
      }
      
      if (this._gameState === GameState.XTURN)
      {
        this.setGameState(GameState.OTURN);
        return;
      }
      if (this._gameState === GameState.OTURN)
      {
        this.setGameState(GameState.XTURN);
        return;
      }
  
    }
  }
  
  
  private setGameState(state: GameState)
  {
    this._gameState = state;
    this._state.next(this._gameState);
  }
  
  
  
  private hasWon(): boolean
  {
    let won = false;
    for (let i = 0; i < this._winRows.length; i++)
    {
      const row = this._winRows[i];
      won = this.checkRowState(row);
      if (won)
      {
        row.cells.map(cell => cell.isWinningCell = true);
        break;
      }
    }
    
    return won;
  }
  
  
  private checkRowState(row: IRow): boolean
  {
    return (row.cells[0].state !== CellState.EMPTY
      && (row.cells[0].state === row.cells[1].state)
      && (row.cells[1].state === row.cells[2].state));
  }
  
  
  get gameState(): Observable<GameState>
  {
    return this._state.asObservable();
  }
  
  
  
  selectCell(cell: ICell): Observable<IBoard>
  {
    if (this._gameState !== GameState.WON && this._gameState !== GameState.DRAW)
    {
      this.doTurn(cell);
    }
    return Observable.of(this._board);
  }
  
  
  reset(): Observable<IBoard>
  {
    this._gameState = (Math.random() < 0.5) ? GameState.XTURN : GameState.OTURN;
    this._state.next(this._gameState);
    this._board = {
      rows: [
        {
          cells: [
            {
              state: CellState.EMPTY,
              isWinningCell: false
            },
            {
              state: CellState.EMPTY,
              isWinningCell: false
            },
            {
              state: CellState.EMPTY,
              isWinningCell: false
            }
          ]
        },
        {
          cells: [
            {
              state: CellState.EMPTY,
              isWinningCell: false
            },
            {
              state: CellState.EMPTY,
              isWinningCell: false
            },
            {
              state: CellState.EMPTY,
              isWinningCell: false
            }
          ]
        },
        {
          cells: [
            {
              state: CellState.EMPTY,
              isWinningCell: false
            },
            {
              state: CellState.EMPTY,
              isWinningCell: false
            },
            {
              state: CellState.EMPTY,
              isWinningCell: false
            }
          ]
        }
      ],
      currentPlayer: (this._gameState === GameState.XTURN) ? Player.PLAYER1 : Player.PLAYER2
    };
    
    
    this.createWinRows();
    
    
    return Observable.of(this._board);
  }
  
}
