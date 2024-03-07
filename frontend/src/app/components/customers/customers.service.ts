import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any>("http://localhost:3000/customers")
  }

  submitCustomerInfo(name: string, date: string, productsAmount: number) { // Make this returns a Customer type
    console.log("That is customer info", name, date, productsAmount)
  }

}
