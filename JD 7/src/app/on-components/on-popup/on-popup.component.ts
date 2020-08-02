import { Component, OnInit, Input, ElementRef, EventEmitter, HostListener } from '@angular/core';
import { OnGlobalService } from './../../providers/on-global.service';
import { TweenMax } from 'gsap';
import { OnToastController } from './../../on-controllers/on-toast/on-toast.controller';

/**
* @name OnPopup
* @description
* Este componente cria um layout de popup
*
* @usage
* ```html
*
* <on-popup class="on-background-color-gray-light" button-open="on-popup-button-open" button-close="on-popup-button-close">
*  <on-section-container>
*    <on-section-content>
*      <button id="on-popup-button-close" class="on-game-button-previous"></button>
*    </on-section-content>
*    </on-section-container>
* </on-popup>
* ```
*/


@Component({
  selector: "on-popup",
  templateUrl: "./on-popup.component.html"
})
export class OnPopupComponent implements OnInit {
  @Input("button-open") buttonOpen;
  @Input("button-close") buttonClose;
  @Input("isResponsive") isResponsive: boolean = true;
  isLocked: boolean;
  isOpen: boolean;
  popup: any;
  transitionTime: number = 1;

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService,
    private onToastController: OnToastController
  ) {}

  ngOnInit() {
    this.popup = this.elementRef.nativeElement;
    this.buttonOpen = document.getElementById(this.buttonOpen);
    this.buttonClose = document.getElementById(this.buttonClose);
    this.init();
  }

  @HostListener("window:resize")
  resizePopup() {
    this.close();
  }

  init() {
    this.popup.style.display = "none";
    this.onGlobalService.isPopupOpen.emit(false);
    this.addButtonClickEvent(this.buttonOpen);
    this.addButtonClickEvent(this.buttonClose);
  }

  verifyIfIsOpen() {
    return new Promise((resolve, reject) => {
      !this.isLocked && !this.isOpen ? resolve(false) : resolve(true);
    });
  }

  verifyIfIsResposive() {
    return new Promise((resolve, reject) => {
      !this.isResponsive && window.innerWidth < 768 ? reject() : resolve();
    });
  }

  open() {
    this.isLocked = true;
    this.isOpen = true;

    TweenMax.set(this.popup, { display: "block", opacity: 1 });
    this.onGlobalService.isPopupOpen.emit(true);
    TweenMax.from(this.popup, this.transitionTime, {
      opacity: 0,
      onStart: () => {
        document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        this.isLocked = false;
      }
    });
  }

  close() {
    this.isLocked = true;
    this.isOpen = false;

    this.onGlobalService.isPopupOpen.emit(false);
    TweenMax.to(this.popup, this.transitionTime, {
      opacity: 0,
      onComplete: () => {
        TweenMax.set(this.popup, { display: "none" });
        this.isLocked = false;
        document.body.removeAttribute("style");
      }
    });
  }

  addButtonClickEvent(button) {
    return new Promise(resolve => {
      button.onclick = () => {
        Promise.all([this.verifyIfIsOpen(), this.verifyIfIsResposive()])
        .then(isOpen => {
          if(isOpen[0])
            this.close();
          else
            this.open();
        })
        .catch(() => {
          this.onToastController.create({
            message:
              "Este jogo interativo só é permitido em dispositivos maiores que 768px",
            duration: 3000
          });
        });
      };
    });
  }
}
