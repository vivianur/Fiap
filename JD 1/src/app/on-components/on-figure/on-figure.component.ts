import { Component, AfterViewInit, AfterViewChecked, Input, ElementRef, HostListener } from '@angular/core'
import { OnGlobalService } from './../../providers/on-global.service'
import { OnLightBoxController } from "../../on-controllers/on-lightbox/on-light-box.controller"
import { TweenMax } from 'gsap'

/**
* @name OnFigure
* @description
* Este componente cria um layout para imagens com sua legenda. O componente deve ter o atributo descripition, porém
* ele possuí opcionalmente os atributos `overflow` e `z-index`. No atributo overflow deve ser uma string com
*
* @usage
* ```html
*
* <on-figure img="assets/content/images/on-image-exemplo.jpg" description="Exemplo"></on-figure>
* ```
*/

@Component({
  selector: "on-figure",
  templateUrl: "./on-figure.component.html"
})
export class OnFigureComponent implements AfterViewInit, AfterViewChecked {
  isImageOpen: boolean;
  body: any;
  onCustom: any;
  imagePopup: any;
  imageDescriptionWithoutTags: string;
  description: string;
  img: any;
  figcaption: any;

  @Input("img") imageName: string;
  @Input("description") imageDescription: string;
  /*Atributos opcionais de listas de palavras para estilizar*/
  @Input("italics") italics?: Array<string>;
  @Input("bolds") bolds?: Array<string>;


  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService,
    private onLightBoxController: OnLightBoxController
  ) {}

  ngAfterViewInit() {
    this.body = document.body;
    this.resizeFigcaption();
  }

  ngAfterViewChecked() {
    this.resizeFigcaption();
  }

  @HostListener("window:resize", ["$event"])
  onResize($event) {
    this.resizeValidation();
  }

  countFigures(count) {
    this.removeAllTagsHTMLToAltAndTitle();
    this.removeDotInDescription();
    this.removeSomeTagsHTMLToDescription();
    this.description = `Fig.${count} - ${this.imageDescription}`;
  }

  removeAllTagsHTMLToAltAndTitle() {
    let regex = /(<([^>]+)>)/gi;
    this.imageDescriptionWithoutTags = this.imageDescription;
  }

  removeSomeTagsHTMLToDescription() {
    let tag = "";
    this.imageDescription = this.imageDescription.replace(/[<]/g, "&lt;").replace(/[>]/g, "&gt;");
    for(let types = 0; types < 2; types++){
      let words = (types === 0 ? (tag = "<i>", this.italics) : (tag = "<b>", this.bolds));

      /*Tratamento de undefinded devido opcionalidade*/
      for (let count = 0; words && count < words.length; count++) {
        words[count] = words[count].replace(/[<]/g, "&lt;").replace(/[>]/g, "&gt;");
        if (this.imageDescription.indexOf(words[count]) !== -1) {
          this.imageDescription = this.imageDescription.replace(words[count], tag + words[count] + tag.replace("<", "</"));
        }
      }
    }
  }

  removeDotInDescription() {
    if (this.imageDescription[this.imageDescription.length - 1] === '.' && this.imageDescription.indexOf("...") != (this.imageDescription.length - 3)){
      this.imageDescription = this.imageDescription.slice(0, -1);
    }
  }

  resizeFigcaption() {
    this.figcaption = this.elementRef.nativeElement.querySelector("figcaption");
    this.img = this.elementRef.nativeElement.querySelector("img");

    this.img.onload = () => {
      this.figcaption.style.width = this.img.clientWidth + "px";
    };

    if (this.img.complete) {
      this.figcaption.style.width = this.img.clientWidth + "px";
    }
  }

  resizeValidation() {
    if (window.innerWidth < 768 && this.isImageOpen) {
      this.closeImage();
    }
  }

  openImage($event) {
    if (window.innerWidth >= 768) {
      $event.preventDefault();
      this.onLightBoxController.create(this.img.outerHTML);
      this.isImageOpen = true;
    }
  }

  closeImage() {
    this.onLightBoxController.destroy();
  }
}

