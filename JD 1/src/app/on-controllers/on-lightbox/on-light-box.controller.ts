import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { OnControllersComponent } from "../on-controllers.component";
import { OnLightBoxComponent } from "./on-light-box.component";

import { OnControllersService } from "../on-controllers.service";
import { OnControllers } from './../on-controllers.interface';

/**
* @name OnLightBoxController
* @description
* Este serviço é responsável por criar o componente on-light-box no `on-controllers`
* @usage
* ```ts
*    this.onToastController.create(element)
* ```
*/

@Injectable()
export class OnLightBoxController implements OnControllers {
  componentRef: any
  durationDefault: number = 1000

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private onControllersService: OnControllersService
  ) {}

  buildComponent(element) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      OnLightBoxComponent
    );
    const containerRef = this.onControllersService.onController.viewContainerRef
    containerRef.clear()
    this.componentRef = containerRef.createComponent(factory)

    const elementRef = this.componentRef.instance.elementRef.nativeElement.querySelector(".on-light-box-container")
    elementRef.innerHTML = element
  }

  verifyClickButtonClose() {
    this.componentRef.instance.checkClose.subscribe($event => {
      this.destroy();
    });
  }

  create(element: string) {
    this.buildComponent(element);
    this.verifyClickButtonClose()
  }

  destroy() {
    this.componentRef.instance.beforeOnDestroy().then(() => {
      this.componentRef.destroy()
    });
  }
}
