import { Component, OnInit, AfterViewInit, ElementRef, Input, HostListener } from "@angular/core";
import { OnGlobalService } from "./../../providers/on-global.service";
import { TweenMax, TimelineMax } from "gsap";

/**
* @name OnMapOfSectionComponent
* @description
* Este componente é utilizado para realizar a navegação do Capítulo através de um Mapa
*
* @usage
* ```html
<on-map-of-section [animation]="onMapOfSectionAnimation">
  <on-map-of-section-mobile>
    <object id="on-image-map-of-section">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="750px" height="500px" viewBox="0 0 750 500" style="enable-background:new 0 0 750 500;" xml:space="preserve"><g id="on-image-map-of-section-1" section="0" active="1"><rect x="28.5" y="26.5" class="on-image-map-of-section-name  st0" width="92" height="83"/></g><g id="on-image-map-of-section-2" section="1" active="0"><rect x="152.5" y="309.5" class="st0" width="92" height="83"/><line class="st1" x1="74.5" y1="109.5" x2="74.5" y2="360.5"/><line class="st1" x1="74.5" y1="360.5" x2="168.5" y2="360.5"/><rect x="69" y="405" class="st2 on-image-map-of-section-name" width="285" height="66"/></g><g id="on-image-map-of-section-3" section="2" active="0"><rect x="308.5" y="26.5" class="st0" width="92" height="83"/><line class="st1" x1="230" y1="350.5" x2="354" y2="350.5"/><line class="st1" x1="354.5" y1="351" x2="354.5" y2="110"/><rect x="427" y="10" class="st2 on-image-map-of-section-name" width="155" height="35"/></g></svg>
    </object>
  </on-map-of-section-mobile>
  <on-map-of-section-desktop>
    <object id="on-image-map-of-section">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="750px" height="500px" viewBox="0 0 750 500" style="enable-background:new 0 0 750 500;" xml:space="preserve"><g id="on-image-map-of-section-1" section="0" active="1"><rect x="28.5" y="26.5" class="on-image-map-of-section-name st0" width="92" height="83"/></g><g id="on-image-map-of-section-2" section="1" active="0"><rect x="152.5" y="309.5" class="st0" width="92" height="83"/><line class="st1" x1="74.5" y1="109.5" x2="74.5" y2="360.5"/><line class="st1" x1="74.5" y1="360.5" x2="168.5" y2="360.5"/><rect x="69" y="405" class="st2 on-image-map-of-section-name" width="285" height="66"/></g><g id="on-image-map-of-section-3" section="2" active="0"><rect x="308.5" y="26.5" class="st0" width="92" height="83"/><line class="st1" x1="230" y1="350.5" x2="354" y2="350.5"/><line class="st1" x1="354.5" y1="351" x2="354.5" y2="110"/><rect x="427" y="10" class="st2 on-image-map-of-section-name" width="155" height="35"/></g><g id="on-image-map-of-section-4" section="3" active="0"><rect x="596.5" y="360.5" class="st0" width="92" height="83"/><line class="st1" x1="393.5" y1="74.5" x2="642.5" y2="74.5"/><line class="st1" x1="642.5" y1="74.5" x2="642.5" y2="380.5"/><rect x="504.5" y="360.5" class="on-image-map-of-section-name st2" width="77.5" height="134.5"/></g></svg>
    </object>
  </on-map-of-section-desktop>
</on-map-of-section>
* ```
*ts```
  this.onMapOfSectionAnimation = {
    duration: .8,
    setProperties: {attr: {"stroke-opacity": 0.3, "fill-opacity": 0.3 }},
    setPropertiesName: {attr: {"stroke-opacity": 0, "fill-opacity": 0 }},
    toPropertiesGroup: {attr: {"stroke-opacity": 1, "fill-opacity": 1 }},
    toPropertiesName: {attr: {"stroke-opacity": 1, "fill-opacity": 1 }},
    classNameOfSection: '.on-image-map-of-section-name'
  };
*```
*/

export interface OnMapOfSectionAnimation {
  duration: number;
  properties: any;
}

@Component({
  selector: "on-map-of-section",
  templateUrl: "./on-map-of-section.component.html"
})
export class OnMapOfSectionComponent implements OnInit, AfterViewInit {
  buttons: any[] = [];
  isResponsive: boolean = true;
  @Input() animation: OnMapOfSectionAnimation;

  constructor(
    private onGlobalService: OnGlobalService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.verifyIfIsResponsive();
  }

  ngAfterViewInit() {
    this.createProprietiesOfButtons();
    this.verifyButtonActivited();
    this.verifyIfIsClickOrHoverEventsInButton();
    this.setEventClickInTitles();
    this.verifyIfSectionWasChange();
  }

