import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient, private router: Router) { }

  newCustomer!: any

  id!: string

  getData(): Observable<any[]> {
    return this.http.get<any>("http://localhost:3000/customers"). // mnake it ENV variable
      pipe(map(obj => obj))
  }

  getCustomerById(id: string) {
    console.log("CARECHIMBGA")
    this.id = id
    return this.http.get<any>(`http://localhost:3000/customers/${id}`)
  }

  submitCustomerInfo(name: string, date: string, country: string, products: number) { // Make this returns a Customer type  // ask for arguments
    console.log("That is customer info", name, date, products)

    this.newCustomer = { name, date, country, products }

    return this.http.post<any>("http://localhost:3000/customers",
      this.newCustomer)
  }

  deleteCustomerById(id: string) {
    let customerId = id
    return this.http.delete(`http://localhost:3000/customers/${customerId}`) // mnake it ENV variable
  }

  updateCustomer(customer: FormGroup) {
    console.log("Current customer: ", customer)


  }



}
