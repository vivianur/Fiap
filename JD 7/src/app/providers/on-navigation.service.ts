import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class OnNavigationService {

  isOpenNav: EventEmitter<boolean> = new EventEmitter<boolean>()
  transitionDuration: number = .75

}
