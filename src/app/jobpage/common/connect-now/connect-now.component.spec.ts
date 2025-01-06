import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectNowComponent } from './connect-now.component';

describe('ConnectNowComponent', () => {
  let component: ConnectNowComponent;
  let fixture: ComponentFixture<ConnectNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectNowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
