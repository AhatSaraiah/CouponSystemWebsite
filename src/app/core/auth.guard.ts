import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ClientType } from './models';

/**
 * Route guard for the signed-in area.
 *
 * Usage: `{ path: 'admin-companies', component: ..., canActivate: [AuthGuard], data: { roles: ['admin'] } }`
 * Without a `roles` list any signed-in user passes.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = (route.data['roles'] as ClientType[] | undefined) ?? [];

    if (this.authService.hasRole(roles)) {
      return true;
    }

    this.authService.clearUserRole();
    this.router.navigate(['/login']);
    return false;
  }
}
