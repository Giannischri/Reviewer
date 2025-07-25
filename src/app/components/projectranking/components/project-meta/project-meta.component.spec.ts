import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMetaComponent } from './project-meta.component';

describe('ProjectMetaComponent', () => {
  let component: ProjectMetaComponent;
  let fixture: ComponentFixture<ProjectMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
