import { Component, OnInit, Input, ElementRef } from '@angular/core'

/**
* @name OnColFloat
* @description
* Este componente gera uma coluna que flutua o elemento tanto na direita ou esquerda.
*  As propriedades `to` e `size` são obrigatórias
*
* @usage
* ```html
*
* <on-col-float to="left" size="25"></on-col-float>
* ```
*/

@Component({
  selector: 'on-col-float',
  templateUrl: './on-col-float.component.html'
})

export class OnColFloatComponent implements OnInit {

  @Input('to') onColFloat: any
  @Input('size') onColFloatSize: any
  onColFloatClass: string

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.verifyOnColFloat()
    this.setOnColFloatClass()
  }

  verifyOnColFloat() {
    this.onColFloatClass = `on-col-float-${this.onColFloat} on-col-float-${this.onColFloatSize}`
  }

  setOnColFloatClass() {
    this.elementRef.nativeElement.className = this.onColFloatClass
  }

}
