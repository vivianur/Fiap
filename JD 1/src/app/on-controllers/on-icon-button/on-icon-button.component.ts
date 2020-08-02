import { Component, OnInit, HostListener } from '@angular/core';
import { OnGlobalService } from '../../providers/on-global.service';

@Component({
  selector: 'on-icon-button',
  templateUrl: './on-icon-button.component.html'
})
export class OnIconButtonComponent implements OnInit {

  numberOfSection: number = 0;
  message: string;
  icon: number = 0;


  constructor(private onGlobalService: OnGlobalService) { }

  ngOnInit() {
  }

  @HostListener('click')
  onClick() {
    this.scrollTo();
  };

  scrollTo() {
    this.onGlobalService.goToSection(this.numberOfSection);
  }

}
