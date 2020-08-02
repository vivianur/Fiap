import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core'
import { OnAdjustElementsHeight } from '../../on-utils/on-adjust-elements-height'
import { OnGlobalService } from './../../providers/on-global.service'
import { TweenMax } from 'gsap'

/**
* @name OnGameDragNDrop
* @description
* Este componente cria um jogo interativo com o formato pergunta e respostas.
* É necessário a seguinte estrutura:
*
* @usage
* ```html
*
*<on-game-drag-n-drop>
*  <div class="on-game-draggable-container">
*    <div class="on-row">
*      <div class="on-col on-col-sm on-col-sm-4">
*        <div class="on-game-option-container">
*          <div class="on-game-option" draggable="1">
*            <span>Cão</span>
*          </div>
*        </div>
*      </div>
*      <div class="on-col on-col-sm on-col-sm-4">
*        <div class="on-game-option-container">
*          <div class="on-game-option" draggable="2">
*            <span>Leão</span>
*          </div>
*        </div>
*      </div>
*      <div class="on-col on-col-sm on-col-sm-4">
*        <div class="on-game-option-container">
*          <div class="on-game-option" draggable="3">
*            <span>Tubarão</span>
*          </div>
*        </div>
*      </div>
*    </div>
*  </div>
*  <div class="on-game-droppable-container">
*    <div class="on-row">
*      <div class="on-col on-col-sm on-col-sm-4">
*        <div class="on-game-droppable" droppable="1">
*        </div>
*        <p>Mamífero doméstico e familiar, da família dos canídeos. O seu tamanho, forma e pelagem variam em função da raça. Caracteriza-se por ter o olfato e ouvidos bastante apurados. Emitem sons denominados por latidos.</p>
*      </div>
*      <div class="on-col on-col-sm on-col-sm-4">
*        <div class="on-game-droppable" droppable="2">
*        </div>
*        <p>Pode ser marinho, carnívoro, pelágico, em quase sua totalidade, ele vai habitar as águas costeiras e também oceânicas, do fundo à superfície. É um animal nectônico, feito para o ambiente em que vive e evoluiu.</p>
*      </div>
*      <div class="on-col on-col-sm on-col-sm-4">
*        <div class="on-game-droppable" droppable="3">
*        </div>
*        <p>Mamífero cujo representante possui a capacidade de rugir, também possui algo bastante característico: a presença de juba, em indivíduos do sexo masculino.</p>
*      </div>
*    </div>
*  </div>
*</on-game-drag-n-drop>
* ```
*/

declare var $: any

@Component({
  selector: 'on-game-drag-n-drop',
  templateUrl: './on-game-drag-n-drop.component.html'
})

export class OnGameDragNDropComponent implements AfterViewInit {

  element: any
  draggable: any
  droppable: any
  answers: any = []
  showResult: string
  classResult: string
  status: boolean


  constructor(
    private elementRef: ElementRef,
    private onGlobalService: OnGlobalService) { }

  ngAfterViewInit() {
    this.element = this.elementRef.nativeElement
    this.draggable = $(this.element).find('[draggable]')
    this.droppable = $(this.element).find('[droppable]')

    this.onGlobalService.isPopupOpen.subscribe((open) => {
      this.setIds()
      this.start()
    });
  }

  setIds() {
    this.draggable.each(function (i){
      $(this).attr('draggable-id', i + 1)
    })

    this.droppable.each(function(i) {
      $(this).attr('droppable-id', i + 1)
    })
  }

  droppableUnlock(draggableId) {
    for(let i = 0; i < this.answers.length; i++) {
      if(this.answers[i].draggableId === draggableId) {
        let lastDroppable = $(this.element).find('[droppable-id=' + this.answers[i].droppableId + ']')
        lastDroppable.droppable('option', 'disabled', false)
        this.answers.splice(i, 1)
      }
    }
  }

  enableDraggable() {
    let droppableUnlock = this.droppableUnlock.bind(this)
    this.draggable.draggable({
      start: function() {
        $(this).css('z-index', 4)
      },
      revert: function(e) {
        let droppable = e
        let draggable = $(this)

        if(droppable) {
          return false
        } else {
          let draggableId = draggable.attr('draggable-id')
          droppableUnlock(draggableId)
          TweenMax.to(draggable, .5, {
            top: 0,
            left: 0,
            onStart: () => {
              draggable.css('z-index', 3)
            },
            onComplete: () => {
              draggable.css('z-index', 2)
            }
          })
        }
      }
    })
  }

  enableDroppable() {
    let droppableUnlock = this.droppableUnlock.bind(this)
    let answers = this.answers
    this.droppable.droppable({
      accept: this.draggable,
      drop: function(e, ui){

        let droppable = $(this)
        let draggable = ui.draggable

        draggable.css('z-index', 2)

        droppable.droppable('option', 'disabled', true)
        draggable.position({ of: droppable })

        let draggableId = draggable.attr('draggable-id')
        droppableUnlock(draggableId)

        answers.push({
          draggableId: draggable.attr('draggable-id'),
          draggableClass: draggable.attr('draggable'),
          droppableId: droppable.attr('droppable-id'),
          droppableClass: droppable.attr('droppable')
        })

      }
    })
  }

  start() {
    this.status = false
    this.answers = []
    this.enableDraggable()
    this.enableDroppable()

    this.draggable.attr('style', '')
    this.droppable.droppable('option', 'disabled', false)

    let elements = [].slice.call(this.element.querySelectorAll('.on-game-option, .on-game-droppable'))
    new OnAdjustElementsHeight(elements)
    this.showResult = ''
  }

  end() {
    this.status = true
    let challengeResult = true
    this.draggable.draggable('destroy')

    if(this.answers.length === this.droppable.length) {
      this.answers.forEach((answer) => {
        if(answer.draggableClass != answer.droppableClass)
          challengeResult = false
      })
    } else {
      challengeResult = false
    }

    if(challengeResult) {
      this.showResult = `Parabéns! Desafio concluído com sucesso! :)`
      this.classResult = 'on-game-result-correct'
    } else {
      this.showResult = `Não foi dessa vez :(`
      this.classResult = 'on-game-result-wrong'
    }
  }

  result() {
    let self = this
    this.status = true
    this.answers = []

    this.draggable.draggable('destroy')
    this.draggable.css({ top: 0, left: 0 })

    self.droppable.each(function() {
      let droppable = $(this)
      self.draggable.each(function() {
        let draggable = $(this)
        if(draggable.attr('draggable') == droppable.attr('droppable')) {

          let wasUsedVerification = false

          $(self.answers).each(function() {
            if(draggable.attr('draggable-id') == $(this)[0].draggableId) {
              wasUsedVerification = true
            }
            if(droppable.attr('droppable-id') == $(this)[0].droppableId) {
              wasUsedVerification = true
            }
          })

          if(!wasUsedVerification) {
            self.answers.push({
              draggableId: draggable.attr('draggable-id'),
              draggableClass: draggable.attr('draggable'),
              droppableId: droppable.attr('droppable-id'),
              droppableClass: droppable.attr('droppable')
            })
            draggable.position({ of: droppable })
          }
        }
      })
    })

    this.showResult = 'Este é o resultado correto! :)'
    this.classResult = 'on-game-result-correct'
  }

}
