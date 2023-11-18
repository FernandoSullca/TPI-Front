import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarComponent } from './administrar.component';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { Router } from '@angular/router';

xdescribe('AdministrarComponent', () => {
  let component: AdministrarComponent;
  let fixture: ComponentFixture<AdministrarComponent>;

  beforeEach(() => {
    let localStore: any = {
      'token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3VhcmlvIiwibm9tYnJlVXN1YXJpbyI6Impvc2UiLCJub21icmUiOiJKb3NlIE1pZ3VlbCIsImFwZWxsaWRvIjoiam9zZW1pZ3VlbG1hY2hpY2Fkb2N1YmFAZ21haWwuY29tIiwicHJlbWl1bSI6ZmFsc2UsImVtYWlsIjoiam9zZW1pZ3VlbG1hY2hpY2Fkb2N1YmFAZ21haWwuY29tIiwib2lkIjo1LCJwYXNzIjoiMTIzNDU2IiwiZXNBZG1pbmlzdHJhZG9yIjpmYWxzZX0.FcYhAB0BJaH32ztnC0E4HSCWsW3R_3_X3HvgOgH6vqo',
      'perfilInversor': 'MODERADO'
    };

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    TestBed.configureTestingModule({
      declarations: [AdministrarComponent],
      providers: [LocalStorageService, Router]
    });
    fixture = TestBed.createComponent(AdministrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
