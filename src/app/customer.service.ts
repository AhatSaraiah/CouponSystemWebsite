import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  customerLogin(){
    const url = 'http://localhost:9096/customer/loginCustomer/{email}/{password}';    
    return this.http.get(url);
  }
  getCustomerCoupons() {
    const url = 'http://localhost:9096/customer/getCustomerCoupons';    
    return this.http.get(url);
  }
  getCustomerCouponsbyCategory() {
    const url = 'http://localhost:9096/customer/getCustomerCoupons/{category}';    
    return this.http.get(url);
  }
  addCouponPurchase() {
    const url = 'http://localhost:9096/customer/addCouponPurchase';    
    return this.http.get(url);
  }
  getCustomerCouponsbyPrice() {
    const url = 'http://localhost:9096/customer/getCustomerCoupons/{maxPrice}';    
    return this.http.get(url);
  }
 
  getCustomerDetails() {
    const url = 'http://localhost:9096/customer/getCustomerDetails';    
    return this.http.get(url);
  }
 
}
