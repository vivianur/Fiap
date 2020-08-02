import { OnToastController } from '../../on-controllers/on-toast/on-toast.controller';
import { Component, AfterViewInit, AfterContentInit, Input, ContentChildren, QueryList, ElementRef } from '@angular/core'
import { OnCodeComponent } from '../on-code/on-code.component'
import { OnGlobalService } from '../../providers/on-global.service'

/**
* @name OnCodeBox
* @description
* Este componente possuí um box para ilustrar exemplos de códigos de programação
* (ou seja ele é totalmente dependende do componente `on-code`)
*
* @usage
* ### HTML
* ```html
*
* <on-code-box>
*    <on-code [code]="onCode_1" identifier="html"></on-code>
*    <on-code [code]="onCode_2" identifier="css"></on-code>
*  </on-code-box>
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
*
* this.onCode_2 = `
* .container {
*   background-color: #FFF
* }`
* ```
*/

declare const Clipboard: any

@Component({
  selector: 'on-code-box',
  templateUrl: './on-code-box.component.html'
})
export class OnCodeBoxComponent implements AfterViewInit, AfterContentInit {

  @ContentChildren(OnCodeComponent) onCodesComponent: QueryList<OnCodeComponent>
  onCodes: any
  buttons: any

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService,
    private onToastController: OnToastController
  ) { }

  ngAfterContentInit() {
    this.onCodes = this.onCodesComponent.toArray()
  }

  ngAfterViewInit() {
    this.buttons = [].slice.call(this.elementRef.nativeElement.querySelectorAll('button'))
    this.showCode(this.onCodes[0], this.buttons[0])
    this.createClipBoard()
  }

  showCode(onCodeSelected, button) {
    this.onCodes.forEach((onCode, i) => {
      onCode.elementRef.nativeElement.style.display = 'none'
      this.buttons[i].classList.remove('on-code-box-nav-button-active')
    })

    button.classList.add('on-code-box-nav-button-active')
    onCodeSelected.elementRef.nativeElement.style.display = 'block'
  }

  copy() {
    this.onGlobalService.setCopyAndPaste(true)

    setTimeout(() => {
      this.onGlobalService.setCopyAndPaste(false)
    }, 0)
  }

  createClipBoard() {
    let buttonCopyElement = this.elementRef.nativeElement.querySelector('.on-code-button-copy')

    new Clipboard(buttonCopyElement, {
      target: () =>
        this.elementRef.nativeElement.querySelector('#on-code-box on-code[style*=block]'
      )
    })
    .on('success', () => {
      this.onToastController.create({
        message: 'Cópia realizada com sucesso!',
        duration: 3000
      })
    })
    .on('error', () => {
      this.onToastController.create({
        message: 'Seu navegador não é suportado.',
        duration: 3000
      })
    })
  }
}
