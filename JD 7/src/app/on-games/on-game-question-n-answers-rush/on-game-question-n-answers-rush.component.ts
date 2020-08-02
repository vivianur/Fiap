import { Component, OnInit, AfterViewInit, Input, ElementRef, ChangeDetectorRef } from '@angular/core'
import { TweenMax } from 'gsap'

/**
* @name OnGameQuestionNAnswers
* @description
* Este componente cria um jogo interativo com o formato drag n drop,
* é necessário a seguinte estrutura:
*
* @usage
* ### HTML
* ```html
*
* <on-game-question-n-answers-rush [questionNAnswers]="onGameQuestionNAnswers"></on-game-question-n-answers-rush>
* ```
*### TypeScript
*this.onGameQuestionNAnswers = [
*  {
*    id: 1,
*    name: '20% dos adultos brasileiros sofrem de?',
*    answers: [
*      { id: 1, name: 'Sobrepeso' },
*      { id: 2, name: 'Estresse' },
*      { id: 3, name: 'Insônia' },
*      { id: 4, name: 'Hipertireoidismo' },
*      { id: 5, name: 'Baixa autoestima' },
*      { id: 6, name: 'Depressão' },
*      { id: 7, name: 'Ansiedade' },
*      { id: 8, name: 'Colesterol alto' }
*    ],
*    tip: 'Em 2015, a OMS publicou um levantamento apontando que 7,3% das crianças brasileiras menores de 5 anos sofrem de sobrepeso, o que também foi observado em 20% dos adultos.',
*    correctAnswerId: 1
*  },
*  {
*    id: 2,
*    name: 'É um dos problemas causados pelo estresse.',
*    answers: [
*      { id: 1, name: 'Insônia' },
*      { id: 2, name: 'Falta de dinheiro' },
*      { id: 3, name: 'Ansiedade' },
*      { id: 4, name: 'Hipertireoidismo' }
*    ],
*    tip: 'É um distúrbio persistente que prejudica a capacidade de uma pessoa adormecer ou, ainda, de permanecer dormindo durante toda a noite.',
*    correctAnswerId: 1
*  }
*]
*/

@Component({
  selector: 'on-game-question-n-answers-rush',
  templateUrl: './on-game-question-n-answers-rush.component.html'
})

export class OnGameQuestionNAnswersRushComponent implements OnInit, AfterViewInit {

  @Input('questionNAnswers') questionNAnswers: any;
  questions = [];
  isLocked: boolean;
  gridQuestions: any;
  currentQuestion: any;
  answerSelected: any;

  constructor(private elementRef: ElementRef, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.generateAnswersNQuestion();
    this.generateDatasToMatrix();
  }

  ngAfterViewInit() {
    this.updateAnswersNQuestion();
  }

  generateAnswersNQuestion() {
    let answers = [];

    this.questions = this.questionNAnswers.map((question, i) => {
      return {
        id: i + 1,
        name: question.name,
        element: null,
        answers: question.answers.map((answer) => {
          return {
            id: answer.id,
            element: null,
            name: answer.name,
            selected: null
          }
        }),
        tip: question.tip,
        correctAnswerId: question.correctAnswerId,
        isAnswer: null,
        isCurrentQuestion: false
      }
    });

    this.questions[0].isCurrentQuestion = true;
    this.currentQuestion = this.questions[0];
  }

  updateAnswersNQuestion() {
    let questionsHtml = this.elementRef.nativeElement.querySelectorAll('.on-game-question');
    let answersHtml = this.elementRef.nativeElement.querySelectorAll('.on-game-question-answers');

    this.questions.forEach((question, i) => {
      question.element = questionsHtml[i];

      question.answers.forEach((answer, j) => {
        answer.element = answersHtml[i].querySelectorAll('.on-game-option')[j];
      })
    })

  }

  goToQuestion(nextQuestion) {
    this.isLocked = true;

    TweenMax.to(this.currentQuestion.element, 1, { height: 0, onComplete: () => {
      this.currentQuestion.element.classList.add('on-hide');
      nextQuestion.element.classList.remove('on-hide');
      this.currentQuestion.element.setAttribute('style', '');
      TweenMax.from(nextQuestion.element, 1, { height: 0, onStart: () => {
      }, onComplete: () => {
        nextQuestion.element.setAttribute('style', '');
        this.currentQuestion = nextQuestion;
        this.isLocked = false;
      } })
    }})
  }

  previousQuestion() {
    let previousQuestion = (this.currentQuestion.id - 1) - 1;
    if(previousQuestion >= 0 && !this.isLocked) {
      this.goToQuestion(this.questions[previousQuestion]);
    }
  }

  nextQuestion() {
    let nextQuestion = (this.currentQuestion.id + 1) - 1;
    if(nextQuestion < (this.questions.length) && !this.isLocked) {
      this.goToQuestion(this.questions[nextQuestion]);
    }
  }

  navigationQuestion(question) {
    if(this.currentQuestion.id === question.id) return

    this.goToQuestion(question)
  }

  selectOption(answerSelected, answers) {
    if(this.currentQuestion.isAnswer === true) return
    if(!this.currentQuestion.hasAnsweredSelected) this.currentQuestion.hasAnsweredSelected = true;

    answers.forEach((answer) => {
      answer.selected = false;
    })

    answerSelected.selected = true;
    this.answerSelected = answerSelected;
    this.currentQuestion.hasAnsweredSelected = true;
  }



  sendAnswer() {
    if( !this.currentQuestion.hasAnsweredSelected ) {
      this.currentQuestion.hasAnsweredSelected = false;
      return false;
    }

    if(this.currentQuestion.isAnswer === true) return;

    if(this.currentQuestion.correctAnswerId === this.answerSelected.id) {
      this.currentQuestion.isAnswer = true;
    } else {
      this.currentQuestion.isAnswer = false;
    }
  }

  setClassesToButtonsNavigations(question) {
    if(question.isAnswer === true) {
      return 'on-game-question-navigation-button-correct';
    } else if (question.isAnswer === false) {
      return 'on-game-question-navigation-button-wrong';
    } else if (this.currentQuestion.id === question.id) {
      return 'on-game-question-navigation-button-current';
    } else {
      return 'on-game-question-navigation-button';
    }
  }

  generateDatasToMatrix() {
    let rows = [];
    let cols = [];
    let grid = [];
    let amount = 4;

    this.questions.forEach((datas) => {
      rows = [];
      cols = [];
      datas.answers.forEach((data, i) => {
        if((i + 1) % amount === 0) {
          cols.push(data);
          rows.push(cols);
          cols = []
        } else if (cols.length >= amount) {
          cols.push(data);
          rows.push(cols);
          cols = []
        } else if ((i + 1) == datas.answers.length) {
          cols.push(data);
          rows.push(cols);
          cols = []
        } else {
          cols.push(data);
        }
      })
      grid.push(rows);
    })

    this.gridQuestions = grid;
  }
}
