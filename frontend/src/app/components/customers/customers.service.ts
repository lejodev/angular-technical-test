import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient, private router: Router) { }

  newCustomer!: any
  id!: string
  endpoint: string = "http://localhost:3000/customers/";

  getData(): Observable<any[]> {
    return this.http.get<any>(this.endpoint). // mnake it ENV variable
      pipe(map(obj => obj))
  }

  getCustomerById(id: string) {
    this.id = id
    return this.http.get<any>(`${this.endpoint}${id}`)
  }

  submitCustomerInfo(name: string, date: string, country: string, products: number) {
    this.newCustomer = { name, date, country, products }
    return this.http.post<any>(this.endpoint,
      this.newCustomer)
  }

  deleteCustomerById(id: string) {
    let customerId = id
    return this.http.delete(`${this.endpoint}${customerId}`)
  }

  updateCustomer(data: {}, id: string) {
    let customerId = id
    return this.http.patch(`${this.endpoint}${customerId}`, data)
  }



}
