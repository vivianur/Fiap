import { Component, OnInit, Input } from '@angular/core'

/**
* @name OnContentSwitch
* @description
* Este componente gera o layout de troca de conteúdo, nele sempre será necessário a imagem
* do próximo capítulo, título e uma descrição. A propriedade `chapter` e possuír a classe `on-background-content-switch`
* no SASS
*
* @usage
* ```html
*
* <on-content-switch chapter="2">
*   <h2>Lorem ipsum dolor sit amet</h2>
*   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum, ante ac suscipit scelerisque, urna diam dapibus ex, at aliquam..</p>
* </on-content-switch>
* ```
*
* Também é possível utilziar com as seguintes opções*
* ```html
*
* <on-content-switch chapter="2" justHas="<next || prev">
*   <h2>Lorem ipsum dolor sit amet</h2>
*   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum, ante ac suscipit scelerisque, urna diam dapibus ex, at aliquam..</p>
* </on-content-switch>
* ```
*/

declare const leituraHTML : any

@Component({
  selector: 'on-content-switch',
  templateUrl: './on-content-switch.component.html'
})

export class OnContentSwitchComponent implements OnInit {
  @Input() chapter: string;
  @Input() justHas: string;
  @Input() figure: string;

  constructor() {

  }

  ngOnInit() {
  }

  nextContent() {
    try {
      leituraHTML.nextContent();
    } catch(error) {
      console.log('%c Este script só funciona na plataforma', 'color: #FF3366');
    }
  }

  prevContent() {
    try {
      leituraHTML.prevContent();
    } catch(error) {
      console.log('%c Este script só funciona na plataforma', 'color: #FF3366');
    }
  }
}
