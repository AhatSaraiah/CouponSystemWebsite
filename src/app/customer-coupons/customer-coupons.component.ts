import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomerService } from '../customer.service';
import { NotificationService } from '../core/notification.service';
import { Coupon } from '../core/models';

type StoreView = 'store' | 'my-coupons';

@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['./customer-coupons.component.css'],
})
export class CustomerCouponsComponent implements OnInit {
  coupons$?: Observable<Coupon[]>;
  viewMode: StoreView = 'store';

  constructor(
    private customerService: CustomerService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadStore();
  }

  toggleView(mode: StoreView): void {
    this.viewMode = mode;
    if (mode === 'store') {
      this.loadStore();
    } else {
      this.loadMyCoupons();
    }
  }

  purchaseCoupon(coupon: Coupon): void {
    if (!confirm(`Buy ${coupon.title} for ${coupon.price}?`)) {
      return;
    }

    this.customerService.addCouponPurchase(coupon).subscribe({
      next: () => {
        this.notification.success('Purchase successful!');
        this.toggleView(this.viewMode);
      },
      error: () =>
        this.notification.error('Purchase failed. The coupon may be expired or already owned.'),
    });
  }

  private loadStore(): void {
    this.coupons$ = this.customerService.getAllCoupons();
  }

  private loadMyCoupons(): void {
    this.coupons$ = this.customerService.getCustomerCoupons();
  }
}
