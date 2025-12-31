import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AppComponent } from './app.component';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './login/login.component';
import { AdminCompaniesComponent } from './admin-companies/admin-companies.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { CompanyCouponsComponent } from './company-coupons/company-coupons.component';
import { CustomerCouponsComponent } from './customer-coupons/customer-coupons.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'DefaultComponent',
    component: DefaultComponent,
    children: [
      { path: 'admin-companies', component: AdminCompaniesComponent },
      { path: 'admin-customers', component: AdminCustomersComponent },
      { path: 'company-coupons', component: CompanyCouponsComponent },
      { path: 'customer-coupons', component: CustomerCouponsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
