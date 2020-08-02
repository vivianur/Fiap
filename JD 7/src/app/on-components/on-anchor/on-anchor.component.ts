import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core'
import { TweenMax } from 'gsap'
import { OnGlobalService } from '../../providers/on-global.service'

@Component({
  selector: "on-anchor",
  templateUrl: "./on-anchor.component.html"
})
export class OnAnchor implements AfterViewInit {
  @Input() to: string
  selector: string

  isLockScroll = false;
  reference: any
  figcaption: any

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService
  ) {}

  ngAfterViewInit() {
    this.selector = this.to
    this.reference = document.querySelector(this.selector)
    this.figcaption = this.reference.querySelector('figcaption')
  }

  handlerClick(e) {
    this.elementRef.nativeElement.onclick = () => {
      this.isLockScroll = true;
      TweenMax.to(window, 1, {
        scrollTo: {
          y: this.verifyOffsetOfReferences(),
          autoKill: false,
          onComplete: () => (this.isLockScroll = true)
        }
      });
    };
  }

  handlerMouseover(e) {
    this.elementRef.nativeElement.onmouseover = (e) => {
      try{
        this.figcaption.style.visibility = "visible";
        this.figcaption.style.opacity = 1;
      } catch(e) {
        console.log('Referência sem legenda...')
      }
    };
  }

  handlerMouseout(e) {
    this.elementRef.nativeElement.onmouseout = (e) => {
      try{
        this.figcaption.style.visibility = null;
        this.figcaption.style.opacity = null;
      } catch(e) {
        console.log('Referência sem legenda...')
      }
    };
  }

  verifyOffsetOfReferences() {
    let offsetBody = - document.body.getBoundingClientRect().top;
    let offsetFigure = - this.reference.getBoundingClientRect().top;

    return offsetBody - offsetFigure - this.onGlobalService.getMobileMenuHeight();
  }
}
