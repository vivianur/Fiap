import { Component, Input, OnInit, HostListener, ElementRef } from '@angular/core'
import { OnGlobalService } from '../../providers/on-global.service'
import { TweenMax, Linear } from 'gsap'
import * as $ from 'jquery';


/**
* @name OnShape
* @description
* Este componente é usado para pequenos pedaços da template em parallax. Tem como atributo opicional
* o `scroll`
*
* @usage
* ```html
*
* <on-shape scroll="top"></on-shape>
* ```
*/

declare const ScrollMagic : any

@Component({
  selector: "on-shape",
  templateUrl: "./on-shape.component.html"
})
export class OnShapeComponent implements OnInit {
  @Input() scroll: string;
  @Input() translateX: string = "0";
  @Input() translateY: string = "0";
  @Input() src: string;
  positionY: any = -30;
  shape: any;

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService
  ) {}

  ngOnInit() {
    this.shape = this.elementRef.nativeElement.querySelector(".on-shape");
    this.verifyScroll();
    this.verifyPosition();
    this.createScene();
  }

  animation() {
    return TweenMax.from(this.shape, 0.3, {
      y: this.positionY,
      autoAlpha: 0,
      ease: Linear.easeNone
    });
  }

  verifyScroll() {
    if (this.scroll == "bottom") {
      this.positionY = -this.positionY;
    }
  }

  verifyPosition() {
    this.elementRef.nativeElement.style.transform = `translate(${
      this.translateX
    }, ${this.translateY})`;
  }

  createScene() {
    new ScrollMagic.Scene({
      triggerElement: this.elementRef.nativeElement,
      duration: "100vh"
    })
      .setTween(this.animation())
      .addTo(this.onGlobalService.scrollController);
  }
}
