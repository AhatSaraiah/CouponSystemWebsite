import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { Coupon, Customer } from './core/models';

/**
 * Customer endpoints: authentication, browsing the store and buying coupons.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly baseUrl = `${environment.apiBaseUrl}/customer`;

  constructor(private http: HttpClient) {}

  customerLogin(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/loginCustomer/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;
    return this.http.get<boolean>(url);
  }

  getCustomerDetails(): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/getCustomerDetails`);
  }

  getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/getAllCoupons`);
  }

  getCustomerCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/getCustomerCoupons`);
  }

  getCustomerCouponsbyCategory(category: string): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/getCustomerCoupons/${encodeURIComponent(category)}`);
  }

  getCustomerCouponsbyPrice(maxPrice: number): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/getCustomerCoupons/${maxPrice}`);
  }

  addCouponPurchase(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(`${this.baseUrl}/addCouponPurchase`, coupon);
  }
}
