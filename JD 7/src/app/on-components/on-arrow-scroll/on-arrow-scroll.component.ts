import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core'
import { TweenMax } from 'gsap'
import { OnGlobalService } from '../../providers/on-global.service'

@Component({
  selector: "on-arrow-scroll",
  templateUrl: "./on-arrow-scroll.component.html"
})
export class OnArrowScrollComponent implements AfterViewInit {
  @Input() arrowColor: string;
  @Input() dotColor: string;
  @Input() textColor: string;
  @Input() hasDots: boolean = true;
  arrowElement: any;
  dotsElements: any;
  textElements: any;

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService
  ) {}

  ngAfterViewInit() {
    this.setColors();
    this.executeAnimation();
  }

  setColors() {
    this.arrowElement = [].slice.call(this.elementRef.nativeElement.querySelectorAll(".on-arrow-scroll-arrow"));
    this.dotsElements = [].slice.call(this.elementRef.nativeElement.querySelectorAll(".on-arrow-scroll-dot"));
    this.textElements = [].slice.call(this.elementRef.nativeElement.querySelectorAll(".on-arrow-scroll-text"));
    this.applyColorsOrClass(this.arrowElement, this.arrowColor);
    this.applyColorsOrClass(this.textElements, this.textColor);
    this.applyColorsOrClass(this.dotsElements, this.dotColor);
  }

  applyColorsOrClass(elements: any[], color: string) {
    if(!color) return;
    if (color.charAt(0) === '.') {
      elements.forEach(element => {
        element.classList.add(color.replace('.', ''));
      });
    } else {
      elements.forEach(element => {
        element.style.fill = color;
      });
    }
  }

  executeScroll() {
    const section = this.onGlobalService.getSectionOfElement(this.elementRef.nativeElement);

    const sectionNumber = parseInt(section.getAttribute("number"));
    this.onGlobalService.goToSection(sectionNumber);
  }

  executeAnimation() {
    TweenMax.staggerTo(this.dotsElements, 1, { autoAlpha: 0, repeat: -1 }, 0.1);
  }
}
