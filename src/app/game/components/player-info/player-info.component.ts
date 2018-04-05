import { Component, Input, OnInit } from '@angular/core';
import { IBoard, Player } from '../../models/game.model';


@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit
{
  @Input()
  public data: IBoard;
  
  public playerType = Player;
  
  constructor()
  {
  }
  
  
  ngOnInit()
  {
  }
  
}
