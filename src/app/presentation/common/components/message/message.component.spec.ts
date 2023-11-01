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

  it('should show mensajito', () => {
    component.ngOnInit();
    component.textMessage = "hola mundito";
    component.typeMessage = "success";
    fixture.detectChanges();
    const textMessageShow = fixture.debugElement.query(By.css("span")).nativeElement.innerText;
    const classMessageShow = fixture.debugElement.query(By.css("span")).nativeElement.className;
    expect(textMessageShow).toEqual("hola mundito");
    expect(classMessageShow).toEqual("success");
    expect(component).toBeTruthy();
  });
});
