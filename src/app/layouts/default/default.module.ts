import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultComponent } from 'src/app/layouts/default/default.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


import { AdminCompaniesComponent } from 'src/app/admin-companies/admin-companies.component';
import { AdminCustomersComponent } from 'src/app/admin-customers/admin-customers.component';
import { CompanyCouponsComponent } from 'src/app/company-coupons/company-coupons.component';
import { CustomerCouponsComponent } from 'src/app/customer-coupons/customer-coupons.component';

@NgModule({
  declarations: [
    DefaultComponent,
    LoginComponent,
    AdminCompaniesComponent,
    AdminCustomersComponent,
    CompanyCouponsComponent,
    CustomerCouponsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
  exports: [
    DefaultComponent,
    LoginComponent
  ]
})
export class DefaultModule { }
