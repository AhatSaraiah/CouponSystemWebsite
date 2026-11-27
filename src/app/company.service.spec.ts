import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CompanyService } from './company.service';
import { environment } from '../environments/environment';
import { Coupon, CouponCategory } from './core/models';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  const base = `${environment.apiBaseUrl}/company`;

  const coupon: Coupon = {
    id: 5,
    category: CouponCategory.Food,
    title: 'Two for one',
    description: 'Lunch deal',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    amount: 10,
    price: 25,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService],
    });
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('URL-encodes the credentials when logging in', () => {
    service.companyLogin('shop@example.com', 'a b').subscribe();

    const req = httpMock.expectOne(`${base}/loginCompany/shop%40example.com/a%20b`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('lists the coupons of the signed-in company', () => {
    service.getCompanyCoupons().subscribe((result) => expect(result).toEqual([coupon]));

    const req = httpMock.expectOne(`${base}/getCompanyCoupons`);
    expect(req.request.method).toBe('GET');
    req.flush([coupon]);
  });

  it('filters coupons by category in the path', () => {
    service.getCompanyCouponsbyCategory('Food').subscribe();

    const req = httpMock.expectOne(`${base}/getCompanyCoupons/Food`);
    expect(req.request.method).toBe('GET');
    req.flush([coupon]);
  });

  it('filters coupons by max price in the path', () => {
    service.getCompanyCouponsbyPrice(80).subscribe();

    const req = httpMock.expectOne(`${base}/getCompanyCoupons/80`);
    expect(req.request.method).toBe('GET');
    req.flush([coupon]);
  });

  it('creates a coupon with POST', () => {
    service.addCoupon(coupon).subscribe();

    const req = httpMock.expectOne(`${base}/addCoupon`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(coupon);
    req.flush(coupon);
  });

  it('updates a coupon with PUT', () => {
    service.updateCoupon(coupon).subscribe();

    const req = httpMock.expectOne(`${base}/updateCoupon`);
    expect(req.request.method).toBe('PUT');
    req.flush(coupon);
  });

  it('deletes a coupon by id', () => {
    service.deleteCoupon(5).subscribe();

    const req = httpMock.expectOne(`${base}/deleteCoupon/5`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
