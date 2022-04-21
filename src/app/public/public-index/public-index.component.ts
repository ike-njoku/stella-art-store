import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from 'src/app/email.service';
import { AnimationService } from 'src/app/shared-services/animation.service';
import { NavigationService } from 'src/app/shared-services/navigation.service';
const contactForm = document.getElementById('contact');
@Component({
  selector: 'app-public-index',
  templateUrl: './public-index.component.html',
  styleUrls: ['./public-index.component.css']
})
export class PublicIndexComponent implements OnInit {

  constructor(
    private navService: NavigationService,
    private animationService: AnimationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private emailService: EmailService
  ) { }

  contactMeForm: FormGroup = this.formBuilder.group({
    email: [null, Validators.required],
    subject: [null, Validators.required],
    userName: [null, Validators.required],
    body: [null, Validators.required]
  });


  landingWriteUp: string = '';

  navigate(href: string) {
    this.router.navigate([href], {relativeTo: this.route})
  }

  openContactForm() {
    let contactForm = document.getElementById('contact');
    if (contactForm) {
      contactForm.classList.add('active');
    }
  }

  hideContactForm() {
    let contactForm = document.getElementById('contact');
    if (contactForm) {
      contactForm.classList.remove('active');
    }
  }

  scrollLeft() {
    let imagesGrid = document.getElementById('images-grid');
    if (imagesGrid) {
      if (imagesGrid.scrollLeft == 0) {
        imagesGrid.scrollLeft = 1200
      } else
      imagesGrid.scrollLeft -= 300;
    }
  }

  scrollRight() {
    let imagesGrid = document.getElementById('images-grid');
    if (imagesGrid) {
      if (imagesGrid.scrollLeft > 1200) {
        imagesGrid.scrollLeft = 0;
      }
      imagesGrid.scrollLeft += 300;
    }
  }

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

    this.navigate('/home');
  }

  scrollTo(element: HTMLElement) {
    this.navService.scrollTo(element)
  }

  sendEmail() {
    this.emailService.sendEmail(this.contactMeForm.value)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error: string) => window.alert(error)
      )
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
