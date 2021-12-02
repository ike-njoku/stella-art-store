import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnimationService } from './shared-services/animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private animationService: AnimationService
  ) {}

  title = 'stella-art-store';
  loaderText: string = '';
  loadTime: any;
  _loaderText = '...Loading...';
    x = this._loaderText.split('');
    currentIndex = 0;

  public pageHasLoaded: boolean = false;
  ngOnInit(): void {
    console.table({
      Live: environment.production,
      url: environment.apiBaseUrl
    });

    this.checkPageLoad();
    this.addInterval()
  }

  checkPageLoad() {
    let interval = setInterval(() => {
      if (document.readyState == 'complete') this.pageHasLoaded = true;
      if (this.pageHasLoaded == true) {
        clearInterval(interval)
      }
    }, 10);
  }

  addInterval() {
    let addInterval = setInterval(() => {
      this.loaderText += this.x[this.currentIndex];
      this.currentIndex ++;
      if (this.currentIndex > this._loaderText.length - 1) {
        clearInterval(addInterval);
        this.currentIndex = 0;
        this.removeInterval();
      }
    }, 200);
  }

  removeInterval () {
    let removeInterval = setInterval(() => {
      this.loaderText = this.loaderText.substring(1);
      if (this.loaderText.length < 1) {
        clearInterval(removeInterval)
        this.addInterval()
      }
    }, 100);
  }

}
