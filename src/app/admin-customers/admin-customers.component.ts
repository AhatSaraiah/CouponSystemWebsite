import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {
  customers$: Observable<any> | undefined;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.customers$ = this.adminService.getAllCustomers();
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.adminService.deleteCustomer(id).subscribe(
        () => {
          this.customers$ = this.adminService.getAllCustomers();
        },
        error => console.error('Error deleting customer:', error)
      );
    }
  }
}
