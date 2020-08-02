import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { OnControllersComponent } from '../on-controllers.component';
import { OnToastComponent } from './on-toast.component';

import { OnControllersService } from '../on-controllers.service';
import { OnControllers } from './../on-controllers.interface';

/**
* @name OnToastController
* @description
* Este serviço é responsável por criar o componente on-toast no `on-controllers`
* @usage
* ```ts
*    this.onToastController.create({
*      message: 'Apenas um teste',
*      duration: 3000,
*      position: 'bottom'
*    })
* ```
*/

@Injectable()
export class OnToastController implements OnControllers {

  componentRef: any;
  durationDefault: number = 1000;
  isLock: boolean = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private onControllersService: OnControllersService) {
  }

  create(config) {
    this.buildComponent(config.message);
    this.verifyDuration(config.duration);
  }

  buildComponent(message) {
    if(this.isLock) return;
    this.isLock = true;

    const factory = this.componentFactoryResolver.resolveComponentFactory(OnToastComponent);
    const containerRef = this.onControllersService.onController.viewContainerRef;
    containerRef.clear();
    this.componentRef = containerRef.createComponent(factory);
    this.componentRef.instance.message = message;

  }

  verifyDuration(duration: number) {
    if(duration) this.durationDefault = duration;

    setTimeout(() => {
      this.componentRef.instance.beforeOnDestroy().then(() => {
        this.componentRef.destroy();
        this.isLock = false;
      })
    }, this.durationDefault)

  }
}
