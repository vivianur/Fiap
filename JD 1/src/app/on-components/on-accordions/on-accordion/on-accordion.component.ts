import { Component, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core'
import { OnGlobalService } from '../../../providers/on-global.service'
import { TweenMax } from 'gsap'

/**
* @name OnAccordion
* @description
* Este componente é dependendo do componente on-accordions, ele é utilizado para criar a
* estrutura do accordion:
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
  selector: 'on-accordion',
  templateUrl: './on-accordion.component.html'
})

export class OnAccordionComponent implements OnInit, AfterViewInit {

  @Input() title: string
  isOpen: boolean = false
  isLocked: boolean = false
  accordion: any
  header: any
  body: any
  transitionTime: number = .8

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService) {

  }

  ngOnInit() {
    this.accordion = this.elementRef.nativeElement
    this.header = this.accordion.querySelector('.on-accordion-header')
    this.body = this.accordion.querySelector('.on-accordion-body')
    this.close()
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.removeAttribute('title');
  }

  open() {
    return new Promise((resolve) => {
      this.isLocked = true
      this.isOpen = true
      this.accordion.classList.add('on-accordion-open')

      TweenMax.set(this.body, { clearProps: 'all' })
      TweenMax.from(this.body, this.transitionTime, { height: 0, onComplete: () => {
        this.isLocked = false
        TweenMax.set(this.body, { clearProps: 'all' })
        resolve(this.isLocked)
      } })
    })
  }

  close() {
    return new Promise((resolve) => {
      this.isLocked = true
      this.isOpen = false
      this.accordion.classList.remove('on-accordion-open')
      TweenMax.to(this.body, this.transitionTime, { height: 0, onComplete: () => {
        this.isLocked = false
        resolve(this.isLocked)
      } })
    })
  }

  toggle() {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }
}
