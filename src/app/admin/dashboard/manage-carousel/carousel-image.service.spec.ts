import { TestBed } from '@angular/core/testing';

import { CarouselImageService } from './carousel-image.service';

describe('CarouselImageService', () => {
  let service: CarouselImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
