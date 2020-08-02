import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnHeaderComponent } from './on-header/on-header.component';
import { OnNavComponent } from './on-nav/on-nav.component';
import { OnNavButtonComponent } from './on-nav-button/on-nav-button.component';
import { OnContentIndexComponent } from './on-content-index/on-content-index.component';
import { OnExitComponent } from './on-exit/on-exit.component';

/**
 * @hidden
 */

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OnHeaderComponent,
    OnNavComponent,
    OnNavButtonComponent,
    OnContentIndexComponent,
    OnExitComponent
  ],
  exports: [
    OnHeaderComponent
  ]
})

export class OnNavigationModule { }
