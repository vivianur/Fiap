import { Directive, Output, AfterContentInit, EventEmitter, ElementRef } from '@angular/core'

/**
* @name OnCountElement
* @description
* Esta diretiva é responsável por contar cada elemento
* ```
*/

@Directive({selector: '[onCountElement]'})

export class OnCountElementDirective implements AfterContentInit {
    @Output('onCountElement') element: EventEmitter<number> = new EventEmitter()

    constructor(public elementRef: ElementRef) {}

    ngAfterContentInit() {
      let elements = document.querySelectorAll(this.elementRef.nativeElement.localName)

      for(let i = 0; i < elements.length; i++) {
        if(this.elementRef.nativeElement === elements[i]) {
          this.element.emit(i + 1)
        }
      }

    }

}
