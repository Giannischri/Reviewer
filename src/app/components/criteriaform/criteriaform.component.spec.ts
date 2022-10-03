import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaformComponent } from './criteriaform.component';

describe('CriteriaformComponent', () => {
  let component: CriteriaformComponent;
  let fixture: ComponentFixture<CriteriaformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
