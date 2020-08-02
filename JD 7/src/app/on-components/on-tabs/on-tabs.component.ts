import { Component, AfterViewInit, AfterContentInit, ElementRef } from '@angular/core'

/**
* @name OnTabs
* @description
* Este componente cria um layout em tabs. Ele depende do`<on-tabs-nav>`
* contendo uma lista, e do `<on-tabs-contents> contendo uma <div>`
*
* @usage
* ```html
*
* <on-tabs>
*    <on-tab title="Lorem ipsum 1">
*      <p>
*        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa corrupti repellendus    *        non, consequatur modi provident itaque! Fugiat suscipit, ut eveniet esse alias natus  *        quo amet optio maiores quos sapiente. Qui?
*      </p>
*    </on-tab>
*    <on-tab title="Lorem ipsum 2">
*      <p>
*        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa corrupti repellendus    *        non, consequatur modi provident itaque! Fugiat suscipit, ut eveniet esse alias natus   *        quo amet optio maiores quos sapiente. Qui?
*      </p>
*      <p>
*        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa corrupti repellendus    *        non, consequatur modi provident itaque! Fugiat suscipit, ut eveniet esse alias natus  *        quo amet optio maiores quos sapiente. Qui?
*      </p>
*    </on-tab>
*  </on-tabs>
* ```
*/

@Component({
  selector: 'on-tabs',
  templateUrl: './on-tabs.component.html'
})

export class OnTabsComponent implements AfterViewInit, AfterContentInit {

  nav: any = []
  tabs: any = []

  constructor(private elementRef: ElementRef) { }

  ngAfterContentInit() {
    this.tabs = [].slice.call(this.elementRef.nativeElement.querySelectorAll('on-tab'))
  }

  ngAfterViewInit() {
    this.nav = [].slice.call(this.elementRef.nativeElement.querySelectorAll('.on-tabs-nav ul li'))

    this.setAllTabsAttributesIds()
    this.setAllTabsAttributesActive()
    this.executeTab(0)
  }

  executeTab(index) {
    this.setTabOptionInactive()
    this.seTabOptionActive(index)
    this.setTabContentInactive()
    this.setTabContentActive(index)
  }

  setAllTabsAttributesIds() {
    this.tabs.forEach((tab, i) => {
      tab.setAttribute('id', i + 1)
    })
  }

  setAllTabsAttributesActive() {
    this.tabs.forEach((tab, i) => {
      tab.setAttribute('active', 0)
    })
  }

  setTabOptionInactive() {
    this.nav.forEach((option) => {
      option.setAttribute('active', 0)
    })
  }

  seTabOptionActive(i) {
    this.nav[i].setAttribute('active', 1)
  }

  setTabContentInactive() {
    this.tabs.forEach((tab) => {
      tab.setAttribute('active', 0)
    })
  }

  setTabContentActive(i) {
    this.tabs[i].setAttribute('active', 1)
  }


}
