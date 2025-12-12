import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call loginCompany with correct URL', () => {
    service.companyLogin().subscribe();

    const req = httpMock.expectOne((request) => {
      return request.url.includes('/company/loginCompany');
    });
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get company coupons', () => {
    const mockCoupons = [{ id: 1, title: 'Test Coupon' }];

    service.getCompanyCoupons().subscribe(coupons => {
      expect(coupons).toEqual(mockCoupons);
    });

    const req = httpMock.expectOne('http://localhost:9096/company/getCompanyCoupons');
    expect(req.request.method).toBe('GET');
    req.flush(mockCoupons);
  });

  it('should get company coupons by category', () => {
    service.getCompanyCouponsbyCategory().subscribe();

    const req = httpMock.expectOne((request) => {
      return request.url.includes('/company/getCompanyCoupons');
    });
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should get company coupons by price', () => {
    service.getCompanyCouponsbyPrice().subscribe();

    const req = httpMock.expectOne((request) => {
      return request.url.includes('/company/getCompanyCoupons');
    });
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should get company details', () => {
    const mockCompany = { id: 1, name: 'Test Company' };

    service.getCompanyDetails().subscribe(company => {
      expect(company).toEqual(mockCompany);
    });

    const req = httpMock.expectOne('http://localhost:9096/company/getCompanyDetails');
    expect(req.request.method).toBe('GET');
    req.flush(mockCompany);
  });

  it('should add coupon', () => {
    service.addCoupon().subscribe();

    const req = httpMock.expectOne('http://localhost:9096/company/addCoupon');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should update coupon', () => {
    service.updateCoupon().subscribe();

    const req = httpMock.expectOne('http://localhost:9096/company/updateCoupon');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should delete coupon', () => {
    service.deleteCoupon().subscribe();

    const req = httpMock.expectOne((request) => {
      return request.url.includes('/company/deleteCoupon');
    });
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
