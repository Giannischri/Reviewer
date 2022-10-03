import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankcandidatesComponent } from './rankcandidates.component';

describe('RankcandidatesComponent', () => {
  let component: RankcandidatesComponent;
  let fixture: ComponentFixture<RankcandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankcandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankcandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
