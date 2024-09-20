import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    const token = this.authService.getToken();

    if (token) {
      return true;
    } else {
      this.router.navigate(['/log-in']);
      return false;
    }
  };
}
