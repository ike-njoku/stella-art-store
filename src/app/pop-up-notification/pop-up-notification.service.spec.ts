import { TestBed } from '@angular/core/testing';

import { PopUpNotificationService } from './pop-up-notification.service';

describe('PopUpNotificationService', () => {
  let service: PopUpNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
