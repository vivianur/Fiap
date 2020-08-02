import { Component, OnInit } from '@angular/core'

/**
* @name OnBox
* @description
* Este componente cria um layout em box, ele é utilizado quando
* há algum conteúdo que deve ter destaque, mas não tem muita importância
*
* @usage
* ```html
*
* <on-box>
*   <p>Lorem ipsum dolor</p>
* </on-box>
* ```
*/

@Component({
  selector: 'on-box',
  templateUrl: './on-box.component.html'
})

export class OnBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
