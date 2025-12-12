import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css']
})
export class CompanyCouponsComponent implements OnInit {
  coupons$: unknown | undefined;
  selectedCategory = '';
  maxPrice: number | null = null;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.companyService.getCompanyCoupons().subscribe(
      data => this.coupons$ = data,
      error => console.error('Error loading coupons:', error)
    );
  }

  filterByCategory(): void {
    if (this.selectedCategory) {
      this.companyService.getCompanyCouponsbyCategory().subscribe(
        data => this.coupons$ = data,
        error => console.error('Error filtering by category:', error)
      );
    } else {
      this.loadCoupons();
    }
  }

  filterByPrice(): void {
    if (this.maxPrice !== null) {
      this.companyService.getCompanyCouponsbyPrice().subscribe(
        data => this.coupons$ = data,
        error => console.error('Error filtering by price:', error)
      );
    } else {
      this.loadCoupons();
    }
  }

  addCoupon(): void {
    this.companyService.addCoupon().subscribe(
      () => {
        this.loadCoupons();
      },
      error => console.error('Error adding coupon:', error)
    );
  }

  updateCoupon(): void {
    this.companyService.updateCoupon().subscribe(
      () => {
        this.loadCoupons();
      },
      error => console.error('Error updating coupon:', error)
    );
  }

  deleteCoupon(_id: number): void {
    this.companyService.deleteCoupon().subscribe(
      () => {
        this.loadCoupons();
      },
      error => console.error('Error deleting coupon:', error)
    );
  }
}
