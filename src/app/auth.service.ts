import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userRoleSubject = new BehaviorSubject<string>('');
    public userRole$: Observable<string> = this.userRoleSubject.asObservable();

    setUserRole(role: string): void {
        this.userRoleSubject.next(role);
    }

    getUserRole(): string {
        return this.userRoleSubject.value;
    }

    clearUserRole(): void {
        this.userRoleSubject.next('');
    }
}
