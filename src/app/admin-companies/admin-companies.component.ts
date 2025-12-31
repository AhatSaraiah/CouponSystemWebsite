import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css']
})
export class AdminCompaniesComponent implements OnInit {

  companies$: Observable<any> | undefined;

  constructor(private data: AdminService) { }

  ngOnInit() {
    this.companies$ = this.data.getCompanies();
  }

  deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.data.deleteCompany(id).subscribe(
        () => {
          this.companies$ = this.data.getCompanies();
        },
        error => console.error('Error deleting company:', error)
      );
    }
  }


}
