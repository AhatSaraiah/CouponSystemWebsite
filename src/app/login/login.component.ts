import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AdminService } from '../admin.service';
import { CompanyService } from '../company.service';
import { CustomerService } from '../customer.service';
import { AuthService } from '../auth.service';
import { NotificationService } from '../core/notification.service';
import { ClientType, CLIENT_TYPE_BY_VALUE } from '../core/models';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('clientTypeSelect') clientTypeSelect!: MatSelect;

  loginForm: FormGroup;
  clientType = '';
  hidePassword = true;

  private clientTypeSubscription?: Subscription;

  /** Where each role lands after a successful sign-in. */
  private readonly homeRouteByRole: Record<ClientType, string> = {
    admin: '/DefaultComponent/admin-companies',
    company: '/DefaultComponent/company-coupons',
    customer: '/DefaultComponent/customer-coupons',
  };

  private readonly roleLabel: Record<ClientType, string> = {
    admin: 'Admin',
    company: 'Company',
    customer: 'Customer',
  };

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private companyService: CompanyService,
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      clientType: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    // Angular Material 15 (MDC) keeps a field's label floating only while the
    // control is focused, which leaves the select looking empty when a value is
    // set programmatically. These helpers force the floated state after render.
    setTimeout(() => {
      this.syncMaterialLabels();

      this.clientTypeSubscription = this.loginForm
        .get('clientType')
        ?.valueChanges.subscribe((value) => this.updateLabelFloat(value));

      const currentValue = this.loginForm.get('clientType')?.value;
      if (currentValue) {
        this.updateLabelFloat(currentValue);
      }
    }, 50);
  }

  ngOnDestroy(): void {
    this.clientTypeSubscription?.unsubscribe();
  }

  onOpenedChange(isOpen: boolean): void {
    if (!isOpen) {
      return;
    }
    setTimeout(() => {
      const selectPanel = document.querySelector('.mat-mdc-select-panel') as HTMLElement | null;
      if (selectPanel) {
        selectPanel.style.display = 'block';
        selectPanel.style.visibility = 'visible';
        selectPanel.style.opacity = '1';
      }
    }, 50);
  }

  onClientTypeChange(event: { value: string }): void {
    this.clientType = event.value;
    this.updateLabelFloat(event.value);
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.notification.error('Please fill in all required fields correctly.');
      return;
    }

    const { email, password, clientType } = this.loginForm.value as {
      email: string;
      password: string;
      clientType: string;
    };

    const role = CLIENT_TYPE_BY_VALUE[clientType];
    if (!role) {
      this.notification.error('Please select a client type.');
      return;
    }

    this.login(email, password, role).subscribe({
      next: (authenticated) => {
        if (!authenticated) {
          this.notification.error('Login failed: invalid email or password.');
          return;
        }
        this.authService.setUserRole(role);
        this.router.navigate([this.homeRouteByRole[role]]);
      },
      error: (error: HttpErrorResponse) => this.notification.error(this.describeLoginError(role, error)),
    });
  }

  private login(email: string, password: string, role: ClientType): Observable<boolean> {
    switch (role) {
      case 'admin':
        return this.adminService.adminLogin(email, password);
      case 'company':
        return this.companyService.companyLogin(email, password);
      default:
        return this.customerService.customerLogin(email, password);
    }
  }

  private describeLoginError(role: ClientType, error: HttpErrorResponse): string {
    const label = this.roleLabel[role];

    if (error.status === 0) {
      return `Backend server is not running. Start it on ${environment.apiBaseUrl}.`;
    }
    if (error.status === 401 || error.status === 403) {
      return `${label} login failed: invalid email or password.`;
    }
    if (error.status === 404) {
      return `${label} not found. Please check the email address.`;
    }
    return `${label} login failed (${error.status}).`;
  }

  private updateLabelFloat(value: unknown): void {
    setTimeout(() => {
      const formField = this.clientTypeSelect?._elementRef?.nativeElement?.closest(
        '.mat-mdc-form-field'
      ) as HTMLElement | null;
      if (!formField) {
        return;
      }

      const floatingLabel = formField.querySelector(
        '.mat-mdc-floating-label, .mdc-floating-label'
      ) as HTMLElement | null;

      if (value) {
        formField.classList.add('mat-form-field-should-float');
        floatingLabel?.classList.add('mdc-floating-label--float-above');
      } else {
        formField.classList.remove('mat-form-field-should-float');
        floatingLabel?.classList.remove('mdc-floating-label--float-above');
      }
    }, 0);
  }

  private syncMaterialLabels(): void {
    const formFields = document.querySelectorAll<HTMLElement>('.mat-mdc-form-field');

    formFields.forEach((field) => {
      field.classList.add('mat-form-field-should-float');

      const notch = field.querySelector('.mdc-notched-outline');
      notch?.classList.add('mdc-notched-outline--notched');

      const labels = field.querySelectorAll<HTMLElement>(
        '.mdc-floating-label, .mat-mdc-floating-label, [class*="floating-label"]'
      );

      labels.forEach((label) => {
        label.classList.add('mdc-floating-label--float-above');
        label.style.transform = 'translateY(-1.28125em) scale(0.75)';
        label.style.opacity = '1';
        label.style.position = 'absolute';
        label.style.top = '0';
        label.style.left = '12px';
        label.style.width = 'auto';
        label.style.maxWidth = 'none';
        label.style.overflow = 'visible';
        label.style.textOverflow = 'clip';
        label.style.whiteSpace = 'nowrap';
        label.style.zIndex = '1';

        setTimeout(() => this.sizeNotchFor(label, field), 50);
      });
    });
  }

  private sizeNotchFor(label: HTMLElement, field: HTMLElement): void {
    const matLabel = label.querySelector('mat-label');
    const text = (matLabel?.textContent || label.textContent || '').trim();
    if (!text) {
      return;
    }

    const probe = document.createElement('span');
    probe.style.visibility = 'hidden';
    probe.style.position = 'absolute';
    probe.style.fontSize = '16px';
    probe.style.fontWeight = '400';
    probe.style.fontFamily = 'Roboto, sans-serif';
    probe.style.whiteSpace = 'nowrap';
    probe.textContent = text;
    document.body.appendChild(probe);

    const textWidth = probe.offsetWidth;
    document.body.removeChild(probe);

    const notch = field.querySelector('.mdc-notched-outline__notch') as HTMLElement | null;
    if (notch) {
      // The label is scaled to 0.75, so scale the measured width to match it.
      const notchWidth = textWidth * 0.75 + 20;
      notch.style.width = `${Math.max(notchWidth, 80)}px`;
      notch.style.maxWidth = 'none';
      notch.style.minWidth = '0';
    }
  }
}
