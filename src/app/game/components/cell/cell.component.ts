import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CellState, ICell } from '../../models/game.model';


@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit
{
  @Input()
  public data: ICell;
  
  @Output()
  public selected: EventEmitter<ICell> = new EventEmitter<ICell>();
  
  
  public cellState = CellState;
  
  constructor()
  {
  }
  
  
  ngOnInit()
  {
  }
  
  
  onClick()
  {
    this.selected.emit(this.data);
  }
}
