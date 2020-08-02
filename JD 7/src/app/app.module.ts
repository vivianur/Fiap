import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'

import { OnGlobalModule } from './on-global/on-global.module'
import { OnNavigationModule } from './on-navigation/on-navigation.module'
import { OnComponentsModule } from './on-components/on-components.module'
import { OnControllersModule } from './on-controllers/on-controllers.module'
import { OnGamesModule } from './on-games/on-games.module'
import { OnCustomModule } from '../custom/on-custom.module'

import { OnGlobalService } from "./providers/on-global.service"
import { OnNavigationService } from "./providers/on-navigation.service"
import { OnAnimationsService } from './providers/on-animations.service';

/**
 * @hidden
 */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OnGlobalModule,
    OnNavigationModule,
    OnComponentsModule,
    OnControllersModule,
    OnGamesModule,
    OnCustomModule
  ],
  providers: [
    OnGlobalService,
    OnNavigationService,
    OnAnimationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
