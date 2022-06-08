import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLandingVideoComponent } from './update-landing-video.component';

describe('UpdateLandingVideoComponent', () => {
  let component: UpdateLandingVideoComponent;
  let fixture: ComponentFixture<UpdateLandingVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLandingVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLandingVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
