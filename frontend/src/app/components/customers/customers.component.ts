import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private customersService: CustomersService) { }

  title = 'angular-technical-test';
  date!: Date

  ngOnInit() {
    console.log("sfgfdgdfgdd")
    this.customersService.getData().subscribe(data => {
      console.log(data)
      this.date = new Date()
      console.log(this.date)
    })
  }

  customerForm = new FormGroup({
    name: new FormControl(""),
    date: new FormControl(""),
    productsAmount: new FormControl(0)
  })

  postData() { // Make this returns a Customer type
    this.customersService.submitCustomerInfo(
      this.customerForm.value.name ?? "",
      this.customerForm.value.date ?? "",
      this.customerForm.value.productsAmount ?? 0)
  }
}
