import { element } from 'protractor'
import { Component, OnInit, AfterViewInit, ElementRef, EventEmitter, HostListener } from '@angular/core'
import { TweenMax, TimelineMax, Power4 } from "gsap"

import { OnNavigationService } from './../../providers/on-navigation.service'
import { OnGlobalService } from './../../providers/on-global.service'

/**
* @name OnNav
* @description
* Este componente gera o menu de navegação da template
* ```
*/

@Component({
  selector: 'on-nav',
  templateUrl: './on-nav.component.html'
})

export class OnNavComponent implements OnInit, AfterViewInit {
  titles: any
  clickOutside = new EventEmitter<MouseEvent>()
  isLock: boolean = false
  isMoving: boolean = false
  isMovingFrom: number
  isMovingTo: number
  navElement: any

  constructor(
    private elementRef: ElementRef,
    private onNavigationService: OnNavigationService,
    private onGlobalService: OnGlobalService
  ) {

  }

  ngOnInit() {
    this.navElement = this.elementRef.nativeElement.querySelector('nav')
    this.setCloseNavToDefault()
    this.getItensOfNav()
    this.verifyIfNavIsOpen()
    this.verifyCloseNav()
  }

  ngAfterViewInit() {
    this.verifyCurrentSection();
    this.createAnimateHover()
  }

  visitChapter(element, id) {
    this.setVisitedButton(element)
    this.setActiveButton(element)
    this.onGlobalService.goToSection(id)
    this.onNavigationService.isOpenNav.emit(false)
  }

  touchMoveHandler($event) {
    if(this.isLock) {
      this.isLock = false
      this.isMoving = true
      this.isMovingFrom = $event.changedTouches[0].clientX
    }

    if(this.isMoving) {
      this.isMovingTo = $event.changedTouches[0].clientX
      let totalMoved = this.isMovingFrom - this.isMovingTo
      let totalMovedPercentage = (totalMoved / this.navElement.offsetWidth) * -100

      totalMovedPercentage > 0 ? totalMovedPercentage = 0 : false
      totalMovedPercentage < -100 ? totalMovedPercentage = 0 : false

      TweenMax.to(this.navElement, 0, { x: `${totalMovedPercentage}%`})
    }
  }

  touchEndHandler($event) {
    if(this.isMoving) {
      this.isLock = true
      this.isMoving = false
      let totalMoved = this.isMovingFrom - this.isMovingTo
      let totalMovedPercentage = totalMoved / this.navElement.offsetWidth
      if(totalMovedPercentage >= .25) {
        this.onNavigationService.isOpenNav.emit(false)
      } else {
        this.onNavigationService.isOpenNav.emit(true)
      }
    }
  }

  setCloseNavToDefault() {
    TweenMax.set('#on-nav', { x: '-100%' })
  }

  getItensOfNav() {
    this.titles = document.querySelectorAll('h1')
  }

  verifyIfNavIsOpen() {
    this.onNavigationService.isOpenNav.subscribe((isOpen) => {
      if(isOpen) {
        TweenMax.to(this.navElement, this.onNavigationService.transitionDuration, { x: '0%',  onComplete: () => {
          this.isLock = true
        } })
      } else {
        TweenMax.to(this.navElement, this.onNavigationService.transitionDuration, { x: '-100%', onComplete: () => {
          this.isLock = false
        } })
      }
    })
  }

  verifyCloseNav() {
    let closeFunction = closeNavEvent.bind(this)
    this.onNavigationService.isOpenNav.subscribe((isOpen) => {
      if(isOpen) {
        document.addEventListener('click', closeFunction)
      } else {
        document.removeEventListener('click', closeFunction)
      }
    })

    function closeNavEvent($event) {
      if(!this.elementRef.nativeElement.contains($event.toElement) && this.isLock) {
        this.onNavigationService.isOpenNav.emit(false)
      }
    }
  }

  setVisitedButton(element) {
    element.classList.add("on-nav-button-visited")
  }

  setActiveButton(element) {
    let onNavButtonActiveCurrent = this.elementRef.nativeElement.querySelector('.on-nav-button-active')
    if(onNavButtonActiveCurrent) {
      onNavButtonActiveCurrent.classList.remove('on-nav-button-active')
    }

    element.classList.add('on-nav-button-active')
  }

  verifyIfTitleHasHighlight(title) {
    let regex = /(<([^>]+)>)/g
    let result = title.replace(regex, "")
    return result
  }

  createAnimateHover() {
    let elements = this.navElement.querySelectorAll('.on-nav-button-hover')
    TweenMax.set(elements, { x: '100%' })
  }

  onMouseOver(element) {
    TweenMax.to(element, .5, { x: '0%', ease: Power4.easeIn })
  }

  onMouseOut(element) {
    TweenMax.to(element, .5, { x: '100%' })
  }

  verifyCurrentSection() {
    let buttons = this.elementRef.nativeElement.querySelectorAll('li')
    this.onGlobalService.currentSection.subscribe((currentSection) => {
      let numberSection = currentSection.getAttribute('number');
      let button = buttons[numberSection - 1]
      this.setActiveButton(button)
      this.setVisitedButton(button);
    })
  }






}
