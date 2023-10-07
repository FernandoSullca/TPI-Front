import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageTwoComponent } from './stage-two.component';

describe('StageTwoComponent', () => {
  let component: StageTwoComponent;
  let fixture: ComponentFixture<StageTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageTwoComponent]
    });
    fixture = TestBed.createComponent(StageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
