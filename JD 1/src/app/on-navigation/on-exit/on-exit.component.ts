import { Component, OnInit, ElementRef } from '@angular/core';

/**
* @name OnContentIndex
* @description
* Este componente gera o botão de voltar para a plataforma
* ```
*/

@Component({
  selector: 'on-exit',
  templateUrl: './on-exit.component.html'
})

export class OnExitComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.addUrlToBack()
  }

  addUrlToBack() {
    let element = this.elementRef.nativeElement.querySelector('a')
    try {
      element.setAttribute('href', (parent.window as any).geturl())
    } catch(error) {
      console.log('Não foi possível atribuir o link para o #on-exit.')
    }
  }
}
