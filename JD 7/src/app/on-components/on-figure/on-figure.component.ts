import { Component, AfterViewInit, AfterViewChecked, Input, ElementRef, HostListener } from '@angular/core'
import { OnGlobalService } from './../../providers/on-global.service'
import { OnLightBoxController } from "../../on-controllers/on-lightbox/on-light-box.controller"
import { TweenMax } from 'gsap'

/**
* @name OnFigure
* @description
* Este componente cria um layout para imagens com sua legenda. O componente deve ter o atributo descripition, porém
* ele possuí opcionalmente os atributos `overflow` e `z-index`. No atributo overflow deve ser uma string com
* sua direção, exemplo `overflow="<right || left>"`. No atributo z-index deve ser um valor boolean, exemplo
* `z-index="<true || false>"`
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
    this.removeSomeTagsHTMLToDescription();
    this.removeDotInDescription();
    this.description = `Fig.${count} - ${this.imageDescription}`;
  }

  removeAllTagsHTMLToAltAndTitle() {
    let regex = /(<([^>]+)>)/gi;
    this.imageDescriptionWithoutTags = this.imageDescription.replace(regex, "");
  }

  removeSomeTagsHTMLToDescription() {

  }

  removeDotInDescription() {
    if (this.imageDescription[this.imageDescription.length - 1] === '.' && this.imageDescription.indexOf("...") != (this.imageDescription.length - 3)){
      this.imageDescription = this.imageDescription.slice(0, -1);
    }
  }
  /*
  setFigureDescription() {
    let onFigure = document.querySelectorAll("on-figure");
    let onFigureLength = onFigure.length;
    let figCaption = "";
    let endPosition = null;
    let onFigureFigCaption = null;
    let img = null;
    for (let cont = 0; cont < onFigureLength; cont++) {
      figCaption = onFigure[cont].getAttribute("description").toString();
      if (figCaption !== null && figCaption.trim() !== "") {
        figCaption = figCaption.replace(/<[^i|b]/g, '&lt;$&').replace(/&lt;</g, "&lt;").replace(/&lt;\/i>/g, "</i>").replace(/&lt;\/b>/g, "</b>");
        endPosition = figCaption.length;
        if (figCaption.indexOf("...") != (figCaption.length - 3)) {
          if (figCaption.charAt(figCaption.length - 1) === ".") {
            endPosition = figCaption.length - 1;
          }
        }
        figCaption = figCaption.substr(0, endPosition).trim();
        onFigureFigCaption = onFigure[cont].querySelector("figure figcaption");
        onFigureFigCaption.innerHTML = figCaption;
        img = onFigure[cont].querySelector("figure img");
        img.setAttribute("alt", onFigureFigCaption.textContent);
        img.setAttribute("title", onFigureFigCaption.textContent);
      }
    }    
  }
  */

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

