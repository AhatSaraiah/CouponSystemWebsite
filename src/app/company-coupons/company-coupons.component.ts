import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { CompanyService } from '../company.service';
import { NotificationService } from '../core/notification.service';
import { COUPON_CATEGORIES, Coupon, CouponCategory } from '../core/models';

const DEFAULT_COUPON_IMAGE = 'https://via.placeholder.com/150';

@Component({
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css'],
})
export class CompanyCouponsComponent implements OnInit {
  coupons$?: Observable<Coupon[]>;
  couponForm: FormGroup;
  showForm = false;

  readonly categories: readonly CouponCategory[] = COUPON_CATEGORIES;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private notification: NotificationService
  ) {
    this.couponForm = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [DEFAULT_COUPON_IMAGE],
    });
  }

  ngOnInit(): void {
    this.loadCoupons();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.couponForm.invalid) {
      this.notification.error('Please fill in the coupon details.');
      return;
    }

    this.companyService.addCoupon(this.couponForm.value as Coupon).subscribe({
      next: () => {
        this.loadCoupons();
        this.showForm = false;
        this.couponForm.reset({ image: DEFAULT_COUPON_IMAGE });
        this.notification.success('Coupon created.');
      },
      error: () => this.notification.error('Could not create the coupon. Please try again.'),
    });
  }

  deleteCoupon(id: number | undefined): void {
    if (id === undefined || !confirm('Are you sure you want to delete this coupon?')) {
      return;
    }

    this.companyService.deleteCoupon(id).subscribe({
      next: () => {
        this.loadCoupons();
        this.notification.success('Coupon deleted.');
      },
      error: () => this.notification.error('Could not delete the coupon. Please try again.'),
    });
  }

  private loadCoupons(): void {
    this.coupons$ = this.companyService.getCompanyCoupons();
  }
}
