import { Component, OnInit, ElementRef } from '@angular/core'
import { OnGlobalService } from '../../providers/on-global.service'
import { TweenMax } from 'gsap'

/**
* @name OnButtonScrollTop
* @description
* Este componente gera um botão que fica flutuando a direita a baixo da página. Ele scrolla a
* página até a primeira sessão
* ```
*/

@Component({
  selector: 'on-button-scroll-top',
  templateUrl: './on-button-scroll-top.component.html'
})

export class OnButtonScrollTopComponent implements OnInit {

  firstSectionId: number = 1

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService) { }

  ngOnInit() {
    this.verifyIfIsFirstSection()
  }

  verifyIfIsFirstSection() {
    this.onGlobalService.currentSection.subscribe((section) => {
      let sectionId = section.getAttribute('section-id')
      if(sectionId == this.firstSectionId)
        this.hideButton()
      else
        this.showButton()
    })
  }

  showButton() {
    TweenMax.to(this.elementRef.nativeElement , .5, { autoAlpha: .65 })
  }

  hideButton() {
    TweenMax.to(this.elementRef.nativeElement , .5, { autoAlpha: 0 })
  }

  scrollTop() {
    this.onGlobalService.goToSection(0)
  }

}
