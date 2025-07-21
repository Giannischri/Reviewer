import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreNodeComponent } from './score-node.component';

describe('ScoreNodeComponent', () => {
  let component: ScoreNodeComponent;
  let fixture: ComponentFixture<ScoreNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
