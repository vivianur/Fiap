import { Component, OnInit, Input, ElementRef } from '@angular/core'
import { OnGlobalService } from '../../providers/on-global.service'
import { TweenMax } from 'gsap'
import * as $ from 'jquery'

/**
* @name OnTooltip
* @description
* Este componente cria um layout de tooltip em uma determinada palavra
*
* @usage
* ```html
*
* <on-tooltip description="Descrição do tooltip">tooltip</on-tooltip>
* ```
*/

@Component({
  selector: 'on-tooltip',
  templateUrl: './on-tooltip.component.html'
})

export class OnTooltipComponent implements OnInit {

  @Input() description: any
  tooltip: any
  tooltipElement: any
  isOpen: boolean
  isLocked: boolean
  isMouseOver: boolean
  time: number = .5
  setDescriptionPositionResize: any

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService
  ) { }

  ngOnInit() {
    this.tooltip = this.elementRef.nativeElement
    this.setDescriptionPositionResize = this.setDescriptionPosition.bind(this)
  }

  setDescriptionPosition() {
    let distanceFromElement = 10

    let contentWidth = window.innerWidth
    let contentHeight = window.innerHeight - this.onGlobalService.getMobileMenuHeight()
    let contentScrollTop = document.scrollingElement || document.documentElement

    let elementWidth = this.tooltip.offsetWidth
    let elementHeight = this.tooltip.offsetHeight

    let elementOffsetTop = $(this.tooltip).offset().top
    let elementOffsetLeft = $(this.tooltip).offset().left

    let descriptionWidth = this.tooltipElement.offsetWidth
    let descriptionHeight = this.tooltipElement.offsetHeight

    let viewportSpaceTop = elementOffsetTop - contentScrollTop.scrollTop
    let viewportSpaceBottom = contentHeight + contentScrollTop.scrollTop - elementOffsetTop - elementHeight

    if(viewportSpaceTop > viewportSpaceBottom) {
      this.tooltipElement.style.top = elementOffsetTop - distanceFromElement - descriptionHeight + 'px'
    } else {
      this.tooltipElement.style.top = elementOffsetTop + distanceFromElement + elementHeight + 'px'
    }

    if(window.innerWidth >= 768) {
      let descriptionOffsetLeft = (descriptionWidth - elementWidth) / 2
      if(descriptionOffsetLeft > elementOffsetLeft) {
        // Quando estoura na esquerda
        this.tooltipElement.style.left = elementOffsetLeft + 'px'
      } else if(contentWidth - elementOffsetLeft - elementWidth < descriptionOffsetLeft) {
        // Quando estoura na direita
        this.tooltipElement.style.left = elementOffsetLeft + elementWidth - descriptionWidth + 'px'
      } else {
        // Normal
        this.tooltipElement.style.left = elementOffsetLeft + elementWidth / 2 - this.tooltipElement.offsetWidth / 2 + 'px'
      }
    } else {
      // Largura menor que 768
      this.tooltipElement.style.left = ''
    }
  }

  open() {
    if(!this.isOpen && !this.isLocked) {
      this.isLocked = true
      this.tooltipElement = document.createElement('div')
      this.tooltipElement.setAttribute('class', 'on-tooltip-description')
      this.tooltipElement.innerHTML = this.description
      document.body.appendChild(this.tooltipElement)
      this.setDescriptionPosition()
      window.addEventListener('resize', this.setDescriptionPositionResize)
      TweenMax.from(this.tooltipElement, this.time, { opacity: 0, onComplete: () => {
        this.isOpen = true
        this.isLocked = false
        if(!this.isMouseOver) {
          this.close()
        }
      } })
    }
  }

  close() {
    if(this.isOpen && !this.isLocked) {
      this.isLocked = true
      window.removeEventListener('resize', this.setDescriptionPositionResize)
      TweenMax.to(this.tooltipElement, this.time, { opacity: 0, onComplete: () => {
        document.body.removeChild(this.tooltipElement)
        this.isOpen = false
        this.isLocked = false
        if(this.isMouseOver) {
          this.open()
        }
      } })
    }
  }

  onMouseOver() {
    this.open()
    this.isMouseOver = true
  }

  onMouseOut() {
    this.close()
    this.isMouseOver = false
  }

  onClick() {
    if(!this.isOpen && !this.isLocked) {
      this.isMouseOver = true
      this.open()
    } else if(this.isOpen && !this.isLocked) {
      this.isMouseOver = false
      this.close()
    }
  }

}
