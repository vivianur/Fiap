import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'on-read-more-item',
  templateUrl: './on-read-more-item.component.html'
})
export class OnReadMoreItemComponent implements OnInit {

  constructor() { }

  @Input() img: string;
  @Input() reference: string;
  @Input() link: string;

  ngOnInit() {
  }

}
