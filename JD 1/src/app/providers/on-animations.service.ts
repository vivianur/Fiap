import { Injectable } from "@angular/core";
import { TimelineMax, TweenMax } from "gsap";



interface AnimationDefaultConfig {
  name: string,
  backgroundSelector?: string,
  textSelector?: string,
  svgSelector?: string,
  arrowSelector?: string,
  videoContainerSelector?: string,
  videoTitleSelector?: string,
  timeSequence?: number,
  duration?: number
}

@Injectable()
export class OnAnimationsService {
  animations: any = {};

  addAnimation(name: string, animationTimeMax: any) {
    if (this.animations[name]) {
      throw new Error(`Animação: "${name}" já existe!`);
    }

    this.animations[name] = animationTimeMax;
  }

  createAnimation(configuration: AnimationDefaultConfig) {
    let timelineMaxObj, // objeto que terá a animação final
      animationTime = configuration.duration || 1, // tempo de animação
      animationTimeSequence, // tempo de sequencia da animação
      animationText, // animacao do texto HTML
      animationSvg, // animacao de texto SVG
      animationBackground, // animacao do background
      animationArrow; // animacao de arrow

    // Define o tempo da animationTimeSequence entre capa inicial e capas de reflexão
    if (configuration.timeSequence) {
      animationTimeSequence = configuration.timeSequence;
    }
    else if (configuration.name.indexOf("inicio") === 0 || configuration.name.indexOf("video") === 0) {
      animationTimeSequence = 0.075;
    }
    else {
      animationTimeSequence = 0.05;
    }

    // Define a animationText em caso de capas com svg
    if (configuration.svgSelector) {
      animationSvg = new TimelineMax()
        .staggerFrom(
          configuration.svgSelector,
          animationTime,
          { autoAlpha: 0 },
          animationTimeSequence
        );
    }

    // Define a animationText em caso de capas com texto html
    if (configuration.textSelector) {
      animationText = new TimelineMax()
        .staggerFrom(
          configuration.textSelector,
          animationTime,
          { y: 30, autoAlpha: 0 },
          animationTimeSequence
        );
    }

    let timeElapsed = 0;
    if ( animationSvg ) {
      timeElapsed = animationSvg.duration();
    }

    if ( animationText ) {
      timeElapsed = animationText.duration();
    }

    // Define animationBackground nos backgrounds
    if (configuration.backgroundSelector) {
      animationBackground = new TimelineMax().from(
        configuration.backgroundSelector,
        timeElapsed,
        { scale: 1.3 }
      );
    }

    if( configuration.arrowSelector ) {
      animationArrow = new TimelineMax().from(
        configuration.arrowSelector,
        1,
        { autoAlpha: 0, y: 30 },
        timeElapsed
      );
    }

    // Inicializa a animacao final
    timelineMaxObj = new TimelineMax({ paused: true });

    // Define a animação padrão em caso de seção de video
    if (configuration.name.indexOf("video") === 0) {
      timelineMaxObj = timelineMaxObj
        .from(configuration.videoContainerSelector, animationTime, {
          x: "20%",
          autoAlpha: 0
        })
        .staggerFrom(
          configuration.videoTitleSelector,
          animationTime,
          { cycle: { x: ["50%", "-50%"] }, autoAlpha: 0 },
          animationTimeSequence
        );
    }

    // Adiciona na animacao final a animação de texto svg
    if (animationSvg) timelineMaxObj = timelineMaxObj.add(animationSvg, "a");

    // Adiciona na animacao final a animação de texto html
    if (animationText) timelineMaxObj = timelineMaxObj.add(animationText, "a");

    // Adiciona na animacao final a animação de background
    if (animationBackground) timelineMaxObj = timelineMaxObj.add(animationBackground, "a");

    // Adiciona na animacao final a animação da arrow
    if (animationArrow) timelineMaxObj = timelineMaxObj.add(animationArrow, "a");

    // Insere animação final no objeto animations
    this.addAnimation(configuration.name, timelineMaxObj);
  }

  startAnimations(obj) {
    var prototype = Object.getPrototypeOf(obj);
    for (let i in prototype) {
      if (
        prototype.hasOwnProperty(i) &&
        i.indexOf("onAnimation") === 0 &&
        prototype[i].call &&
        prototype[i].apply
      ) {
        try {
          prototype[i].call(obj);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}

