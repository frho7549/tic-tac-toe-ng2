import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './pages/game.component';
import { BoardComponent } from './components/board/board.component';
import { CellComponent } from './components/cell/cell.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  declarations: [GameComponent, BoardComponent, CellComponent, PlayerInfoComponent]
})
export class GameModule { }
