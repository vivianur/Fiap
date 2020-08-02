import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'on-timeline-process-item',
  templateUrl: './on-timeline-process-item.component.html'
})

export class OnTimelineProcessItemComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
