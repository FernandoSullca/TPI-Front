import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPathComponent } from './default-path.component';

describe('DefaultPathComponent', () => {
  let component: DefaultPathComponent;
  let fixture: ComponentFixture<DefaultPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultPathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
