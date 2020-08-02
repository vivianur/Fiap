import { Component, AfterContentInit, Input, ElementRef } from '@angular/core'

/**
* @name OnImageClick
* @description
* Este componente cria um layout preparado para utilizar em um elemento clicável.
*
* @usage
* ```html
*
*  <on-image-click class="on-image-click" [buttons]="['on-button-1', 'on-button-2', 'on-button-3']" [actives]="[1, 0, 0]">
*    <div class="on-display-table">
*      <div class="on-display-table-cell on-display-table-cell-6">
*        <button id="on-button-1">Botão 1</button>
*        <button id="on-button-2">Botão 2</button>
*        <button id="on-button-3">Botão 3</button>
*      </div>
*      <div class="on-display-table-cell on-display-table-cell-6">
*        <on-image-click-contents>
*          <p content="on-button-1">Conteúdo 1</p>
*          <p content="on-button-2">Conteúdo 2</p>
*          <p content="on-button-3">Conteúdo 3</p>
*        </on-image-click-contents>
*      </div>
*    </div>
* </on-image-click>
* ```
*/

@Component({
  selector: 'on-image-click',
  templateUrl: './on-image-click.component.html'
})

export class OnImageClickComponent implements AfterContentInit {
  buttons: any
  contents: any

  @Input("buttons") buttonsList: Array<string>;
  @Input("actives") actives: Array<number>;

  constructor(private elementRef: ElementRef) { }

  ngAfterContentInit() {
    this.setAttributesOfButtonsAndContents();
    this.init()
  }

  init() {
    this.buttons = [].slice.call(this.elementRef.nativeElement.querySelectorAll('[button]'));
    this.contents = [].slice.call(this.elementRef.nativeElement.querySelectorAll('[content]'));
    /* Método novo de linkar os ids aos buttons e aos contents / Método antigo de identificar cada group com o atributo button e content*/
    this.buttons.forEach((button, i) => {
      button.onclick = () => {
        let id = (this.buttonsList ? this.buttonsList[i] : this.buttons[i].getAttribute('button'))
        this.setButtonsInactive()
        this.setButtonActive(id)
        this.setContentsInactive()
        this.setContentsActive(id)
      }
    })
  }

  setAttributesOfButtonsAndContents() {
    if (!this.buttonsList || !this.actives) return;

    for (let count = 0; count < this.buttonsList.length; count++) {
      let svgButton = this.elementRef.nativeElement.querySelector("#" + this.buttonsList[count]);
      svgButton.setAttribute("button", this.buttonsList[count]);

      let svgActive = this.actives[count];
      svgButton.setAttribute("active", svgActive);

      let content = this.elementRef.nativeElement.querySelector('[content="' + this.buttonsList[count] + '"]');
      content.setAttribute("active", svgActive);
    }
  }

  setButtonsInactive() {
    this.buttons.forEach((button) => {
      button.setAttribute('active', 0)
    })
  }

  setButtonActive(id) {
    let button = this.elementRef.nativeElement.querySelector(`[button="${id}"]`)
    button.setAttribute('active', 1)
  }

  setContentsInactive() {
    this.contents.forEach((content) => {
      content.setAttribute('active', 0)
    })
  }

  setContentsActive(id) {
    let content = this.elementRef.nativeElement.querySelector(`[content="${id}"]`)
    content.setAttribute('active', 1)
  }

}