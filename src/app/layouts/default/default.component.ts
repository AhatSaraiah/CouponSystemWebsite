import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  // companies$: Object;
  // constructor(private data: AdminService) { }

   ngOnInit() {
  //   this.data.getCompanies().subscribe(
  //     data => this.companies$ = data
  //   );
   }
}
