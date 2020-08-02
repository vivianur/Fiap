import { Directive, ElementRef, OnInit, Input, HostListener } from '@angular/core'

@Directive({
  selector: '[onBackgroundImageHeightFix]'
})
export class OnBackgroundImageHeightFixDirective implements OnInit {
  @Input() onBackgroundImageHeightFix
  element: any
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.element = document.getElementById(this.onBackgroundImageHeightFix)
    this.setHeight()
  }

  @HostListener('window:resize') onresize() {
    this.setHeight()
  }

  setHeight() {
    this.elementRef.nativeElement.style.height = this.element.offsetHeight + 'px'
  }

}
