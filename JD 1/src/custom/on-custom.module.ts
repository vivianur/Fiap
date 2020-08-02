import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { CommonModule } from '@angular/common'

import { OnGlobalModule } from '../app/on-global/on-global.module'
import { OnNavigationModule } from '../app/on-navigation/on-navigation.module'
import { OnComponentsModule } from '../app/on-components/on-components.module'
import { OnControllersModule } from '../app/on-controllers/on-controllers.module'
import { OnGamesModule } from '../app/on-games/on-games.module'

import { OnCustomComponent } from './on-custom.component'

@NgModule({
  imports: [
    CommonModule,
    OnGlobalModule,
    OnComponentsModule,
    OnControllersModule,
    OnGamesModule
  ],
  declarations: [
    OnCustomComponent
  ],
  exports: [
    OnCustomComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class OnCustomModule { }
