import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {
  customers$: unknown | undefined;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.adminService.getAllCustomers().subscribe(
      data => this.customers$ = data,
      error => console.error('Error loading customers:', error)
    );
  }
}
