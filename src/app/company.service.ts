import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { Company, Coupon } from './core/models';

/**
 * Company endpoints: authentication plus coupon management for the signed-in company.
 */
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly baseUrl = `${environment.apiBaseUrl}/company`;

  constructor(private http: HttpClient) {}

  companyLogin(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/loginCompany/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;
    return this.http.get<boolean>(url);
  }

  getCompanyDetails(): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/getCompanyDetails`);
  }

  getCompanyCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/getCompanyCoupons`);
  }

  getCompanyCouponsbyCategory(category: string): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/getCompanyCoupons/${encodeURIComponent(category)}`);
  }

  getCompanyCouponsbyPrice(maxPrice: number): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/getCompanyCoupons/${maxPrice}`);
  }

  addCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(`${this.baseUrl}/addCoupon`, coupon);
  }

  updateCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.put<Coupon>(`${this.baseUrl}/updateCoupon`, coupon);
  }

  deleteCoupon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCoupon/${id}`);
  }
}
