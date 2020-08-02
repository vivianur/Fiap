import { Component, OnInit } from '@angular/core'
import { OnGlobalService } from '../../providers/on-global.service'

/**
* @name OnContentIndex
* @description
* Este componente gera um layout mostrando a quantidade de capítulos
* e o capítulo atual na sessão
* ```
*/

@Component({
  selector: 'on-content-index',
  templateUrl: './on-content-index.component.html'
})

export class OnContentIndexComponent implements OnInit {

  allSections: any = []
  currentNumberSection: number = 1
  constructor(private onGlobalService: OnGlobalService) { }

  ngOnInit() {
    setTimeout(() => {
      this.getNumberCurrentSection();
      this.allSections = [].slice.call(document.querySelectorAll("on-section"));
    })
  }

  getNumberCurrentSection() {
    this.onGlobalService.currentSection.subscribe((currentSection) => {
      this.currentNumberSection = currentSection.getAttribute('number')
    })
  }

}
