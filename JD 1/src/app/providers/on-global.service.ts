import { Injectable, EventEmitter } from '@angular/core'
import { OnToastController } from '../on-controllers/on-toast/on-toast.controller'
import { Subject } from "rxjs/Subject"
import { TweenMax } from "gsap"
import * as $ from 'jquery';

/**
* @name OnGlobalService
* @description
* Serviço responsável pelos principais atributos de comunicação entre os componentes
*/

declare const ScrollMagic: any

@Injectable()

export class OnGlobalService {

  sections: any = []
  actions: any = []
  currentSection: EventEmitter<any> = new EventEmitter()
  isPopupOpen: EventEmitter<boolean> = new EventEmitter()
  emitFontSize: EventEmitter<boolean> = new EventEmitter()
  scrollController: any
  private disableCopyExecutionBind: any


  constructor(
    private onToastController: OnToastController
  ) {
    this.scrollController = new ScrollMagic.Controller()
    this.disableCopyExecutionBind = this.disableCopyExecution.bind(this)
  }

  getMobileMenuHeight() {
    return window.innerWidth < 1000 ? 36 : 0
  }

  checkElementAtMiddle(element) {
    let scrollingElement = document.scrollingElement || document.documentElement
    let offsetTop = (window.innerHeight - this.getMobileMenuHeight() - element.offsetHeight) / 2
    let currentOffsetTop = $(element).offset().top - scrollingElement.scrollTop - this.getMobileMenuHeight()
    return currentOffsetTop <= offsetTop ? true : false
  }

  goToSection(sectionNumber) {
    return new Promise((resolve) => {
      let nextSection: any = document.querySelectorAll('on-section')[sectionNumber]
      let nextSectionOffsetTop =  nextSection.offsetTop - this.getMobileMenuHeight()
      TweenMax.to(window, 1, { scrollTo: { y: nextSectionOffsetTop, autoKill: false }, onComplete: () => resolve(true) })
    })
  }

  getSectionOfElement(element: HTMLElement) {
    let tagName = element.tagName.toLowerCase();

    for(let i = 0; i < this.sections.length; i++) {
      let elementsOfSection = [].slice.call(this.sections[i].querySelectorAll(tagName));
      for(let j = 0; j < elementsOfSection.length; j++) {
        if (elementsOfSection[j] === element) {
          return this.sections[i];
        }
      }
    }
  }

  setCopyAndPaste(value: boolean) {
    if(value) {
      document.body.removeEventListener('cut', this.disableCopyExecutionBind)
      document.body.removeEventListener('copy', this.disableCopyExecutionBind)
    } else {
      document.body.addEventListener('cut', this.disableCopyExecutionBind)
      document.body.addEventListener('copy', this.disableCopyExecutionBind)
    }
  }

  disableCopyExecution(e) {
    e.preventDefault()
    this.onToastController.create({
      message: 'A cópia do conteúdo foi desabilitada.',
      duration: 3000
    })
  }
}
