import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisherDashboardComponent } from './fisher-dashboard.component';

describe('FisherDashboardComponent', () => {
  let component: FisherDashboardComponent;
  let fixture: ComponentFixture<FisherDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FisherDashboardComponent]
    });
    fixture = TestBed.createComponent(FisherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
