import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobshareComponent } from './jobshare.component';

describe('JobshareComponent', () => {
  let component: JobshareComponent;
  let fixture: ComponentFixture<JobshareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobshareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
