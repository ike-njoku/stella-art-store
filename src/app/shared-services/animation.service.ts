import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly screenHeight = window.innerHeight;
  public pageHasLoaded!: boolean;

  constructor() { }

  addAnimationOnScroll(element: HTMLElement | null, animationName: string) {
    if (element)
    if (element.getBoundingClientRect().top < this.screenHeight) {
        element.classList.add(animationName);
        console.log(element.classList)
    }

    else{
      element.classList.remove(animationName);
      console.log('removing')
    }
  }
}
