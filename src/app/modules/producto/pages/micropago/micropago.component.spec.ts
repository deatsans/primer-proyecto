import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicropagoComponent } from './micropago.component';

describe('MicropagoComponent', () => {
  let component: MicropagoComponent;
  let fixture: ComponentFixture<MicropagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicropagoComponent]
    });
    fixture = TestBed.createComponent(MicropagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
