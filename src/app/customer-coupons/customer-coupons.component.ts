import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['./customer-coupons.component.css']
})
export class CustomerCouponsComponent implements OnInit {
  coupons$: unknown | undefined;
  selectedCategory = '';
  maxPrice: number | null = null;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.customerService.getCustomerCoupons().subscribe(
      data => this.coupons$ = data,
      error => console.error('Error loading coupons:', error)
    );
  }

  filterByCategory(): void {
    if (this.selectedCategory) {
      this.customerService.getCustomerCouponsbyCategory().subscribe(
        data => this.coupons$ = data,
        error => console.error('Error filtering by category:', error)
      );
    } else {
      this.loadCoupons();
    }
  }

  filterByPrice(): void {
    if (this.maxPrice !== null) {
      this.customerService.getCustomerCouponsbyPrice().subscribe(
        data => this.coupons$ = data,
        error => console.error('Error filtering by price:', error)
      );
    } else {
      this.loadCoupons();
    }
  }

  purchaseCoupon(): void {
    this.customerService.addCouponPurchase().subscribe(
      () => {
        this.loadCoupons();
      },
      error => console.error('Error purchasing coupon:', error)
    );
  }
}
