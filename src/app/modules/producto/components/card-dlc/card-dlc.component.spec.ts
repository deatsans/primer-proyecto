import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDlcComponent } from './card-dlc.component';

describe('CardDlcComponent', () => {
  let component: CardDlcComponent;
  let fixture: ComponentFixture<CardDlcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardDlcComponent]
    });
    fixture = TestBed.createComponent(CardDlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
