import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTopSectionComponent } from './job-top-section.component';

describe('JobTopSectionComponent', () => {
  let component: JobTopSectionComponent;
  let fixture: ComponentFixture<JobTopSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTopSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobTopSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
