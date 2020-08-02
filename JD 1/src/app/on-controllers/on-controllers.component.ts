import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core'
import { OnControllersService } from './on-controllers.service'

/**
* @name OnControllers
* @description
* Este componente é responsável por gerar todos os componentes de controlle da template
*
*/

@Component({
  selector: 'on-controllers',
  templateUrl: './on-controllers.component.html'
})

export class OnControllersComponent implements OnInit {

  @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef

  constructor(
    public viewContainerRef: ViewContainerRef,
    private onControllersService: OnControllersService) {
      this.onControllersService.build(this)
  }

  ngOnInit() {

  }
}
