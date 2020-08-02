import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'on-item',
  templateUrl: './on-item.component.html'
})
export class OnItemComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {

  }

}
