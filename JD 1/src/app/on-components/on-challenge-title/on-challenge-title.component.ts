import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'on-challenge-title',
  templateUrl: './on-challenge-title.component.html'
})
export class OnChallengeTitleComponent implements OnInit {

  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
