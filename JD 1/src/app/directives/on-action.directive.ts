import { Directive, OnInit, HostListener, ElementRef, Input } from '@angular/core'
import { OnGlobalService } from '../providers/on-global.service'

/**
* @name OnAction
* @description
* Esta diretiva é responsável por lançar uma função, quando ocorrer a troca de capítulo,
* ou o scroll chegar no elemto
* ```
*/

declare const ScrollMagic : any

@Directive({selector: '[onAction]'})

export class OnActionDirective implements OnInit {
  @Input() onAction: any

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService) {
  }

  ngOnInit() {
    if(!this.onAction) return

    let tag = this.elementRef.nativeElement.tagName.toLowerCase()
    if(tag === 'on-animation-player') {
      this.createScene(false)
    } else {
      this.createScene(false)
    }
  }

  createScene(isReverse: boolean) {
    new ScrollMagic.Scene({
      triggerElement: this.elementRef.nativeElement,
      reverse: isReverse
    })
    .setTween(this.onAction)
    .addTo(this.onGlobalService.scrollController)
  }

}
