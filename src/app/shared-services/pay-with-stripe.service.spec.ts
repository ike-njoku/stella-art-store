import { TestBed } from '@angular/core/testing';

import { PayWithStripeService } from './pay-with-stripe.service';

describe('PayWithStripeService', () => {
  let service: PayWithStripeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayWithStripeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
