import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisherComponent } from './fisher.component';

describe('FisherComponent', () => {
  let component: FisherComponent;
  let fixture: ComponentFixture<FisherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FisherComponent]
    });
    fixture = TestBed.createComponent(FisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
