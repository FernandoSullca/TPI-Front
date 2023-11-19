import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class IsLoggedInGuard implements CanActivate {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.localStorageService.getItem("token");

    if (token) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

