import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  scrollTo(element: HTMLElement | string) {
    return typeof element == 'string'?
    document.getElementById(element)?.scrollIntoView({behavior: 'smooth'}):
    element.scrollIntoView({behavior: 'smooth'});
  }
}
