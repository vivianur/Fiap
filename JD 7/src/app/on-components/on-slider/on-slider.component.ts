import { Component, ElementRef, AfterContentInit, HostListener, Input, ContentChildren, QueryList } from '@angular/core'
import { OnSlideComponent } from './on-slide/on-slide.component'
import { OnGlobalService } from '../../providers/on-global.service'
import { TweenMax } from 'gsap'

declare const $ : any;

/**
* @name OnSlider
* @description
* Este componente cria um slider. É necessário utilizar o componente `on-slide`
*
* @usage
* ```html
*
* <div class="on-slider-box">
*   <on-slider>
*     <on-slide>
*       <p>Slide 1</p>
*     </on-slide>
*     <on-slide>
*       <p>Slide 2</p>
*     </on-slide>
*     <on-slide>
*       <p>Slide 3</p>
*     </on-slide>
*   </on-slider>
* </div>
* ```
*/

@Component({
  selector: "on-slider",
  templateUrl: "./on-slider.component.html"
})
export class OnSliderComponent implements AfterContentInit {
  constructor(private elementRef: ElementRef) {}

  @ContentChildren(OnSlideComponent) slideItems: QueryList<OnSlideComponent>
  @Input() type: string;
  isMobile: boolean;
  sliderWasBuilt: boolean;

  ngAfterContentInit() {
    this.verifyTypeOfSlider();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.verifyIfIsMobile();
    this.sliderUnwrap();
  }

  verifyIfIsMobile() {
    if (window.innerWidth < 1000) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  verifyTypeOfSlider() {
    if (this.type === "thumb") {
      this.sliderThumb();
    } else if (this.type === "unwrap") {
      this.sliderUnwrap();
    } else {
      this.sliderNormal();
    }
  }

  sliderNormal() {
    $(this.elementRef.nativeElement).slick({
      dots: true,
      infinite: false,
      adaptiveHeight: true
    });
  }

  sliderThumb() {
    $(this.elementRef.nativeElement).slick({
      dots: true,
      infinite: false,
      adaptiveHeight: true,
      customPaging: (slick, i) => `<img src="${this.slideItems.toArray()[i].thumb}">`
    });
    this.elementRef.nativeElement.classList.add('on-slider-thumb');
  }


  sliderUnwrap() {
    if(this.type !== "unwrap") return;

    if (this.isMobile && this.sliderWasBuilt) {
      $(this.elementRef.nativeElement).slick("unslick");
      this.sliderWasBuilt = false;
    } else if (!this.isMobile && !this.sliderWasBuilt) {
      this.sliderNormal();
      this.sliderWasBuilt = true;
    }
  }
}
