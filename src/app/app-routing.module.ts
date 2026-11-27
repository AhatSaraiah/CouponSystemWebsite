import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './login/login.component';
import { AdminCompaniesComponent } from './admin-companies/admin-companies.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { CompanyCouponsComponent } from './company-coupons/company-coupons.component';
import { CustomerCouponsComponent } from './customer-coupons/customer-coupons.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'DefaultComponent',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin-companies',
        component: AdminCompaniesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'admin-customers',
        component: AdminCustomersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'company-coupons',
        component: CompanyCouponsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['company'] },
      },
      {
        path: 'customer-coupons',
        component: CustomerCouponsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['customer'] },
      },
    ],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
