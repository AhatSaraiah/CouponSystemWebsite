import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerService } from './customer.service';
import { environment } from '../environments/environment';
import { Coupon, CouponCategory } from './core/models';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  const base = `${environment.apiBaseUrl}/customer`;

  const coupon: Coupon = {
    id: 9,
    category: CouponCategory.Vacation,
    title: 'Weekend away',
    description: 'Two nights',
    startDate: '2026-02-01',
    endDate: '2026-03-01',
    amount: 3,
    price: 400,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService],
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('URL-encodes the credentials when logging in', () => {
    service.customerLogin('buyer@example.com', 'pa ss').subscribe();

    const req = httpMock.expectOne(`${base}/loginCustomer/buyer%40example.com/pa%20ss`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('lists every coupon in the store', () => {
    service.getAllCoupons().subscribe((result) => expect(result).toEqual([coupon]));

    const req = httpMock.expectOne(`${base}/getAllCoupons`);
    expect(req.request.method).toBe('GET');
    req.flush([coupon]);
  });

  it('lists the coupons the customer owns', () => {
    service.getCustomerCoupons().subscribe((result) => expect(result).toEqual([coupon]));

    const req = httpMock.expectOne(`${base}/getCustomerCoupons`);
    expect(req.request.method).toBe('GET');
    req.flush([coupon]);
  });

  it('filters by category in the path', () => {
    service.getCustomerCouponsbyCategory('Vacation').subscribe();

    const req = httpMock.expectOne(`${base}/getCustomerCoupons/Vacation`);
    expect(req.request.method).toBe('GET');
    req.flush([coupon]);
  });

  it('filters by max price in the path', () => {
    service.getCustomerCouponsbyPrice(100).subscribe();

    const req = httpMock.expectOne(`${base}/getCustomerCoupons/100`);
    expect(req.request.method).toBe('GET');
    req.flush([coupon]);
  });

  it('purchases a coupon with POST', () => {
    service.addCouponPurchase(coupon).subscribe();

    const req = httpMock.expectOne(`${base}/addCouponPurchase`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(coupon);
    req.flush(coupon);
  });
});
