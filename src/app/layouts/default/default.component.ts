import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth.service';
import { ClientType } from 'src/app/core/models';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent {
  userRole$: Observable<ClientType | ''>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.userRole$ = this.authService.userRole$;
  }

  logout(): void {
    this.authService.clearUserRole();
    this.router.navigate(['/login']);
  }
}
