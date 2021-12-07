import { TestBed } from '@angular/core/testing';

import { PayWithPaystackService } from './pay-with-paystack.service';

describe('PayWithPaystackService', () => {
  let service: PayWithPaystackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayWithPaystackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
