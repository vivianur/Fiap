import { Injectable } from '@angular/core';
import { OnControllersComponent } from './on-controllers.component'

@Injectable()

export class OnControllersService {

  onController: OnControllersComponent

  constructor() {

  }

  build(onController: OnControllersComponent) {
    this.onController = onController
  }

}
