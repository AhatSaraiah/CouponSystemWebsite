import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  adminLogin(email: string, password: string){
    const encodedEmail = encodeURIComponent(email);
    const encodedPassword = encodeURIComponent(password);
    const url = `http://localhost:9096/admin/loginAdmin/${encodedEmail}/${encodedPassword}`;    
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
  addCompany(company: any) {
    const url = 'http://localhost:9096/admin/addCompany';    
    return this.http.post(url, company);
  }
  updateCompany(company: any) {
    const url = 'http://localhost:9096/admin/updateCompany';    
    return this.http.put(url, company);
  }
 deleteCompany(id: number) {
    const url = `http://localhost:9096/admin/deleteCompany/${id}`;    
    return this.http.delete(url);
  }

  getAllCustomers() {
    const url = 'http://localhost:9096/admin/getAllCustomers';    
    return this.http.get(url);
  }
  getOneCustomer() {
    const url = 'http://localhost:9096/admin/getOneCustomer/{id}';    
    return this.http.get(url);
  }
  addCustomer(customer: any) {
    const url = 'http://localhost:9096/admin/addCustomer';    
    return this.http.post(url, customer);
  }
  updateCustomer(customer: any) {
    const url = 'http://localhost:9096/admin/updateCustomer';    
    return this.http.put(url, customer);
  }
  deleteCustomer(id: number) {
    const url = `http://localhost:9096/admin/deleteCustomer/${id}`;    
    return this.http.delete(url);
  }

}
