import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { TweenMax } from 'gsap'

@Component({
  selector: 'on-timeline-vertical-item',
  templateUrl: './on-timeline-vertical-item.component.html'
})
export class OnTimelineVerticalItemComponent implements OnInit {

  @Input() date: string
  isLocked: boolean
  isOpen: boolean = true
  transitionTime: number = 1
  element: any
  content: any

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.element = this.elementRef.nativeElement
    this.content = this.elementRef.nativeElement.querySelector('.on-timeline-vertical-item-content')
    this.openOrClose()
  }

  open() {
    this.isLocked = true
    this.element.classList.add('on-timeline-vertical-item-open')

    TweenMax.set(this.content, { height: 'auto' })
    TweenMax.from(this.content, this.transitionTime, { height: 0, onComplete: () => {
      this.isOpen = true
      this.isLocked = false
    } })

  }

  close() {
    this.isLocked = true
    this.element.classList.remove('on-timeline-vertical-item-open')

    TweenMax.to(this.content, this.transitionTime, { height: 0, onComplete: () => {
      this.isOpen = false
      this.isLocked = false
    } })
  }

  openOrClose() {
    if(this.isLocked) return

    if(this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }
}
