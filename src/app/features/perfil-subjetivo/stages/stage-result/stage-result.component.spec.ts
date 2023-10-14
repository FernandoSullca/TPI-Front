import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageResultComponent } from './stage-result.component';

describe('StageResultComponent', () => {
  let component: StageResultComponent;
  let fixture: ComponentFixture<StageResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageResultComponent],
    });
    fixture = TestBed.createComponent(StageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
