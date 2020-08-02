import { OnChallengeTitleComponent } from './on-challenge-title/on-challenge-title.component';
import { NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'
import { OnGlobalModule } from '../on-global/on-global.module'

// Thirds
import { InlineSVGModule } from "ng-inline-svg"

import { OnEmphasisComponent } from './on-emphasis/on-emphasis.component'
import { OnFigureComponent } from './on-figure/on-figure.component'
import { OnAnchor } from './on-anchor/on-anchor.component'
import { OnQuoteComponent } from './on-quote/on-quote.component'
import { OnBoxComponent } from './on-box/on-box.component';
import { OnAnimationPlayerComponent } from './on-animation-player/on-animation-player.component';
import { OnSliderComponent } from './on-slider/on-slider.component';
import { OnSlideComponent } from './on-slider/on-slide/on-slide.component';
import { OnTooltipComponent } from './on-tooltip/on-tooltip.component';
import { OnAccordionsComponent } from './on-accordions/on-accordions.component';
import { OnAccordionComponent } from './on-accordions/on-accordion/on-accordion.component';
import { OnImageClickComponent } from './on-image-click/on-image-click.component';
import { OnTabsComponent } from './on-tabs/on-tabs.component';
import { OnActivityComponent } from './on-activity/on-activity.component';
import { OnPopupComponent } from './on-popup/on-popup.component';
import { OnCodeBoxComponent } from './on-code-box/on-code-box.component';
import { OnCodeComponent } from './on-code/on-code.component';
import { OnImportantComponent } from './on-important/on-important.component';
import { OnShapeComponent } from './on-shape/on-shape.component';
import { OnArrowScrollComponent } from './on-arrow-scroll/on-arrow-scroll.component';
import { OnTimelineVerticalComponent } from './on-timeline-vertical/on-timeline-vertical.component';
import { OnTimelineVerticalItemComponent } from './on-timeline-vertical/on-timeline-vertical-item/on-timeline-vertical-item.component';
import { OnTimelineProcessComponent } from './on-timeline-process/on-timeline-process.component';
import { OnTimelineProcessItemComponent } from './on-timeline-process/on-timeline-process-item/on-timeline-process-item.component';
import { OnReadMoreComponent } from './on-read-more/on-read-more.component';
import { OnReadMoreItemComponent } from './on-read-more/on-read-more-item/on-read-more-item.component';
import { OnItemComponent } from './on-item/on-item.component';
import { OnChallengeStampComponent } from './on-challenge-stamp/on-challenge-stamp.component';

/**
 * @hidden
 */

@NgModule({
  imports: [CommonModule, InlineSVGModule, OnGlobalModule],
  declarations: [
    OnEmphasisComponent,
    OnFigureComponent,
    OnAnchor,
    OnQuoteComponent,
    OnBoxComponent,
    OnAnimationPlayerComponent,
    OnSliderComponent,
    OnSlideComponent,
    OnTooltipComponent,
    OnAccordionsComponent,
    OnAccordionComponent,
    OnImageClickComponent,
    OnTabsComponent,
    OnActivityComponent,
    OnPopupComponent,
    OnCodeBoxComponent,
    OnCodeComponent,
    OnImportantComponent,
    OnShapeComponent,
    OnArrowScrollComponent,
    OnTimelineVerticalComponent,
    OnTimelineVerticalItemComponent,
    OnTimelineProcessComponent,
    OnTimelineProcessItemComponent,
    OnReadMoreComponent,
    OnReadMoreItemComponent,
    OnItemComponent,
    OnChallengeStampComponent,
    OnChallengeTitleComponent
  ],
  exports: [
    OnArrowScrollComponent,
    OnAnchor,
    OnEmphasisComponent,
    OnFigureComponent,
    OnQuoteComponent,
    OnBoxComponent,
    OnAnimationPlayerComponent,
    OnSliderComponent,
    OnSlideComponent,
    OnTooltipComponent,
    OnAccordionsComponent,
    OnAccordionComponent,
    OnImageClickComponent,
    OnTabsComponent,
    OnActivityComponent,
    OnPopupComponent,
    OnCodeBoxComponent,
    OnCodeComponent,
    OnImportantComponent,
    OnShapeComponent,
    OnTimelineVerticalComponent,
    OnTimelineVerticalItemComponent,
    OnTimelineProcessComponent,
    OnTimelineProcessItemComponent,
    OnReadMoreComponent,
    OnReadMoreItemComponent,
    OnItemComponent,
    OnChallengeStampComponent,
    OnChallengeTitleComponent
  ]
})
export class OnComponentsModule {}
