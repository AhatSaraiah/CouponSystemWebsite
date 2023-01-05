import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css']
})
export class AdminCompaniesComponent implements OnInit {

  companies$: Object | undefined 
  constructor(private data: AdminService) { }

  ngOnInit() {
    this.data.getCompanies().subscribe(
      data => this.companies$ = data
    );
  }
  

}
