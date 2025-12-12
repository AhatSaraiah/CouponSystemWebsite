import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call customerLogin with correct URL', () => {
    service.customerLogin().subscribe();

    const req = httpMock.expectOne((request) => {
      return request.url.includes('/customer/loginCustomer');
    });
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get customer coupons', () => {
    const mockCoupons = [{ id: 1, title: 'Test Coupon' }];

    service.getCustomerCoupons().subscribe(coupons => {
      expect(coupons).toEqual(mockCoupons);
    });

    const req = httpMock.expectOne('http://localhost:9096/customer/getCustomerCoupons');
    expect(req.request.method).toBe('GET');
    req.flush(mockCoupons);
  });

  it('should get customer coupons by category', () => {
    service.getCustomerCouponsbyCategory().subscribe();

    const req = httpMock.expectOne((request) => {
      return request.url.includes('/customer/getCustomerCoupons');
    });
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should get customer coupons by price', () => {
    service.getCustomerCouponsbyPrice().subscribe();

    const req = httpMock.expectOne((request) => {
      return request.url.includes('/customer/getCustomerCoupons');
    });
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should add coupon purchase', () => {
    service.addCouponPurchase().subscribe();

    const req = httpMock.expectOne('http://localhost:9096/customer/addCouponPurchase');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get customer details', () => {
    const mockCustomer = { id: 1, name: 'Test Customer' };

    service.getCustomerDetails().subscribe(customer => {
      expect(customer).toEqual(mockCustomer);
    });

    const req = httpMock.expectOne('http://localhost:9096/customer/getCustomerDetails');
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomer);
  });
});
