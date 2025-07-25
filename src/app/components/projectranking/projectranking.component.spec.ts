import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectrankingComponent } from './projectranking.component';

describe('ProjectrankingComponent', () => {
  let component: ProjectrankingComponent;
  let fixture: ComponentFixture<ProjectrankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectrankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectrankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
