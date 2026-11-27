import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AdminService } from './admin.service';
import { environment } from '../environments/environment';
import { Company, Customer } from './core/models';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  const base = `${environment.apiBaseUrl}/admin`;

  const company: Company = { id: 1, name: 'Acme', email: 'acme@example.com' };
  const customer: Customer = { id: 2, firstName: 'Dana', lastName: 'Levi', email: 'dana@example.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService],
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('URL-encodes the credentials when logging in', () => {
    service.adminLogin('admin@coupon.com', 'p@ss word').subscribe();

    const req = httpMock.expectOne(`${base}/loginAdmin/admin%40coupon.com/p%40ss%20word`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('lists companies', () => {
    service.getCompanies().subscribe((result) => expect(result).toEqual([company]));

    const req = httpMock.expectOne(`${base}/getAllCompanies`);
    expect(req.request.method).toBe('GET');
    req.flush([company]);
  });

  it('fetches one company by id', () => {
    service.getOneCompany(company.id as number).subscribe((result) => expect(result).toEqual(company));

    const req = httpMock.expectOne(`${base}/getOneCompany/1`);
    expect(req.request.method).toBe('GET');
    req.flush(company);
  });

  it('creates a company with POST', () => {
    service.addCompany(company).subscribe((result) => expect(result).toEqual(company));

    const req = httpMock.expectOne(`${base}/addCompany`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(company);
    req.flush(company);
  });

  it('updates a company with PUT', () => {
    service.updateCompany(company).subscribe();

    const req = httpMock.expectOne(`${base}/updateCompany`);
    expect(req.request.method).toBe('PUT');
    req.flush(company);
  });

  it('deletes a company by id', () => {
    service.deleteCompany(1).subscribe();

    const req = httpMock.expectOne(`${base}/deleteCompany/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('lists customers', () => {
    service.getAllCustomers().subscribe((result) => expect(result).toEqual([customer]));

    const req = httpMock.expectOne(`${base}/getAllCustomers`);
    expect(req.request.method).toBe('GET');
    req.flush([customer]);
  });

  it('fetches one customer by id', () => {
    service.getOneCustomer(2).subscribe((result) => expect(result).toEqual(customer));

    const req = httpMock.expectOne(`${base}/getOneCustomer/2`);
    expect(req.request.method).toBe('GET');
    req.flush(customer);
  });

  it('creates a customer with POST', () => {
    service.addCustomer(customer).subscribe();

    const req = httpMock.expectOne(`${base}/addCustomer`);
    expect(req.request.method).toBe('POST');
    req.flush(customer);
  });

  it('updates a customer with PUT', () => {
    service.updateCustomer(customer).subscribe();

    const req = httpMock.expectOne(`${base}/updateCustomer`);
    expect(req.request.method).toBe('PUT');
    req.flush(customer);
  });

  it('deletes a customer by id', () => {
    service.deleteCustomer(2).subscribe();

    const req = httpMock.expectOne(`${base}/deleteCustomer/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
