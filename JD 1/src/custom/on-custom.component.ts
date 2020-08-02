import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TimelineMax, TweenMax, Elastic, Bounce } from "gsap";
import onCodes from './on-codes';

import { OnAnimationsService } from "./../app/providers/on-animations.service";
import { OnGlobalService } from "./../app/providers/on-global.service";


@Component({
  selector: "on-custom",
  templateUrl: "./on-custom.component.html"
})
export class OnCustomComponent implements OnInit {
  onCodes: any = onCodes;
  animations: any = {};

  constructor(
    private titleService: Title,
    private onGlobalService: OnGlobalService,
    private onAnimationsService: OnAnimationsService
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Cap 1 - The Other Side");
    this.animations = this.onAnimationsService.animations;
    this.onAnimationsService.startAnimations(this);

  }

  onAnimationInicio() {
    this.onAnimationsService.createAnimation({
      name: "inicio",
      svgSelector: ".on-image-inicio svg *",
      backgroundSelector: ".on-background-inicio",
      arrowSelector: ".on-animation-inicio"
    });
  }

  onAnimationVideoIntroducao() {
    this.onAnimationsService.createAnimation({
      name: "videoIntroducao",
      videoContainerSelector: ".on-video-introducao .on-video-container",
      videoTitleSelector: ".on-video-introducao h1 > div"
    });
  }
}