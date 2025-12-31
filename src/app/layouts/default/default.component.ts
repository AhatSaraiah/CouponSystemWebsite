import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {
  userRole$: Observable<string>;

  constructor(private authService: AuthService) {
    this.userRole$ = this.authService.userRole$;
  }
}
