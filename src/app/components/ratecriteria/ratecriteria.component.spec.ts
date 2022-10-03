import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatecriteriaComponent } from './ratecriteria.component';

describe('RatecriteriaComponent', () => {
  let component: RatecriteriaComponent;
  let fixture: ComponentFixture<RatecriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatecriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatecriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
