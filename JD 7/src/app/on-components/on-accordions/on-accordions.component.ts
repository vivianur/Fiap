import { Component, AfterContentInit, ElementRef, ContentChildren, QueryList } from '@angular/core'
import { OnAccordionComponent } from '../on-accordions/on-accordion/on-accordion.component'
import { OnGlobalService } from '../../providers/on-global.service'
import { TweenMax } from 'gsap'

/**
* @name OnAccordions
* @description
* Este componente cria um layout de accordions, para utilizar ele é necessário declarar um
* `<on-accordion>` com um `<on-accordion-header>` e um `<on-accordion-body>`,
* como mostra no seguinte exemplo:
*
* @usage
* ```html
*
* <on-accordions>
*   <on-accordion title="Titulo do accordion 1">
*     <p>Exemplo 1</p>
*   </on-accordion>
*   <on-accordion title="Titulo do accordion 2">
*     <p>Exemplo 2</p>
*   </on-accordion>
* </on-accordions>
* ```
*/

@Component({
  selector: 'on-accordions',
  templateUrl: './on-accordions.component.html'
})

export class OnAccordionsComponent implements AfterContentInit {

  accordions: any[] = []
  @ContentChildren(OnAccordionComponent) accordionsChildren: QueryList<OnAccordionComponent>
  isLocked: boolean = false
  isOpenTheFirst: boolean = true
  isOpenJustOne: boolean = true

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService) { }

  ngAfterContentInit() {
    this.accordions = this.accordionsChildren.toArray()
    this.verifyIfIsOpenTheFirst()
    this.verifyIfIsOpenJustOpen()
  }

  verifyIfIsOpenTheFirst() {
    if(this.isOpenTheFirst) {
      this.accordions[0].open()
    }
  }

  verifyIfIsOpenJustOpen() {
    if(this.isOpenJustOne) {
      this.accordions.forEach((accordion, i) => {
        accordion.header.onclick = () => {
          this.closeAllAccordions(accordion)
          this.executeScroll(accordion, i)
        }
      })
    }
  }

  closeAllAccordions(accordionParam) {
    this.accordions.forEach((accordion) => {
      if(accordion !== accordionParam)
        accordion.close()
    })
  }

  executeScroll(accordion, index) {
    let offsetBody = document.body.getBoundingClientRect().top
    let offsetAccordion = accordion.header.getBoundingClientRect().top
    let heightAccordionAbove = this.getHeightOffAllAccordionsBodyAbove(index)
    let result = ((offsetAccordion - heightAccordionAbove) - offsetBody) - this.onGlobalService.getMobileMenuHeight()

    TweenMax.to(window, 1, { scrollTo: { y: result, autoKill: false }})
  }

  getHeightOffAllAccordionsBodyAbove(index) {
    let totalHeight = 0
    for(let i = 0; i < index; i++) {
      totalHeight += this.accordions[i].body.clientHeight
    }

    return totalHeight
  }



}
