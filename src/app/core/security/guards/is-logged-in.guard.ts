import { Injectable } from '@angular/core';
import { CanActivateFn, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../../services/LocalStorage/local-storage.service';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root'
})

export class isLoggedInGuard implements CanLoad {

  constructor(private LocalStorageService: LocalStorageService,
    private router: Router) { }
  // canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   return true;
  // }

  canLoad(): Observable<boolean | UrlTree> {
    return this.verificarlogged()
      ? of(true)
      : of(this.router.createUrlTree(['/login']));
  }

  // canLoad() {
  //   return  this.verificarlogged();
  // }
  private verificarlogged(): boolean {
    let token = this.LocalStorageService.getItem("token");

    return token != null;
  }

}

// export const isLoggedInGuard: CanActivateFn = (route, state) => {
//   return true;
// };
