import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { OnGlobalComponent } from './on-global.component'
import { OnSectionComponent } from './on-section/on-section.component'
import { OnLayerComponent } from './on-layer/on-layer.component'
import { OnSectionContainerComponent } from './on-section-container/on-section-container.component'
import { OnSectionContentComponent } from './on-section-content/on-section-content.component'
import { OnContentSwitchComponent } from './on-content-switch/on-content-switch.component'
import { OnColFloatComponent } from './on-col-float/on-col-float.component'
import { OnReferencesComponent } from './on-references/on-references.component'
import { OnFontSizeComponent } from './on-font-size/on-font-size.component'
import { OnButtonScrollTopComponent } from './on-button-scroll-top/on-button-scroll-top.component'

import { OnBackgroundImageHeightFixDirective } from '../directives/on-background-image-height-fix.directive'
import { OnAfterElementReadyDirective } from '../directives/on-after-element-ready.directive'
import { OnCountElementDirective } from '../directives/on-count-element.directive'
import { OnActionDirective } from './../directives/on-action.directive';
import { OnMapOfSectionComponent } from './on-map-of-section/on-map-of-section.component'

/**
 * @hidden
 */

@NgModule({
  declarations: [
    OnGlobalComponent,
    OnSectionComponent,
    OnLayerComponent,
    OnSectionContainerComponent,
    OnSectionContentComponent,
    OnContentSwitchComponent,
    OnColFloatComponent,
    OnReferencesComponent,
    OnFontSizeComponent,
    OnButtonScrollTopComponent,
    OnBackgroundImageHeightFixDirective,
    OnAfterElementReadyDirective,
    OnCountElementDirective,
    OnActionDirective,
    OnMapOfSectionComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    OnGlobalComponent
  ],
  exports: [
    OnGlobalComponent,
    OnSectionComponent,
    OnSectionContentComponent,
    OnSectionContainerComponent,
    OnLayerComponent,
    OnColFloatComponent,
    OnContentSwitchComponent,
    OnReferencesComponent,
    OnBackgroundImageHeightFixDirective,
    OnAfterElementReadyDirective,
    OnCountElementDirective,
    OnMapOfSectionComponent,
    OnActionDirective
  ]
})

export class OnGlobalModule { }
