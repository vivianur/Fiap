import { Component, OnInit, Input, ElementRef } from '@angular/core'

/**
* @name OnCode
* @description
* Este componente é utilizado para exemplos de códigos de programação
* `Obs:` O código não deve possuír nenhum espaço no começo dele
*
* @usage
* ### HTML
* ```html
*
* <on-code [code]="onCode_1" identifier="html"></on-code>
* ```
* ### Typescript
* ```ts
*
* this.onCode_1 =`
* <html>
*   <head>
*     <title>FIAP ON</title>
*   </head>
*
*   <body>
*      <div class="container">
*        <p> Hello world</p>
*      </div>
*    </body>
*  </html>`
* ```
*/

@Component({
  selector: 'on-code',
  templateUrl: './on-code.component.html'
})

export class OnCodeComponent implements OnInit {

  @Input() code
  @Input() identifier
  className: string

  constructor(public elementRef: ElementRef) { }

  ngOnInit() {
    this.code = this.code.trim()
    this.className = `language-${this.identifier}`
  }

}
