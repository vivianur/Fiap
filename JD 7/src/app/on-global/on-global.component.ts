import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core'
import { TimelineMax } from "gsap"
import { OnGlobalService } from '../providers/on-global.service'
import { OnNavigationService } from '../providers/on-navigation.service'
import { OnSvgResize } from '../on-utils/on-svg-resize'

declare const leituraHTML: any;

/**
* @name OnGlobal
* @description
* Componente global responsável por emitir as sessões atuais, dar o resize nos SVGs e emitir
* as sessões para a plataforma
*/

@Component({
  selector: 'on-global',
  templateUrl: './on-global.component.html',
})

export class OnGlobalComponent implements OnInit, AfterViewInit {
  sections: any
  scrollingElement: any

  constructor(
    private onGlobalService: OnGlobalService
  ) {
  }

  ngOnInit() {
    this.onGlobalService.setCopyAndPaste(false);
    this.sections = this.onGlobalService.sections;
    this.scrollingElement = document.scrollingElement || document.documentElement;

  }

  ngAfterViewInit() {
    this.resizeAllSvgs();
    this.setSectionInPlatform();
    this.setBackgroundShapes();
  }

  @HostListener('window:resize') onResize() {
    this.resizeAllSvgs();
  }

  resizeAllSvgs() {
    setTimeout(() => {
      let svgs = document.querySelectorAll('svg')
      for(let i = 0; i < svgs.length; i++)
        new OnSvgResize(svgs[i])
    })
  }

  setSectionInPlatform() {
    this.sections.forEach((section, i) => {
      leituraHTML.setCapitulo(parseInt(section.getAttribute("section-id")));
    });
  }

  setBackgroundShapes(){
    let backgroundShapes = document.querySelectorAll("on-section.on-background-shapes");
    let backgroundShapesLength = backgroundShapes.length;
    let shapeNumber = 1;
    for (let count = 0; count < backgroundShapesLength; count++){
      if (shapeNumber > 3){
        shapeNumber = 1;
      }
      backgroundShapes[count].classList.add("on-background-shapes-" + shapeNumber + "");
      shapeNumber++;
    }
  }
}
