import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicIndexComponent } from './public-index.component';

describe('PublicIndexComponent', () => {
  let component: PublicIndexComponent;
  let fixture: ComponentFixture<PublicIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
