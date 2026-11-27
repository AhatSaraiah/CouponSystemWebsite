import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ClientType } from './core/models';

const STORAGE_KEY = 'coupon-system.role';

/**
 * Holds the role of the signed-in user for the lifetime of the session.
 * The role is mirrored into sessionStorage so a page refresh does not log the
 * user out; closing the tab clears it.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userRoleSubject = new BehaviorSubject<ClientType | ''>(this.readStoredRole());

  readonly userRole$: Observable<ClientType | ''> = this.userRoleSubject.asObservable();

  setUserRole(role: ClientType): void {
    this.storeRole(role);
    this.userRoleSubject.next(role);
  }

  getUserRole(): ClientType | '' {
    return this.userRoleSubject.value;
  }

  isLoggedIn(): boolean {
    return this.userRoleSubject.value !== '';
  }

  hasRole(roles: readonly ClientType[]): boolean {
    const role = this.userRoleSubject.value;
    return role !== '' && (roles.length === 0 || roles.includes(role));
  }

  clearUserRole(): void {
    this.storeRole('');
    this.userRoleSubject.next('');
  }

  private readStoredRole(): ClientType | '' {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored === 'admin' || stored === 'company' || stored === 'customer' ? stored : '';
    } catch {
      // sessionStorage can be unavailable (privacy mode, SSR); fall back to memory only.
      return '';
    }
  }

  private storeRole(role: ClientType | ''): void {
    try {
      if (role) {
        sessionStorage.setItem(STORAGE_KEY, role);
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage failures: the in-memory subject stays authoritative.
    }
  }
}
