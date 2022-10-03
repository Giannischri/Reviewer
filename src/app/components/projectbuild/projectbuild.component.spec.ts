import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectbuildComponent } from './projectbuild.component';

describe('ProjectbuildComponent', () => {
  let component: ProjectbuildComponent;
  let fixture: ComponentFixture<ProjectbuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectbuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectbuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
