import { Component, OnInit, Input, ElementRef } from '@angular/core'

/**
* @name OnLayer
* @description
* Este componente gera uma layer em uma sessão. Ele é utilizado para colocar
* várias camadas de imagens em uma sessão com imagem de fundo
*
* @usage
* ```html
*
* <on-section onFullScreenElement section-id="1">
*   <on-layer class="on-background-inicio"></on-layer>
*   <on-section-container>

*   </on-section-container>
* </on-section>
* ```
*/

@Component({
  selector: 'on-layer',
  templateUrl: './on-layer.component.html'
})

export class OnLayerComponent implements OnInit {

  @Input() backgroundColor: string
  @Input() isResponsive: boolean = true
  @Input() isFullScreen: boolean = false
  sectionElement: any

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.sectionElement = this.elementRef.nativeElement.parentElement
    this.verifyIfIsResponsive()
    this.verifyIfIsFullScreen()
    this.verifyIfElementIsTheFirstOrLast()
    this.setBackgroundColor()
  }

  verifyIfIsResponsive() {
    if(this.isResponsive === true) {
      this.sectionElement.classList.add('on-section-layer-responsive')
    } else {
      this.sectionElement.classList.add('on-section-layer-normal')
    }
  }

  verifyIfIsFullScreen() {
    if(this.isFullScreen === true) {
      this.sectionElement.classList.add('on-section-layer-fullscreen')
    }
  }

  verifyIfElementIsTheFirstOrLast() {
    let previounsElementSibling = this.elementRef.nativeElement.nextElementSibling
    let nextElementSibling = this.elementRef.nativeElement.previousElementSibling
    let sectionContent = this.sectionElement.querySelector('on-section-content')

    if(previounsElementSibling && this.isResponsive === true) {
      sectionContent.classList.add('on-section-content-layer-padding-top-remove')
    }

    if(nextElementSibling && this.isResponsive === true) {
      sectionContent.classList.add('on-section-content-layer-padding-bottom-remove')
    }

  }

  setBackgroundColor() {
    this.sectionElement.style.backgroundColor = this.backgroundColor
  }

}
