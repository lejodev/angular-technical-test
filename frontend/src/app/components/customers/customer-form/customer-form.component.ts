import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class EditComponent implements OnInit {
  isUpdatedMode: boolean = false
  originalForm!: FormGroup
  originalFormValues: any = {};
  currentCustomerId: any;

  constructor(private customerService: CustomersService, private router: ActivatedRoute, private navigationRoute: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {

      this.currentCustomerId = params['id']
      this.isUpdatedMode = !!this.currentCustomerId;


      if (this.isUpdatedMode) { // If update mode

        this.customerService.getCustomerById(this.currentCustomerId).subscribe(data => {

          this.originalFormValues = { ...data }


          this.customerForm.patchValue({  // pass object and not simple data as an argument
            name: data.name,
            date: data.date,
            country: data.country,
            products: data.products
          })

          this.subcribeFormChanges()
        })

      } else {
        this.subcribeFormChanges()
      }
    })
  }

  customerForm = new FormGroup({
    name: new FormControl(""),
    date: new FormControl(""),
    country: new FormControl(""),
    products: new FormControl(0)
  },)

  subcribeFormChanges() {
  }

  postData() { // Make this returns a Customer type



    if (this.isUpdatedMode) {
      const updatedValues: { [key: string]: string | number | null | undefined } = {};

      Object.keys(this.customerForm.value).forEach(key => {
        const customerKey = key as keyof Customer;
        const currentValue = this.customerForm.value[customerKey]
        const originalValue = this.originalFormValues[customerKey]

        if (originalValue !== currentValue) {
          updatedValues[customerKey] = currentValue
          console.log("eeeeeeeee", this.originalFormValues.value)
          this.customerService.updateCustomer(updatedValues, this.currentCustomerId).subscribe(() => this.navigationRoute.navigate(["/customers"]))
        } else {
          console.log("SGFDFDSG")
          this.navigationRoute.navigate(["/customers"])
        }


      });
      console.log(updatedValues)

      // // this.customerService.updateCustomer(this.customerForm)


    } else {
      this.customerService.submitCustomerInfo(
        this.customerForm.value.name ?? "",
        this.customerForm.value.date ?? "",
        this.customerForm.value.country ?? "",
        this.customerForm.value.products ?? 0,)
        .subscribe(data => {
          this.navigationRoute.navigate(["/customers"])
          console.log(data)
        })
    }
  }

  getCustomer(id: string): void {
    this.customerService.getCustomerById(id).subscribe(data => {
      console.log(data)
    })
  }





}
