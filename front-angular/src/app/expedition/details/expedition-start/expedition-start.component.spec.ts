import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionStartComponent } from './expedition-start.component';

describe('ExpeditionStartComponent', () => {
  let component: ExpeditionStartComponent;
  let fixture: ComponentFixture<ExpeditionStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpeditionStartComponent]
    });
    fixture = TestBed.createComponent(ExpeditionStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
