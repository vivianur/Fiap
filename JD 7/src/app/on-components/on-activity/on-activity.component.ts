import { Component, OnInit, ElementRef } from '@angular/core';
import { OnGlobalService } from '../../providers/on-global.service';
import { OnToastController } from "./../../on-controllers/on-toast/on-toast.controller";
import * as $ from 'jquery';

/**
* @name OnActivity
* @description
* Este componente cria um layout de edições para atividades
*
* @usage
* ```html
*
<on-activity>
  <on-activity-title>
    <h2>On-activity</h2>
  </on-activity-title>
  <div class="on-table-responsive">
    <table>
      <tr>
        <td class="on-font-bold" style="width: 30%">Lorem ipsum</td>
        <td><div class="on-activity-editable"></div></td>
      </tr>
      <tr>
        <td class="on-font-bold" style="width: 30%">Lorem ipsum</td>
        <td><div class="on-activity-editable"></div></td>
      </tr>
      <tr>
        <td class="on-font-bold" style="width: 30%">Lorem ipsum</td>
        <td>
          <div class="on-activity-select">
            <select>
              <option value="volvo">One</option>
              <option value="saab">Two</option>
              <option value="mercedes">Three</option>
              <option value="audi">Four</option>
            </select>
          </div>
        </td>
      </tr>
      <tr>
        <td class="on-font-bold" style="width: 30%">Lorem ipsum</td>
        <td>
          <label class="on-activity-checkbox">One
            <input type="checkbox" checked="checked">
            <span></span>
          </label>
          <label class="on-activity-checkbox">Two
            <input type="checkbox">
            <span></span>
          </label>
          <label class="on-activity-checkbox">Three
            <input type="checkbox">
            <span></span>
          </label>
        </td>
      </tr>
      <tr>
        <td class="on-font-bold" style="width: 30%">Lorem ipsum</td>
        <td>
          <label class="on-activity-radio">One
            <input type="radio" name="radio">
            <span></span>
          </label>
          <label class="on-activity-radio">Two
            <input type="radio" name="radio">
            <span></span>
          </label>
        </td>
      </tr>
    </table>
  </div>
</on-activity>
* ```
*/

@Component({
  selector: "on-activity",
  templateUrl: "./on-activity.component.html"
})
export class OnActivityComponent implements OnInit {
  activity: any;
  sectionOfActivity: any;
  parentElementOfActivity: any;
  editables: any;
  inputs: any = [];
  labels: any = [];

  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService,
    private onToastController: OnToastController
  ) {}

  ngOnInit() {
    this.activity = this.elementRef.nativeElement;
    this.editables = [].slice.call(this.activity.querySelectorAll(".on-activity-editable, .on-activity-selectable"));
    this.inputs = [].slice.call(this.activity.querySelectorAll("input"));
    this.labels = [].slice.call(this.activity.querySelectorAll("label"));
    this.addEditableFunctionality();
    this.onAfterPrint();
  }


  addEditableFunctionality() {
    this.editables.forEach(editable => {
      editable.setAttribute("contenteditable", true);
    });
  }

  clean() {
    this.editables.forEach(editable => {
      editable.innerHTML = "";
    });

    this.inputs.forEach(input => {
      input.checked = false;
    });
  }

  save() {
    // Verifica se existe o método print ou se é navegador
    if(this.isNativeApp() || !window.print) {
      this.onToastController.create({
        message: "Para realizar esta atividade, utilize um navegador!",
        duration: 3000,
        position: 'bottom'
      });
      return;
    }

    this.sectionOfActivity = this.onGlobalService.getSectionOfElement(this.activity);
    this.parentElementOfActivity = this.getParentElementOfActivity(this.activity);

    this.addClassesToInput();
    this.addClassesToPrint();
    window.print();
  }

  onAfterPrint() {
    window.onafterprint = () => {
      this.removeClassesToPrint();
      this.removeClassesToInput();
      window.scrollTo(0, $(this.activity).offset().top);
    };
  }

  getParentElementOfActivity(element) {
    let tagName = element.parentElement.tagName.toLowerCase();
    if (tagName === "on-section-content") {
      return element;
    } else {
      return this.getParentElementOfActivity(element.parentElement);
    }
  }

  addClassesToPrint() {
    this.parentElementOfActivity.setAttribute("id", "on-activity-print");
    this.sectionOfActivity.classList.add("on-section-activity");
  }

  removeClassesToPrint() {
    this.parentElementOfActivity.removeAttribute("id", "on-activity-print");
    this.sectionOfActivity.classList.remove("on-section-activity");
  }

  addClassesToInput() {
    if (!this.inputs && !this.labels) return;

    this.inputs.forEach((input, i) => {
      if(input.checked)
        this.labels[i].classList.add("on-activity-input-selected");
    });
  }

  removeClassesToInput() {
    if (!this.inputs && !this.labels) return;

    this.inputs.forEach((input, i) => {
      this.labels[i].classList.remove("on-activity-input-selected");
    });
  }

  isNativeApp() {
    return /AppName\/[0-9\.]+$/.test(navigator.userAgent);
  }
}
