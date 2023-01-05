import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

 
  constructor(private http: HttpClient) { }
  companyLogin(){
    const url = 'http://localhost:9096/company/loginCompany/{email}/{password}';    
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
  addCoupon() {
    const url = 'http://localhost:9096/company/addCoupon';    
    return this.http.get(url);
  }
  getCompanyCouponsbyPrice() {
    const url = 'http://localhost:9096/company/getCompanyCoupons/{maxPrice}';    
    return this.http.get(url);
  }
 
  getCompanyDetails() {
    const url = 'http://localhost:9096/company/getCompanyDetails';    
    return this.http.get(url);
  }

  updateCoupon() {
    const url = 'http://localhost:9096/company/updateCoupon';    
    return this.http.get(url);
  }
 deleteCoupon() {
    const url = 'http://localhost:9096/company/deleteCoupon/{id}';    
    return this.http.get(url);
  }
 
}
