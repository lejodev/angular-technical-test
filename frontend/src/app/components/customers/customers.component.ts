import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private customersService: CustomersService, private router: Router) { }

  title = 'angular-technical-test';
  date!: Date
  customers: any[] = [] // Make it a Customers type (<Customer[]>) 

  ngOnInit() {
    this.customersService.getData().subscribe(data => {
      console.log(data)
      this.customers = data
    })
  }

  deleteCustomer(customerId: string) {
    this.customersService.deleteCustomerById(customerId).subscribe((data) => {
      this.ngOnInit()
    })
    console.log(customerId)
  }


}
