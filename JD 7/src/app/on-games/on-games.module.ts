import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnGameDragNDropComponent } from './on-game-drag-n-drop/on-game-drag-n-drop.component';
import { OnGameQuestionNAnswersRushComponent } from './on-game-question-n-answers-rush/on-game-question-n-answers-rush.component';

/**
 * @hidden
 */

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OnGameDragNDropComponent,
    OnGameQuestionNAnswersRushComponent
  ],
  exports: [
    OnGameDragNDropComponent,
    OnGameQuestionNAnswersRushComponent
  ]
})
export class OnGamesModule { }
