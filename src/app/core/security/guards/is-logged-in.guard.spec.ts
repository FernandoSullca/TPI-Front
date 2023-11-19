import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { IsLoggedInGuard } from './is-logged-in.guard';
import { LocalStorageService } from '../../services/LocalStorage/local-storage.service';

describe('isLoggedInGuard', () => {

  let guard: IsLoggedInGuard;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let router: jasmine.SpyObj<Router>;

  // const executeGuard: CanActivateFn = (...guardParameters) => 
  //     TestBed.runInInjectionContext(() => IsLoggedInGuard(...guardParameters));

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', ['getItem']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: Router, useValue: router },
      ],
    });
    guard = TestBed.inject(IsLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('debe devolver true cuando esta logueado', () => {
    localStorageService.getItem.and.returnValue('Token');
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debe devolver falso cuando no esta logueado vuelve a login', () => {
    localStorageService.getItem.and.returnValue(null);
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
