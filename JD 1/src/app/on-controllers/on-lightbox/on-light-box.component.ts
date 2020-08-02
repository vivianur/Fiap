import { Component, ElementRef, OnInit, Input, Output, EventEmitter, HostListener } from "@angular/core";
import { TweenMax } from "gsap";

@Component({
  selector: "on-light-box",
  templateUrl: "./on-light-box.component.html"
})
export class OnLightBoxComponent implements OnInit {
  animationTime: number = 0.5;
  @Output() checkClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(public elementRef: ElementRef) {}

  ngOnInit() {
    TweenMax.from(this.elementRef.nativeElement, this.animationTime, {
      autoAlpha: 0
    });
    this.verifyClose();
  }

  @HostListener("document:keyup", ["$event"])
  pressKeyEsc($event) {
    if($event.keyCode === 27) {
      this.checkClose.emit()
    }
  }

  beforeOnDestroy() {
    return new Promise(resolve => {
      TweenMax.to(this.elementRef.nativeElement, this.animationTime, {
        autoAlpha: 0,
        onComplete: () => resolve()
      });
    });
  }

  verifyClose() {
    this.elementRef.nativeElement.onclick = () => {
      this.checkClose.emit();
    };
  }
}
