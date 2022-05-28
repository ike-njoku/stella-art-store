import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BioService } from 'src/app/admin/dashboard/update-bio/bio.service';
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
    private emailService: EmailService,
    private bioService: BioService
  ) { }

  contactMeForm: FormGroup = this.formBuilder.group({
    email: [null, Validators.required],
    subject: [null, Validators.required],
    userName: [null, Validators.required],
    body: [null, Validators.required]
  });

  bio: string = '';
  landingWriteUp: string = '';

  navigate(href: string) {
    this.router.navigate([href], { relativeTo: this.route })
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
    this.getBio();
    this.displayWriteUp();
    window.addEventListener('scroll', () => {
      this.animationService.addAnimationOnScroll(document.getElementById('contact'), 'slide-up');
      this.animationService.addAnimationOnScroll(document.getElementById('contact-header'), 'slide-up');
      this.animationService.addAnimationOnScroll(document.getElementById('contact-form'), 'fade-in');
      this.animationService.addAnimationOnScroll(document.getElementById('landing-video'), 'fade-in');
      this.animationService.addAnimationOnScroll(document.getElementById('images-grid'), 'slide-in-left');
      this.animationService.addAnimationOnScroll(document.getElementById('about-header'), 'slide-up');
      this.animationService.addAnimationOnScroll(document.getElementById('about-paragraph'), 'slide-up');
      this.animationService.addAnimationOnScroll(document.getElementById('input-one'), 'slide-in-left');
      this.animationService.addAnimationOnScroll(document.getElementById('input-two'), 'slide-in-right');
      this.animationService.addAnimationOnScroll(document.getElementById('input-three'), 'slide-in-left');
      this.animationService.addAnimationOnScroll(document.getElementById('input-four'), 'slide-in-right');
      this.animationService.addAnimationOnScroll(document.getElementById('input-five'), 'slide-up');
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
    }, timeInterval)
  }

  getBio() {
    this.bioService.getBio()
      .subscribe(
        (response) => {
          console.log(response);
          this.bio = response.data.bio;
        },
        (error) => {
          this.bio = `
          STELLA-MARIS ONWUAMA NIGERIAN, C. 1995

Stella-maris onwuama (born 1995) is a self-taught multimedia visual artist, painter, photographer, and graphic designer, specializing in Painting and pencil drawing. She obtained a BSc. in Biochemistry from Madonna University in 2017. Due to his fasination with materials and objects, Stella’s art is experimental in nature, with each medium used inspired by the ability to push it past its traditional function and perception. Her inspiration stems from childhood, exploring the relationship between her self, materials, and his immediate environment. stella's works have been featured in international and local exhibitions and fairs.

An explorer, stella is always seeking new mediums and means of expression, and gathers inspiration from personal experiences, her immediate society, and music. Through the dynamic nature of her works, she connects her viewers to multiples perspectives of the themes addressed. Ayanfe aims, through her art, to bring life to African culture and impact the society for good.
          `

        }
      )
  }
}
