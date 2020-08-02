import { Component, OnInit, Input, ElementRef } from '@angular/core'
import { OnGlobalService } from '../../providers/on-global.service'
import { TweenMax, Bounce, TimelineMax } from 'gsap'
import { OnAnimationsService } from 'app/providers/on-animations.service';

@Component({
  selector: 'on-challenge-stamp',
  templateUrl: './on-challenge-stamp.component.html'
})

export class OnChallengeStampComponent implements OnInit {
  animation: any;
  @Input() hasColor: boolean = true;
  @Input () hasScore: boolean = true;

  constructor(
    private onGlobalService: OnGlobalService,
    private elementRef: ElementRef) {
    }

    ngOnInit() {
      this.onAnimationChallengeStamp()
    }

    onAnimationChallengeStamp() {
      let animation = new TimelineMax({ paused: true });
      animation.staggerFrom(
        [this.elementRef.nativeElement.querySelector('div.on-animation-challenge-stamp')],
        1.2,
        {
          scale: 0.5,
          ease: Bounce.easeOut,
          y: 50,
          opacity: 0
        }
      );

      this.animation = animation;
    }

  }
