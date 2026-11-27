import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { NotificationService } from '../core/notification.service';
import { environment } from '../../environments/environment';

class NotificationStub {
  messages: string[] = [];
  success(message: string): void {
    this.messages.push(`success:${message}`);
  }
  error(message: string): void {
    this.messages.push(`error:${message}`);
  }
}

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  let router: Router;
  let notification: NotificationStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
      ],
      declarations: [LoginComponent],
      providers: [{ provide: NotificationService, useClass: NotificationStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    notification = TestBed.inject(NotificationService) as unknown as NotificationStub;
    authService.clearUserRole();
    spyOn(router, 'navigate').and.resolveTo(true);
  });

  afterEach(() => httpMock.verify());

  it('starts with an empty, invalid form', () => {
    expect(component.loginForm.valid).toBeFalse();
    expect(authService.isLoggedIn()).toBeFalse();
  });

  it('reports an incomplete form instead of calling the API', () => {
    component.loginForm.setValue({ email: 'admin@coupon.com', password: 'secret', clientType: '' });

    component.onSubmit();

    expect(notification.messages).toContain('error:Please fill in all required fields correctly.');
    httpMock.expectNone(`${environment.apiBaseUrl}/admin/loginAdmin/admin%40coupon.com/secret`);
  });

  it('signs an admin in and navigates to the admin area', () => {
    component.loginForm.setValue({ email: 'admin@coupon.com', password: 'secret', clientType: '1' });

    component.onSubmit();

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/admin/loginAdmin/admin%40coupon.com/secret`
    );
    expect(req.request.method).toBe('GET');
    req.flush(true);

    expect(authService.getUserRole()).toBe('admin');
    expect(router.navigate).toHaveBeenCalledWith(['/DefaultComponent/admin-companies']);
  });

  it('shows an error when the credentials are rejected', () => {
    component.loginForm.setValue({ email: 'shop@example.com', password: 'secret', clientType: '2' });

    component.onSubmit();

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/company/loginCompany/shop%40example.com/secret`
    );
    req.flush(false);

    expect(authService.isLoggedIn()).toBeFalse();
    expect(notification.messages).toContain('error:Login failed: invalid email or password.');
  });

  it('explains when the backend is unreachable', () => {
    component.loginForm.setValue({ email: 'buyer@example.com', password: 'secret', clientType: '3' });

    component.onSubmit();

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/customer/loginCustomer/buyer%40example.com/secret`
    );
    req.error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });

    expect(notification.messages.join(' ')).toContain(environment.apiBaseUrl);
  });
});
