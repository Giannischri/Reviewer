import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecteditdetailsComponent } from './projecteditdetails.component';

describe('ProjecteditdetailsComponent', () => {
  let component: ProjecteditdetailsComponent;
  let fixture: ComponentFixture<ProjecteditdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjecteditdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjecteditdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
