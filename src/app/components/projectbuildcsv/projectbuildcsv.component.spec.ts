import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectbuildcsvComponent } from './projectbuildcsv.component';

describe('ProjectbuildcsvComponent', () => {
  let component: ProjectbuildcsvComponent;
  let fixture: ComponentFixture<ProjectbuildcsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectbuildcsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectbuildcsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
