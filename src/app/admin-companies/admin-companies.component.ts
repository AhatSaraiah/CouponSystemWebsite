import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AdminService } from '../admin.service';
import { NotificationService } from '../core/notification.service';
import { Company } from '../core/models';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css'],
})
export class AdminCompaniesComponent implements OnInit {
  companies$?: Observable<Company[]>;

  constructor(
    private data: AdminService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  deleteCompany(id: number | undefined): void {
    if (id === undefined || !confirm('Are you sure you want to delete this company?')) {
      return;
    }

    this.data.deleteCompany(id).subscribe({
      next: () => {
        this.loadCompanies();
        this.notification.success('Company deleted.');
      },
      error: () => this.notification.error('Could not delete the company. Please try again.'),
    });
  }

  private loadCompanies(): void {
    this.companies$ = this.data.getCompanies();
  }
}
