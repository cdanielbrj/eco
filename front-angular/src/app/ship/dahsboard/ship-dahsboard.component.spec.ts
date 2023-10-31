import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipDahsboardComponent } from './ship-dahsboard.component';

describe('ShipDahsboardComponent', () => {
  let component: ShipDahsboardComponent;
  let fixture: ComponentFixture<ShipDahsboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipDahsboardComponent]
    });
    fixture = TestBed.createComponent(ShipDahsboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
