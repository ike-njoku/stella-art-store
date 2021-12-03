import { TestBed } from '@angular/core/testing';

import { FlutterwavePaymentService } from './flutterwave-payment.service';

describe('FlutterwavePaymentService', () => {
  let service: FlutterwavePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlutterwavePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
