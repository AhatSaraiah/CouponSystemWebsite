import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  adminLogin(){
    const url = 'http://localhost:9096/admin/loginAdmin/{email}/{password}';    
    return this.http.get(url);
  }
  getCompanies() {
    const url = 'http://localhost:9096/admin/getAllCompanies';    
    return this.http.get(url);
  }
  getOneCompany() {
    const url = 'http://localhost:9096/admin/getOneCompany/{id}';    
    return this.http.get(url);
  }
  addCompany() {
    const url = 'http://localhost:9096/admin/addCompany';    
    return this.http.get(url);
  }
  updateCompany() {
    const url = 'http://localhost:9096/admin/updateCompany';    
    return this.http.get(url);
  }
 deleteCompany() {
    const url = 'http://localhost:9096/admin/deleteCompany/{id}';    
    return this.http.get(url);
  }

  getAllCustomers() {
    const url = 'http://localhost:9096/admin/getAllCustomers';    
    return this.http.get(url);
  }
  getOneCustomer() {
    const url = 'http://localhost:9096/admin/getOneCustomer/{id}';    
    return this.http.get(url);
  }
  addCustomer() {
    const url = 'http://localhost:9096/admin/addCustomer';    
    return this.http.get(url);
  }
  updateCustomer() {
    const url = 'http://localhost:9096/admin/updateCustomer';    
    return this.http.get(url);
  }
  deleteCustomer() {
    const url = 'http://localhost:9096/admin/deleteCustomer/{id}';    
    return this.http.get(url);
  }

}