  createProprietiesOfButtons() {
    let sections = [].slice.call(
      this.elementRef.nativeElement.querySelectorAll("[section]")
    );
    let titles = [].slice.call(
      this.elementRef.nativeElement.querySelectorAll("[title]")
    );
    sections = this.sortElements(sections, "section");
    titles = this.sortElements(titles, "title");

    for (let i in sections) {
      this.buttons[i] = {
        element: sections[i],
        section: i,
        animationButtons: this.createAnimationOfButtons(sections[i], titles[i]),
        isActive: sections[i].getAttribute("active"),
        title: titles[i]
      };

      this.hiddenTitle(titles[i]);
    }
  }

  sortElements(elements: any[], attribute: string) {
    return elements.sort(
      (a, b) =>
        parseInt(a.getAttribute(attribute)) -
        parseInt(b.getAttribute(attribute))
    );
  }

  verifyIfIsResponsive() {
    if (window.innerWidth < 768) {
      this.isResponsive = true;
    } else {
      this.isResponsive = false;
    }
  }

  verifyButtonActivited() {
    for (let i in this.buttons) {
      let index = parseInt(i);
      if (this.buttons[index].isActive == 1) {
        this.verifyIfButtonsCheckedBeforeIsActivating(index);
      }
    }
  }

  verifyIfIsClickOrHoverEventsInButton() {
    this.setEventClickInButtons();
    if(!this.isResponsive) {
      this.setEventHoverInButtons();
    }
  }

  setEventClickInButtons() {
    this.buttons.forEach((button, index) => {
      button.element.onclick = () => {
        this.verifyIfButtonsCheckedBeforeIsActivating(index).then(() => {
          if(this.isResponsive) return;
          this.scrollToSection(button.section);
        });;
      };
    });
  }

  setEventHoverInButtons() {
    let buttonWasChecked = {
      title: null,
      button: null
    };
    let isChecked = false;

    this.buttons.forEach((button, index) => {
      button.element.onmouseover = () => {
        if(!isChecked) {
          buttonWasChecked.button = button;
          buttonWasChecked.title = this.buttons[index].title;
          isChecked = true;
        }

        if(buttonWasChecked !== button) {
          this.hiddenTitle(buttonWasChecked.title);
          this.showTitle(this.buttons[index].title);

          buttonWasChecked.button = button;
          buttonWasChecked.title = this.buttons[index].title;
        }
      };

      button.element.onmouseout = () => {
        this.hiddenTitle(this.buttons[index].title);
      }
    });
  }

  setEventClickInTitles() {
    this.buttons.forEach((button, index) => {
      button.title.onclick = () => {
        this.verifyIfButtonsCheckedBeforeIsActivating(index).then(() => {
          this.scrollToSection(button.section);
        });
      };
    });
  }

  verifyIfButtonsCheckedBeforeIsActivating(index: number) {
    return new Promise((resolve) => {
      let count = 0;
      let recursionOfAnimation = () => {
        if (count <= index) {
          this.buttons[count].animationButtons.play();
          this.setButtonStatus(this.buttons[count], 1);
          this.buttons[count].animationButtons.addCallback(() => {
            count++;
            recursionOfAnimation();
          });
        } else {
          this.setButtonStatus(this.buttons[index], 1);
          this.hiddenAllTitles();
          this.showTitle(this.buttons[index].title);
          resolve();
        }
      };
      recursionOfAnimation();
    });
  }

  createAnimationOfButtons(group, title) {
    let animation = new TimelineMax({ paused: true });
    for (let i in this.animation.properties) {
      let elements = group.querySelectorAll(i);
      if (elements) {
        animation.add(
          new TimelineMax().from(
            elements,
            this.animation.duration,
            this.animation.properties[i]
          )
        );
      }
    }
    return animation;
  }

  showTitle(title) {
    return new TimelineMax().to(title, this.animation.duration, {
      autoAlpha: 1,
      y: 0
    });
  }

  hiddenTitle(title) {
    return new TimelineMax().to(title, this.animation.duration, {
      autoAlpha: 0,
      y: 5
    });
  }

  hiddenAllTitles() {
    this.buttons.forEach(button => {
      this.hiddenTitle(button.title);
    });
  }

  scrollToSection(id: string) {
    this.onGlobalService.goToSection(id);
  }

  setButtonStatus(button, isActive: number) {
    button.isActive = isActive;
    button.element.setAttribute("active", isActive);
  }

  verifyIfSectionWasChange() {
    this.onGlobalService.currentSection.subscribe(currentSection => {
      let numberOfSection = currentSection.getAttribute("number") - 1;
      let button = this.buttons.filter(
        button => button.section == numberOfSection
      );
      if (button[0] && button[0].isActive == 0) {
        button[0].animationButtons.play();
      }
    });
  }

  // @HostListener('window:resize', ['$event']) onResize($event) {
  //   this.verifyIfIsResponsive();
  // }
}
