import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core'
import { OnGlobalService } from './../../providers/on-global.service'

/**
* @name OnSection
* @description
* Este componente cria uma sessão, ele sempre deve possuír o atributo `section-id`
*/

declare const ScrollMagic: any;

@Component({
  selector: 'on-section',
  templateUrl: './on-section.component.html'
})

export class OnSectionComponent implements OnInit {
  @Input() backgroundColor: string
  @Input('section-id') sectionId: any
  section: any

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService) { }

  ngOnInit() {
    this.section = this.elementRef.nativeElement;
    this.onGlobalService.sections.push(this.elementRef.nativeElement);
    this.setNumberOfSection();
  }

  ngAfterViewInit() {
    this.validateIfHasSectionId();
    this.validateIfSectionIdRepeat();
    this.createScenesOfScetions();

  }

  validateIfHasSectionId() {
    if(!this.sectionId || isNaN(this.sectionId)) {
      throw new TypeError('Section-id vazio ou inválido!')
    }
  }

  validateIfSectionIdRepeat() {
    this.onGlobalService.sections.forEach((section, i) => {
      let id = section.getAttribute('section-id')
      if(this.section !== section && this.sectionId == id)
        throw new TypeError('Section-id está repetido!')
    })
  }

  setNumberOfSection() {
    this.elementRef.nativeElement.setAttribute('number', this.onGlobalService.sections.length)
  }

  createScenesOfScetions() {
    let numberOfSection = this.section.getAttribute('number');
    let scene = new ScrollMagic.Scene({
      triggerElement: this.section,
      duration: 1
    })
    .triggerHook(numberOfSection == 1 ? 0 : 0.5)
    .on("enter leave", () => {
      this.onGlobalService.currentSection.emit(this.section);
    })
    .addTo(this.onGlobalService.scrollController);
  }

}
