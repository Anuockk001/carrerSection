import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplyNavigationComponent } from './job-apply-navigation.component';

describe('JobApplyNavigationComponent', () => {
  let component: JobApplyNavigationComponent;
  let fixture: ComponentFixture<JobApplyNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplyNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplyNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
