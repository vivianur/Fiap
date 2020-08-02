import { Component, OnInit, AfterViewInit, ElementRef, HostListener } from '@angular/core'
import { OnGlobalService } from '../../providers/on-global.service'
import { OnSliderComponent } from '../../on-components/on-slider/on-slider.component'
import { TweenMax } from 'gsap'

/**
* @name OnFontSize
* @description
* Este componente gera um botão que fica flutuando a direita da página. Ele aumenta a
* fonte de todos os paragrafos tabelas e lista
* ```
*/

@Component({
  selector: 'on-font-size',
  templateUrl: './on-font-size.component.html'
})

export class OnFontSizeComponent implements OnInit, AfterViewInit {

  elements: any
  value: string = 'A+'
  isIncrease: boolean = false
  isMouseOver: boolean = false
  firstSectionId: number = 1

  constructor(
    private onGlobalService: OnGlobalService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.verifyIfIsFirstSection()
    this.toggleFontSize()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elements = [].slice.call(document.querySelectorAll('p, td, th, .on-list li'))
    }, 0)
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

  toggleFontSize() {
    this.elementRef.nativeElement.onclick = () => {
      this.isIncrease = !this.isIncrease
      this.onGlobalService.emitFontSize.emit(this.isIncrease)

      if(this.isIncrease) {
        this.value = 'A-'
        this.increaseFontSize()
      } else {
        this.value = 'A+'
        this.decreaseFontSize()
      }
    }
  }

  isMobile() {
    if(window.innerWidth < 1000) {
      return true;
    } else {
      return false;
    }
  }

  increaseFontSize() {
    if(this.isMobile()) {
      this.setFontSizeOfElements('1.1em');
    } else {
      this.increaseFontSizeOfElementsWithAnimation();
    }
  }

  decreaseFontSize() {
    if(this.isMobile()) {
      this.setFontSizeOfElements('1em');
    } else {
      this.decreaseFontSizeOfElementsWithAnimation();
    }
  }

  setFontSizeOfElements(size: string) {
    this.elements.forEach((element) => {
      element.style.fontSize = size;
    })
  }

  increaseFontSizeOfElementsWithAnimation() {
    this.elements.forEach((element) => {
      TweenMax.to(element, 1, { fontSize: '1.1em' }, 0.5);
    })
  }

  decreaseFontSizeOfElementsWithAnimation() {
    this.elements.forEach((element) => {
      TweenMax.to(element, 1, { fontSize: '1em', onComplete: () => {
        TweenMax.set(element, { clearProps: 'all' });
      }})
    })
  }

  showButton() {
    TweenMax.to(this.elementRef.nativeElement , .5, { autoAlpha: .65 })
  }

  hideButton() {
    TweenMax.to(this.elementRef.nativeElement , .5, { autoAlpha: 0 })
  }

}
