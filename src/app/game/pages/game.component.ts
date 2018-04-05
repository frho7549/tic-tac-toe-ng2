import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GameState, IBoard, ICell } from '../models/game.model';
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameService]
})
export class GameComponent implements OnInit
{
  boardData: Observable<IBoard>;
  state: Observable<GameState>;
  
  constructor(private service: GameService)
  {
  }
  
  
  ngOnInit()
  {
    this.startNewGame();
  }
  
  
  startNewGame()
  {
    this.state = this.service.gameState;
    this.boardData = this.service.startNewGame();
  }
  
  
  onCellSelected(cell: ICell)
  {
    this.boardData = this.service.selectCell(cell);
  }
}
