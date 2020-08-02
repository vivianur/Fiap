import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core"
import { OnControllersComponent } from "../on-controllers.component";
import { OnIconButtonComponent } from './on-icon-button.component';

import { OnControllersService } from "../on-controllers.service";
import { OnControllers } from './../on-controllers.interface';

/**
* @name OnIconButtonController
* @description
* Este serviço é responsável por criar o componente on-button-icon no `on-controllers`
* @usage
* ```ts
*    this.onIconButtonController.create({ message: 'Assistir playlist de vídeos'});
* ```
*/

@Injectable()
export class OnIconButtonController implements OnControllers {
  componentRef: any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private onControllersService: OnControllersService
  ) { }

  buildComponent(message) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      OnIconButtonComponent
    );
    const containerRef = this.onControllersService.onController.viewContainerRef
    containerRef.clear()
    this.componentRef = containerRef.createComponent(factory);
    this.componentRef.instance.message = message;
  }

  setValues(values: OnIconButtonsConfigController) {
    this.componentRef.instance.icon = values.icon || 0;
    this.componentRef.instance.numberOfSection = values.scrollToSection;
  }

  create(values: OnIconButtonsConfigController) {
    this.buildComponent(values.message);
    this.setValues(values);
  }
}

interface OnIconButtonsConfigController {
  icon?: number,
  message: string,
  scrollToSection: number
}
