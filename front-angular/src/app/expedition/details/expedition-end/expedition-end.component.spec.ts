import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionEndComponent } from './expedition-end.component';

describe('ExpeditionEndComponent', () => {
  let component: ExpeditionEndComponent;
  let fixture: ComponentFixture<ExpeditionEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpeditionEndComponent]
    });
    fixture = TestBed.createComponent(ExpeditionEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
