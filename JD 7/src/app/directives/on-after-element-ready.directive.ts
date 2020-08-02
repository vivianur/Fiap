import { Directive, Output, AfterContentInit, EventEmitter } from '@angular/core'

/**
* @name onAfterElementReady
* @description
* Esta diretiva é responsável por lançar uma função, após o elemnto estiver inicializado
* ```
*/

@Directive({selector: '[onAfterElementReady]'})

export class OnAfterElementReadyDirective implements AfterContentInit {
    @Output('onAfterElementReady')
    public after: EventEmitter<OnAfterElementReadyDirective> = new EventEmitter()

    public ngAfterContentInit(): void {
      this.after.emit(this)
    }
}
