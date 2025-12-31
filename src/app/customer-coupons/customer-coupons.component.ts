import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['./customer-coupons.component.css']
})
export class CustomerCouponsComponent implements OnInit {
  coupons$: Observable<any> | undefined;
  viewMode: 'store' | 'my-coupons' = 'store';

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadStore();
  }

  toggleView(mode: 'store' | 'my-coupons'): void {
    this.viewMode = mode;
    if (mode === 'store') {
      this.loadStore();
    } else {
      this.loadMyCoupons();
    }
  }

  loadStore(): void {
    this.coupons$ = this.customerService.getAllCoupons();
  }

  loadMyCoupons(): void {
    this.coupons$ = this.customerService.getCustomerCoupons();
  }

  purchaseCoupon(coupon: any): void {
    if (confirm(`Buy ${coupon.title} for $${coupon.price}?`)) {
      this.customerService.addCouponPurchase(coupon).subscribe(
        () => {
          alert('Purchase successful!');
          // Refresh current view
          if (this.viewMode === 'store') this.loadStore();
          else this.loadMyCoupons();
        },
        error => {
          console.error('Error purchasing coupon:', error);
          alert('Failed to purchase coupon. It might be expired or already owned.');
        }
      );
    }
  }
}
