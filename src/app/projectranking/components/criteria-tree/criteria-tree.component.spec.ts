import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaTreeComponent } from './criteria-tree.component';

describe('CriteriaTreeComponent', () => {
  let component: CriteriaTreeComponent;
  let fixture: ComponentFixture<CriteriaTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
