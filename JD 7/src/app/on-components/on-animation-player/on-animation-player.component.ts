import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core'
import { OnGlobalService } from '../../providers/on-global.service'
import { TweenMax } from 'gsap'
import * as $ from 'jquery'

/**
* @name OnAnimationPlayer
* @description
* Este componente é utilizado para animações
*
* @usage
* ### HTML
* ```html
*
* <on-animation-player
*    id="on-image-infografico"
*    [animation]="onImageInfografico"
*    (outputAnimation)="onAnimationInfografico = $event"
*    figcaption="Animação de teste"
*    [onAction]="onActionInfografico"
*    [chapterSwitch]="true">
*
* </on-animation-player>
* ```
* ### Typescript
* ```ts
*
* onAnimationInfografico: any
* onImageInfografico: any
* onActionInfografico: any
*
* ngOnInit() {
*   this.onImageInternetUmMinuto = new TimelineMax({ paused: true })
* }
* ```
*/

@Component({
  selector: 'on-animation-player',
  templateUrl: './on-animation-player.component.html'
})

export class OnAnimationPlayerComponent implements OnInit {

  @Input('figcaption') figureCaption: any
  @Input() animation: any
  @Output() outputAnimation: EventEmitter<any> = new EventEmitter()

  playerProgressLine: any
  playerProgressLineFill: any
  playerProgressLineTrack: any
  playerProgressLineTrackLeft: any
  playerButtonPlay: any
  playerButtonPause: any
  leftInPercentage: any

  windowToX: any
  windowFromX: any

  constructor(
    private onGlobalService: OnGlobalService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.getPlayerProgressElements()
    this.animation.eventCallback('onStart', this.animationPlay.bind(this))
    this.animation.eventCallback('onUpdate', this.setPlayerProgressLineTrackLeft.bind(this))
    this.animation.eventCallback('onComplete', this.animationPause.bind(this))
    this.outputAnimation.emit(this)
  }

  getPlayerProgressElements() {
    this.playerProgressLine = this.elementRef.nativeElement.querySelector('.on-animation-player-progress-line')
    this.playerProgressLineFill = this.elementRef.nativeElement.querySelector('.on-animation-player-progress-line-fill')
    this.playerProgressLineTrack = this.elementRef.nativeElement.querySelector('.on-animation-player-progress-line-track')
    this.playerButtonPlay = this.elementRef.nativeElement.querySelector('.on-animation-player-button-play')
    this.playerButtonPause = this.elementRef.nativeElement.querySelector('.on-animation-player-button-pause')
  }

  getPlayerProgressInnerSpace() {
    return this.playerProgressLine.scrollWidth - this.playerProgressLineTrack.scrollWidth
  }

  getPlayerProgressTrackLeftInPixel = function() {
    let x = parseFloat(this.playerProgressLineTrackLeft) || 0
    x /= 100
    x *= this.playerProgressLine.scrollWidth
    return x
  }

  setPlayerProgressLineBackground(leftInPercentage) {
    this.playerProgressLineFill.style.width = leftInPercentage

  }

  setPlayerProgressLineTrackLeft() {
    this.leftInPercentage = ((this.getPlayerProgressInnerSpace() * this.animation.progress()) / this.playerProgressLine.scrollWidth) * 100 + '%'
    this.setPlayerProgressLineBackground(this.leftInPercentage)
    TweenMax.to(this.playerProgressLineTrack, 0, { left: this.leftInPercentage })
  }

  animationPlay() {
    this.playerButtonPlay.classList.add('on-hide')
    this.playerButtonPause.classList.remove('on-hide')
    this.animation.play()
  }

  animationPause() {
    this.playerButtonPause.classList.add('on-hide')
    this.playerButtonPlay.classList.remove('on-hide')
    this.animation.pause()
  }

  animationRestart() {
    this.playerButtonPlay.classList.add('on-hide')
    this.playerButtonPause.classList.remove('on-hide')
    this.animation.restart()
  }

  onAnimationLine($event) {
    let movePlayerProgressLineTrackBind = movePlayerProgressLineTrack.bind(this)
    let dropPlayerProgressLineTrackBind = dropPlayerProgressLineTrack.bind(this)

    if($event.touches)
      mobileAnimationLine.bind(this)()
    else
      desktopAnimationLine.bind(this)()

    function desktopAnimationLine() {
      this.animationPause()
      this.playerProgressLineTrackLeft = (($event.pageX - $(this.playerProgressLine).offset().left - 4) / this.playerProgressLine.offsetWidth * 100) + '%'
      this.windowFromX = $event.pageX
      this.playerProgressLineTrack.classList.add('on-animation-player-progress-line-track-scaled')
      movePlayerProgressLineTrackBind($event)
      document.addEventListener('mousemove', movePlayerProgressLineTrackBind)
      document.addEventListener('mouseup', dropPlayerProgressLineTrackBind)
    }

    function mobileAnimationLine() {
      this.playerProgressLineTrackLeft = (($event.touches[0].pageX - $(this.playerProgressLine).offset().left - 4) / this.playerProgressLine.offsetWidth * 100) + '%'
      this.windowFromX = $event.touches[0].pageX
      this.playerProgressLineTrack.classList.add('on-animation-player-progress-line-track-scaled')
      movePlayerProgressLineTrackBind($event)
      document.addEventListener('touchmove', movePlayerProgressLineTrackBind)
      document.addEventListener('touchend', dropPlayerProgressLineTrackBind)
    }

    function movePlayerProgressLineTrack($event) {
      if($event.pageX)
        this.windowToX = $event.pageX
      else
        this.windowToX = $event.touches[0].pageX

      let leftInPixel = this.getPlayerProgressTrackLeftInPixel() + this.windowToX - this.windowFromX
      let minLeft = 0
      let maxLeft = this.getPlayerProgressInnerSpace()

      if(leftInPixel < minLeft)
        leftInPixel = minLeft
      else if(leftInPixel > maxLeft)
        leftInPixel = maxLeft

      let leftInPercentage = (leftInPixel / this.playerProgressLine.scrollWidth) * 100 + '%'
      this.playerProgressLineTrack.style.left = leftInPercentage

      this.setPlayerProgressLineBackground(leftInPercentage)

      let animationProgress = leftInPixel / (this.playerProgressLine.scrollWidth - this.playerProgressLineTrack.scrollWidth)
      this.animation.progress(animationProgress)
    }

    function dropPlayerProgressLineTrack() {
      this.animationPlay()
      this.playerProgressLineTrackLeft = this.playerProgressLineTrack.style.left
      this.playerProgressLineTrack.classList.remove('on-animation-player-progress-line-track-scaled')
      document.removeEventListener('mousemove', movePlayerProgressLineTrackBind)
      document.removeEventListener('mouseup', dropPlayerProgressLineTrackBind)
      document.removeEventListener('touchmove', movePlayerProgressLineTrack)
      document.removeEventListener('touchend', dropPlayerProgressLineTrack)
    }
  }

}
