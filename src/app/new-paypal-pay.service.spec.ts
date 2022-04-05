import { TestBed } from '@angular/core/testing';

import { NewPaypalPayService } from './new-paypal-pay.service';

describe('NewPaypalPayService', () => {
  let service: NewPaypalPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPaypalPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
