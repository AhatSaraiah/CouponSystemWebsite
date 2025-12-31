import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private http: HttpClient) { }
  companyLogin(email: string, password: string) {
    const encodedEmail = encodeURIComponent(email);
    const encodedPassword = encodeURIComponent(password);
    const url = `http://localhost:9096/company/loginCompany/${encodedEmail}/${encodedPassword}`;
    return this.http.get(url);
  }
  getCompanyCoupons() {
    const url = 'http://localhost:9096/company/getCompanyCoupons';
    return this.http.get(url);
  }
  getCompanyCouponsbyCategory() {
    const url = 'http://localhost:9096/company/getCompanyCoupons/{category}';
    return this.http.get(url);
  }
  addCoupon(coupon: any) {
    const url = 'http://localhost:9096/company/addCoupon';
    return this.http.post(url, coupon);
  }
  getCompanyCouponsbyPrice() {
    const url = 'http://localhost:9096/company/getCompanyCoupons/{maxPrice}';
    return this.http.get(url);
  }

  getCompanyDetails() {
    const url = 'http://localhost:9096/company/getCompanyDetails';
    return this.http.get(url);
  }

  updateCoupon(coupon: any) {
    const url = 'http://localhost:9096/company/updateCoupon';
    return this.http.put(url, coupon);
  }
  deleteCoupon(id: number) {
    const url = `http://localhost:9096/company/deleteCoupon/${id}`;
    return this.http.delete(url);
  }

}
