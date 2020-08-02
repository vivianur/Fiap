import { Component, ElementRef, OnInit, Input } from '@angular/core'
import { TweenMax } from 'gsap'

@Component({
  selector: 'on-toast',
  templateUrl: './on-toast.component.html'
})
export class OnToastComponent implements OnInit {

  @Input() message: string
  animationTime: number = .5

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    TweenMax.from(this.elementRef.nativeElement, this.animationTime, { autoAlpha: 0 } )
  }

  beforeOnDestroy() {
    return new Promise((resolve) => {
      TweenMax.to(this.elementRef.nativeElement, this.animationTime, { autoAlpha: 0, onComplete: () => resolve() } )
    })
  }

}
