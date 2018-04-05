import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBoard, ICell } from '../../models/game.model';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit
{
  @Input()
  public data: IBoard;
  
  @Output()
  public cellSelected: EventEmitter<ICell> = new EventEmitter<ICell>();
  
  @Output()
  public restartRequested: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor()
  {
  }
  
  
  ngOnInit()
  {
  }
  
  
  onCellSelected(cell: any)
  {
    this.cellSelected.emit(cell);
  }
  
  
  restart()
  {
    this.restartRequested.emit(true);
  }
}
