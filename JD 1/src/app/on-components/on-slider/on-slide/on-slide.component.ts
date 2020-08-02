import { Component, OnInit, Input } from "@angular/core";

/**
* @name OnSlide
* @description
* Este componente é dependente do componente `on-slider`
*/

@Component({
  selector: 'on-slide',
  templateUrl: './on-slide.component.html'
})

export class OnSlideComponent implements OnInit {

  @Input() thumb: string;

  constructor() { }

  ngOnInit() {
  }
}
