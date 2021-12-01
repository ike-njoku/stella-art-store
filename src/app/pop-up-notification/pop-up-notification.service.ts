import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpNotificationService {
  notification!: string;
  constructor() { }

  addNotification(notification: string, timeout?: number): void {
    this.notification = notification;
    if (timeout) {
      setTimeout(() => this.clearNotification(), timeout)
    }
  }

  clearNotification() {
    this.notification = '';
  }
}
