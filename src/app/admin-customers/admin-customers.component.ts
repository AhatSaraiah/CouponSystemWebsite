import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AdminService } from '../admin.service';
import { NotificationService } from '../core/notification.service';
import { Customer } from '../core/models';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css'],
})
export class AdminCustomersComponent implements OnInit {
  customers$?: Observable<Customer[]>;

  constructor(
    private adminService: AdminService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  deleteCustomer(id: number | undefined): void {
    if (id === undefined || !confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    this.adminService.deleteCustomer(id).subscribe({
      next: () => {
        this.loadCustomers();
        this.notification.success('Customer deleted.');
      },
      error: () => this.notification.error('Could not delete the customer. Please try again.'),
    });
  }

  private loadCustomers(): void {
    this.customers$ = this.adminService.getAllCustomers();
  }
}
