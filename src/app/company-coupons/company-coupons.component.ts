import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css']
})
export class CompanyCouponsComponent implements OnInit {
  coupons$: Observable<any> | undefined;
  couponForm: FormGroup;
  showForm = false;

  categories = ['Food', 'Electricity', 'Restaurant', 'Vacation', 'Fashion'];

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {
    this.couponForm = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['https://via.placeholder.com/150'] // Default placeholder
    });
  }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.coupons$ = this.companyService.getCompanyCoupons();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.couponForm.valid) {
      this.companyService.addCoupon(this.couponForm.value).subscribe(
        () => {
          this.loadCoupons();
          this.showForm = false;
          this.couponForm.reset({ image: 'https://via.placeholder.com/150' });
        },
        error => console.error('Error adding coupon:', error)
      );
    }
  }

  deleteCoupon(id: number): void {
    if (confirm('Are you sure you want to delete this coupon?')) {
      this.companyService.deleteCoupon(id).subscribe(
        () => this.loadCoupons(),
        error => console.error('Error deleting coupon:', error)
      );
    }
  }
}
