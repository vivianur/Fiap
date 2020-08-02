import { Component, OnInit, ElementRef } from '@angular/core'
import { OnNavigationService } from '../../providers/on-navigation.service'

/**
* @name OnNavButton
* @description
* Este componente gera o botão do menu de navegação
* ```
*/

@Component({
  selector: 'on-nav-button',
  templateUrl: './on-nav-button.component.html'
})

export class OnNavButtonComponent implements OnInit {
  isOpen: boolean

  constructor(
    private elementRef: ElementRef,
    private onNavigationService: OnNavigationService) {
      this.isOpen = false
      this.onNavigationService.isOpenNav.emit(this.isOpen)
  }

  ngOnInit() {
    this.openNav()
  }

  openNav() {
    this.elementRef.nativeElement.onclick = () => {
      this.isOpen = true
      this.onNavigationService.isOpenNav.emit(this.isOpen)
    }
  }

}
