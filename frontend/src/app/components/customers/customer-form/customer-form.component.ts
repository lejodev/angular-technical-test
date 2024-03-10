import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
          this.customerForm.patchValue(data)
          this.subcribeFormChanges()
        })

      } else {
        this.subcribeFormChanges()
      }
    })
  }

  customerForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    products: new FormControl(null, Validators.required)
  },)

  subcribeFormChanges() {
  }

  postData() { // Make this returns a Customer type

    if (this.customerForm.valid) {

      if (this.isUpdatedMode) {
        const updatedValues: { [key: string]: string | number | null | undefined } = {};

        Object.keys(this.customerForm.value).forEach(key => {
          const customerKey = key as keyof Customer;
          const currentValue = this.customerForm.value[customerKey]
          const originalValue = this.originalFormValues[customerKey]

          if (originalValue !== currentValue) {
            updatedValues[customerKey] = currentValue
            this.customerService.updateCustomer(updatedValues, this.currentCustomerId).subscribe(() => this.navigationRoute.navigate(["/customers"]))
          } else {
            this.navigationRoute.navigate(["/customers"])
          }


        });

      } else {
        this.customerService.submitCustomerInfo(
          this.customerForm.value.name ?? "",
          this.customerForm.value.date ?? "",
          this.customerForm.value.country ?? "",
          this.customerForm.value.products ?? 0,)
          .subscribe(data => {
            this.navigationRoute.navigate(["/customers"])
          })
      }
    }
    else {
      this.markFormGroupTouched(this.customerForm)
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}