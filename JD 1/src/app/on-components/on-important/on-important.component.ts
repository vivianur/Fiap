import { Component, OnInit } from '@angular/core'

/**
* @name OnImportant
* @description
* Este componente cria um layout em box com um estilo diferenciado, ele é utilizando
* para da importância a algum conteúdo.

* @usage
* ```html
*
*  <on-important>
*    <p>Lorem ipsum dolor</p>
*  </on-important>
* ```
*/

@Component({
  selector: 'on-important',
  templateUrl: './on-important.component.html'
})

export class OnImportantComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
