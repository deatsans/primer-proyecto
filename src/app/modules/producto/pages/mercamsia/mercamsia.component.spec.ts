import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercamsiaComponent } from './mercamsia.component';

describe('MercamsiaComponent', () => {
  let component: MercamsiaComponent;
  let fixture: ComponentFixture<MercamsiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MercamsiaComponent]
    });
    fixture = TestBed.createComponent(MercamsiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
