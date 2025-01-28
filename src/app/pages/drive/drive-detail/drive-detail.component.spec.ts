import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveDetailComponent } from './drive-detail.component';

describe('DriveDetailComponent', () => {
  let component: DriveDetailComponent;
  let fixture: ComponentFixture<DriveDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriveDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
