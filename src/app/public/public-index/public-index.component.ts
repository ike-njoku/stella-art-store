import { Component, OnInit } from '@angular/core';
import { AnimationService } from 'src/app/shared-services/animation.service';
import { NavigationService } from 'src/app/shared-services/navigation.service';

@Component({
  selector: 'app-public-index',
  templateUrl: './public-index.component.html',
  styleUrls: ['./public-index.component.css']
})
export class PublicIndexComponent implements OnInit {

  constructor(
    private navService: NavigationService,
    private animationService: AnimationService
  ) { }
  landingWriteUp: string = '';

  ngOnInit(): void {
    this.displayWriteUp();
    window.addEventListener('scroll', () => {
      this.animationService.addAnimationOnScroll(document.getElementById('contact'),'slide-up');
      this.animationService.addAnimationOnScroll(document.getElementById('contact-header'),'slide-up');
      this.animationService.addAnimationOnScroll(document.getElementById('contact-form'),'fade-in');
      this.animationService.addAnimationOnScroll(document.getElementById('landing-video'),'fade-in');
      this.animationService.addAnimationOnScroll(document.getElementById('images-grid'),'slide-in-left');
      this.animationService.addAnimationOnScroll(document.getElementById('about-header'),'slide-up');
      this.animationService.addAnimationOnScroll(document.getElementById('about-paragraph'),'slide-up');
      this.animationService.addAnimationOnScroll(document.getElementById('input-one'),'slide-in-left');
      this.animationService.addAnimationOnScroll(document.getElementById('input-two'),'slide-in-right');
      this.animationService.addAnimationOnScroll(document.getElementById('input-three'),'slide-in-left');
      this.animationService.addAnimationOnScroll(document.getElementById('input-four'),'slide-in-right');
      this.animationService.addAnimationOnScroll(document.getElementById('input-five'),'slide-up');
    });
  }


  scrollTo(element: HTMLElement) {
    this.navService.scrollTo(element)
  }

  displayWriteUp() {
    let timeInterval = 300;
    let writeUp = 'I am an Artist';
    let characters = writeUp.split('');
    let currentCharacterIndex = 0;

    let interval = setInterval(() => {
      this.landingWriteUp += characters[currentCharacterIndex];
      currentCharacterIndex++;
      if (currentCharacterIndex > characters.length - 1) clearInterval(interval)
    } ,timeInterval)
  }
}
