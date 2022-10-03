import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectbuildsearchComponent } from './projectbuildsearch.component';

describe('ProjectbuildsearchComponent', () => {
  let component: ProjectbuildsearchComponent;
  let fixture: ComponentFixture<ProjectbuildsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectbuildsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectbuildsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
