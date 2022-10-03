import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecteditComponent } from './projectedit.component';

describe('ProjecteditComponent', () => {
  let component: ProjecteditComponent;
  let fixture: ComponentFixture<ProjecteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjecteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjecteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
