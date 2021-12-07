import { TestBed } from '@angular/core/testing';

import { PayWithPaypalService } from './pay-with-paypal.service';

describe('PayWithPaypalService', () => {
  let service: PayWithPaypalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayWithPaypalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
