import { customers } from './../entites/customers';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<customers[]> {
    return this.http.get<customers[]>(`${this.apiUrl}/customers`);
  }

  getCustomerById(id: number): Observable<customers> {
    return this.http.get<customers>(`${this.apiUrl}/getCustomerById/${id}`);
  }
  customersadd(customerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/customersadd`, customerData);
  }

  updatecustomers(id: any, customerData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update_customer/${id}`, customerData);
  }
  addresscreate(addressData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/customerAddress`,addressData);
  }


  deleteCustomer(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteCustomer/${id}`);
  }
  getCustomersAddress(): Observable<customers[]> {
    return this.http.get<customers[]>(`${this.apiUrl}/customers-with-addresses`);
  }
  getCustomerAdressById(id: number): Observable<customers> {
    return this.http.get<customers>(`${this.apiUrl}/customerdefaultaddress/${id}`);
  }
 updateAddress(id:any, customerData:any):Observable<any>{
  return this.http.put(`${this.apiUrl}/customeraddress/${id}`,customerData);
 }
 getmultipleAddress(id:any): Observable<customers[]> {
  return this.http.get<customers[]>(`${this.apiUrl}/getCustomerAdressById/${id}`);
}
    updateDefaultAddress( customerData:any):Observable<any> {
  console.log("customerData::",customerData);
  const responce=this.http.post<any>(`${this.apiUrl}/updateDefaultAddress`,customerData);
  console.log("responce",responce)
  return responce
}
getsingleAddress(id:any): Observable<customers[]> {
  return this.http.get<customers[]>(`${this.apiUrl}/getAddressById/${id}`);
}
updatesingleAddress(id: any, customerData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/customeraddressbyid/${id}`, customerData);
}
}
