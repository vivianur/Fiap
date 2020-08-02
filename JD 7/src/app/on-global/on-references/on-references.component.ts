import { Component, OnInit, ElementRef } from '@angular/core'
import { TimelineMax, TweenMax } from 'gsap'

/**
* @name OnReferences
* @description
* Este componente gera uma layout de refêrencias. Ele é sempre utilizado na útima sessão,
* antes do content-switch
*
* @usage
* ```html
*
* <on-references>
*    <ul class="on-list">
*      <li>SOBRENOME, Nome do autor. Título do livro. Local da edição: Editora, ano</li>
*      <li>SOBRENOME, Nome do autor. Título do que foi consultado. ano da publicação. Disponível em:. Acesso em: dia mês ano.</li>
*      <li>SOBRENOME, Nome do autor. Título do que foi consultado. ano da publicação. Disponível em:. Acesso em: dia mês ano.</li>
*    </ul>
* </on-references>
* ```
*/

@Component({
  selector: 'on-references',
  templateUrl: './on-references.component.html'
})

export class OnReferencesComponent implements OnInit {

  isOpen: boolean = false
  isLock: boolean = false
  referencesContent: any
  referencesTitle: any
  referencesButtonOpen: any
  referencesButtonClose: any
  referencesContentItems: any
  animationTime: number = 1
  animationTimeSequence: number = .3

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.referencesContent = this.elementRef.nativeElement.querySelector('.on-references-content')
    this.referencesTitle = this.elementRef.nativeElement.querySelector('.on-references-content-title')
    this.referencesButtonOpen = this.elementRef.nativeElement.querySelector('.on-references-button-open')
    this.referencesButtonClose = this.elementRef.nativeElement.querySelector('.on-references-button-close')
    this.referencesContentItems = this.elementRef.nativeElement.querySelectorAll('.on-references-content li')
    this.close()
  }

  open() {
    if(this.isLock)
      return null
    else
      this.isLock = true

    const animationItems = new TimelineMax()
      .staggerFrom(this.referencesContentItems, this.animationTime, { y: '100%', opacity: 0 }, this.animationTimeSequence)

    const animationReference = new TimelineMax()
      .set(this.referencesContent, { clearProps: 'all' })
      .set(this.referencesTitle, { clearProps: 'all' })
      .to(this.referencesButtonOpen, this.animationTime / 2, { autoAlpha: 0 })
      .to(this.referencesContent, this.animationTime, { y: -50 }, 'a')
      .from(this.referencesContent, this.animationTime, { autoAlpha: 0, height: 0, onComplete: () => {
        TweenMax.set(this.referencesContent, { height: 'auto' })
      }}, 'a')
      .add(animationItems, 'a')
      .from(this.referencesTitle, animationItems.duration(), { width: '0%' }, 'a')
      .from(this.referencesButtonClose, this.animationTime, { rotation: 90, autoAlpha: 0, onComplete: () => {
        this.isLock = false
      }})

    animationReference.play()
  }

  close() {
    if(this.isLock)
      return null
    else
      this.isLock = true

    new TimelineMax()
      .set(this.referencesButtonOpen, { clearProps: 'all' })
      .to(this.referencesContent, this.animationTime / 2, { autoAlpha: 0 })
      .to(this.referencesContent, this.animationTime, { autoAlpha: 0, height: 0 })
      .from(this.referencesButtonOpen, this.animationTime, { autoAlpha: 0, onComplete: () => this.isLock = false })
  }

}
