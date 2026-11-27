import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { Company, Customer } from './core/models';

/**
 * Admin endpoints: authentication plus CRUD over companies and customers.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly baseUrl = `${environment.apiBaseUrl}/admin`;

  constructor(private http: HttpClient) {}

  adminLogin(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/loginAdmin/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;
    return this.http.get<boolean>(url);
  }

  // Companies

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/getAllCompanies`);
  }

  getOneCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/getOneCompany/${id}`);
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}/addCompany`, company);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/updateCompany`, company);
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCompany/${id}`);
  }

  // Customers

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/getAllCustomers`);
  }

  getOneCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/getOneCustomer/${id}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/addCustomer`, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/updateCustomer`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCustomer/${id}`);
  }
}
