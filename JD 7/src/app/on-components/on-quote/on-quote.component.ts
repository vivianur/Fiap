import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

/**
* @name OnQuote
* @description
* Este componente cria um layout de citação
*
* @usage
* ```html
*
* <on-quote author="Lorem ipsum">
*   <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam ipsa</p>
* </on-quote>
* ```
*/

@Component({
  selector: 'on-quote',
  templateUrl: './on-quote.component.html'
})

export class OnQuoteComponent implements AfterViewInit {

  @Input() author: string;
  @ViewChild('onQuoteAuthor') onQuoteAuthorContent: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    this.verifyIfHasAuthor();
  }

  verifyIfHasAuthor() {
    if(!this.author) {
      this.onQuoteAuthorContent.nativeElement.style.display = 'none';
    }
  }
}
