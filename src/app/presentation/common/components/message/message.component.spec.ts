import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { By } from '@angular/platform-browser';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent]
    });
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show algo', () => {
    const buttonsPanel = fixture.debugElement.nativeElement
    debugger
    console.log("🚀 ~ file: message.component.spec.ts:25 ~ it ~ buttonsPanel:", buttonsPanel)

    expect(component).toBeTruthy();
  });
});
