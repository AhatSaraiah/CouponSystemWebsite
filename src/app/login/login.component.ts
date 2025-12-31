import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CompanyService } from '../company.service';
import { CustomerService } from '../customer.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('clientTypeSelect') clientTypeSelect!: MatSelect;
  loginForm: FormGroup;
  clientType = '';
  hidePassword = true;
  private clientTypeSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private companyService: CompanyService,
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      clientType: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Force all form fields to have labels floating
      const formFields = document.querySelectorAll('.mat-mdc-form-field');
      formFields.forEach(field => {
        const htmlField = field as HTMLElement;
        htmlField.classList.add('mat-form-field-should-float');

        // Ensure notch is notched
        const notch = htmlField.querySelector('.mdc-notched-outline');
        if (notch) {
          (notch as HTMLElement).classList.add('mdc-notched-outline--notched');
        }

        // Find and update all label elements
        const labels = htmlField.querySelectorAll('.mdc-floating-label, .mat-mdc-floating-label, [class*="floating-label"]');
        labels.forEach(label => {
          const htmlLabel = label as HTMLElement;
          htmlLabel.classList.add('mdc-floating-label--float-above');
          htmlLabel.style.transform = 'translateY(-1.28125em) scale(0.75)';
          htmlLabel.style.opacity = '1';
          htmlLabel.style.position = 'absolute';
          htmlLabel.style.top = '0';
          htmlLabel.style.left = '12px';
          htmlLabel.style.width = 'auto';
          htmlLabel.style.maxWidth = 'none';
          htmlLabel.style.overflow = 'visible';
          htmlLabel.style.textOverflow = 'clip';
          htmlLabel.style.whiteSpace = 'nowrap';
          htmlLabel.style.zIndex = '1';

          // Calculate and set notch width based on actual label text width
          setTimeout(() => {
            const labelText = htmlLabel.textContent?.trim() || '';
            const matLabel = htmlLabel.querySelector('mat-label');
            const actualText = matLabel?.textContent?.trim() || labelText;

            if (actualText) {
              // Create a temporary span to measure text width accurately
              const tempSpan = document.createElement('span');
              tempSpan.style.visibility = 'hidden';
              tempSpan.style.position = 'absolute';
              tempSpan.style.fontSize = '16px';
              tempSpan.style.fontWeight = '400';
              tempSpan.style.fontFamily = 'Roboto, sans-serif';
              tempSpan.style.whiteSpace = 'nowrap';
              tempSpan.textContent = actualText;
              document.body.appendChild(tempSpan);

              const textWidth = tempSpan.offsetWidth;
              document.body.removeChild(tempSpan);

              // Set notch width (scaled by 0.75 + padding for the notch)
              const notch = htmlField.querySelector('.mdc-notched-outline__notch');
              if (notch) {
                const notchElement = notch as HTMLElement;
                const scaledWidth = (textWidth * 0.75) + 20; // Scale factor + extra padding
                notchElement.style.width = `${Math.max(scaledWidth, 80)}px`;
                notchElement.style.maxWidth = 'none';
                notchElement.style.minWidth = '0';
              }
            }
          }, 50);
        });
      });

      // Subscribe to form control value changes
      this.clientTypeSubscription = this.loginForm.get('clientType')?.valueChanges.subscribe(value => {
        this.updateLabelFloat(value);
      });

      // Initial check
      const currentValue = this.loginForm.get('clientType')?.value;
      if (currentValue) {
        this.updateLabelFloat(currentValue);
      }
    }, 50);
  }

  ngOnDestroy(): void {
    if (this.clientTypeSubscription) {
      this.clientTypeSubscription.unsubscribe();
    }
  }

  private updateLabelFloat(value: any): void {
    setTimeout(() => {
      const formField = this.clientTypeSelect?._elementRef?.nativeElement?.closest('.mat-mdc-form-field');
      if (formField) {
        if (value && value !== '') {
          formField.classList.add('mat-form-field-should-float');
          const floatingLabel = formField.querySelector('.mat-mdc-floating-label, .mdc-floating-label');
          if (floatingLabel) {
            (floatingLabel as HTMLElement).classList.add('mdc-floating-label--float-above');
          }
        } else {
          formField.classList.remove('mat-form-field-should-float');
          const floatingLabel = formField.querySelector('.mat-mdc-floating-label, .mdc-floating-label');
          if (floatingLabel) {
            (floatingLabel as HTMLElement).classList.remove('mdc-floating-label--float-above');
          }
        }
      }
    }, 0);
  }

  onOpenedChange(isOpen: boolean): void {
    if (isOpen) {
      setTimeout(() => {
        const selectPanel = document.querySelector('.mat-mdc-select-panel');
        if (selectPanel) {
          (selectPanel as HTMLElement).style.display = 'block';
          (selectPanel as HTMLElement).style.visibility = 'visible';
          (selectPanel as HTMLElement).style.opacity = '1';
        }
      }, 50);
    }
  }

  onClientTypeChange(event: any): void {
    const type = event.value;
    this.clientType = type;
    this.updateLabelFloat(type);
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, clientType } = this.loginForm.value;
      console.log('Attempting login...', { email, clientType });

      switch (clientType) {
        case '1': // Admin
          this.adminService.adminLogin(email, password).subscribe(
            response => {
              console.log('Backend response:', response);
              if (response === true) {
                this.authService.setUserRole('admin');
                this.router.navigate(['/DefaultComponent']);
              } else {
                alert('Login failed: Invalid Credentials');
              }
            },
            error => {
              console.error('Login Error:', error);
              let errorMessage = 'Admin login failed. ';
              if (error.status === 401 || error.status === 403) {
                errorMessage += 'Invalid email or password.';
              } else if (error.status === 404) {
                errorMessage += 'Admin not found. Please check your email.';
              } else if (error.status === 0 || error.name === 'HttpErrorResponse') {
                errorMessage = '❌ Backend server is not running!\n\n';
                errorMessage += 'Please start the backend server on http://localhost:9096';
              } else {
                errorMessage += `Error: ${error.status} - ${error.message || 'Unknown error'}`;
              }
              alert(errorMessage);
            }
          );
          break;
        case '2': // Company
          this.companyService.companyLogin(email, password).subscribe(
            response => {
              console.log('Backend response:', response);
              if (response === true) {
                this.authService.setUserRole('company');
                this.router.navigate(['/DefaultComponent']);
              } else {
                alert('Login failed: Invalid Credentials');
              }
            },
            error => {
              console.error('Login Error:', error);
              let errorMessage = 'Company login failed. ';
              if (error.status === 401 || error.status === 403) {
                errorMessage += 'Invalid email or password.';
              } else if (error.status === 404) {
                errorMessage += 'Company not found. Please check your email.';
              } else if (error.status === 0 || error.name === 'HttpErrorResponse') {
                errorMessage = '❌ Backend server is not running!\n\n';
                errorMessage += 'Please start the backend server on http://localhost:9096';
              } else {
                errorMessage += `Error: ${error.status} - ${error.message || 'Unknown error'}`;
              }
              alert(errorMessage);
            }
          );
          break;
        case '3': // Customer
          this.customerService.customerLogin(email, password).subscribe(
            response => {
              console.log('Backend response:', response);
              if (response === true) {
                this.authService.setUserRole('customer');
                this.router.navigate(['/DefaultComponent']);
              } else {
                alert('Login failed: Invalid Credentials');
              }
            },
            error => {
              console.error('Login Error:', error);
              let errorMessage = 'Customer login failed. ';
              if (error.status === 401 || error.status === 403) {
                errorMessage += 'Invalid email or password.';
              } else if (error.status === 404) {
                errorMessage += 'Customer not found. Please check your email.';
              } else if (error.status === 0 || error.name === 'HttpErrorResponse') {
                errorMessage = '❌ Backend server is not running!\n\n';
                errorMessage += 'Please start the backend server on http://localhost:9096';
              } else {
                errorMessage += `Error: ${error.status} - ${error.message || 'Unknown error'}`;
              }
              alert(errorMessage);
            }
          );
          break;
        default:
          alert('Please select a client type.');
      }
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
