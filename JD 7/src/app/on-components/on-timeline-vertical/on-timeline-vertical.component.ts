import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'on-timeline-vertical',
  templateUrl: './on-timeline-vertical.component.html'
})
export class OnTimelineVerticalComponent implements OnInit {

  @Input() startText: string = "Início";
  @Input() endText: string = "Fim";

  constructor() { }

  ngOnInit() {
  }

}
