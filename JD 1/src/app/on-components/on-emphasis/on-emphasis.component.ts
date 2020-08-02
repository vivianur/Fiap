import { Component, OnInit, ElementRef } from '@angular/core'

/**
* @name OnEmphasis
* @description
* Este componente cria um layout de enfâse
*
* @usage
* ```html
*
* <on-emphasis>Exemplo de enfase</on-emphasis>
* ```
*/

@Component({
  selector: 'on-emphasis',
  templateUrl: './on-emphasis.component.html'
})

export class OnEmphasisComponent implements OnInit {

  emphasis: any

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {

    this.emphasis = this.elementRef.nativeElement.querySelector('span')
    let emphasisContent = this.emphasis.innerHTML.trim()

    emphasisContent = this.checkThreePointsAtStart(emphasisContent)
    emphasisContent = this.checkThreePointsAtEnd(emphasisContent)

    this.emphasis.innerHTML = emphasisContent

  }

  checkThreePointsAtStart(emphasisContent) {
    return !/^[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/.test(emphasisContent) ? "[...] " + emphasisContent : emphasisContent;
  }

  checkThreePointsAtEnd(emphasisContent) {
    return !/[.?!:;]$/.test(emphasisContent) ? emphasisContent + ' [...]' : emphasisContent
  }

}
