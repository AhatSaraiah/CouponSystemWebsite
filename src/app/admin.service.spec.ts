import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call adminLogin with correct URL', () => {
    service.adminLogin().subscribe();

    const req = httpMock.expectOne((request) => {
      return request.url.includes('/admin/loginAdmin');
    });
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  describe('Company Management', () => {
    it('should get all companies', () => {
      const mockCompanies = [{ id: 1, name: 'Company 1' }, { id: 2, name: 'Company 2' }];

      service.getCompanies().subscribe(companies => {
        expect(companies).toEqual(mockCompanies);
      });

      const req = httpMock.expectOne('http://localhost:9096/admin/getAllCompanies');
      expect(req.request.method).toBe('GET');
      req.flush(mockCompanies);
    });

    it('should get one company', () => {
      service.getOneCompany().subscribe();

      const req = httpMock.expectOne((request) => {
        return request.url.includes('/admin/getOneCompany');
      });
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should add company', () => {
      service.addCompany().subscribe();

      const req = httpMock.expectOne('http://localhost:9096/admin/addCompany');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should update company', () => {
      service.updateCompany().subscribe();

      const req = httpMock.expectOne('http://localhost:9096/admin/updateCompany');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should delete company', () => {
      service.deleteCompany().subscribe();

      const req = httpMock.expectOne((request) => {
        return request.url.includes('/admin/deleteCompany');
      });
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  describe('Customer Management', () => {
    it('should get all customers', () => {
      const mockCustomers = [{ id: 1, name: 'Customer 1' }, { id: 2, name: 'Customer 2' }];

      service.getAllCustomers().subscribe(customers => {
        expect(customers).toEqual(mockCustomers);
      });

      const req = httpMock.expectOne('http://localhost:9096/admin/getAllCustomers');
      expect(req.request.method).toBe('GET');
      req.flush(mockCustomers);
    });

    it('should get one customer', () => {
      service.getOneCustomer().subscribe();

      const req = httpMock.expectOne((request) => {
        return request.url.includes('/admin/getOneCustomer');
      });
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should add customer', () => {
      service.addCustomer().subscribe();

      const req = httpMock.expectOne('http://localhost:9096/admin/addCustomer');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should update customer', () => {
      service.updateCustomer().subscribe();

      const req = httpMock.expectOne('http://localhost:9096/admin/updateCustomer');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should delete customer', () => {
      service.deleteCustomer().subscribe();

      const req = httpMock.expectOne((request) => {
        return request.url.includes('/admin/deleteCustomer');
      });
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });
});
