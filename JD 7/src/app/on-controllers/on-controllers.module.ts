import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnGlobalModule } from "../on-global/on-global.module";
import { OnControllersComponent } from './on-controllers.component';
import { OnToastComponent } from './on-toast/on-toast.component';
import { OnLightBoxComponent } from "./on-lightbox/on-light-box.component";

import { OnControllersService } from './on-controllers.service';

import { OnIconButtonController } from './on-icon-button/on-icon-button.controller';
import { OnToastController } from './on-toast/on-toast.controller';
import { OnLightBoxController } from "./on-lightbox/on-light-box.controller";
import { OnIconButtonComponent } from './on-icon-button/on-icon-button.component';


@NgModule({
  imports: [
    CommonModule,
    OnGlobalModule
  ],
  providers: [
    OnToastController,
    OnControllersService,
    OnLightBoxController,
    OnIconButtonController
  ],
  declarations: [
    OnControllersComponent,
    OnToastComponent,
    OnLightBoxComponent,
    OnIconButtonComponent
  ],
  entryComponents: [
    OnToastComponent,
    OnLightBoxComponent,
    OnIconButtonComponent
  ],
  exports: [
    OnControllersComponent
  ]
})

export class OnControllersModule { }
