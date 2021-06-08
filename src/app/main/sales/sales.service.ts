import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/shared/model/sale';
import { Product } from 'src/app/shared/model/product';
import { Client } from 'src/app/shared/model/client';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiURL: string = 'http://localhost:3000/api/products/';
  private URL: string = 'http://localhost:8080/api/';
  private sale: Sale[] = [];

  constructor(private http: HttpClient) {
  }

  // Dodawanie tokena do nagłówka
  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token :any = localStorage.getItem('token');
    headers = headers.set('x-access-token', token);
    return headers
  }

  getSales(): Observable<{success: boolean, data: Sale[]}> {
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Sale[]}>(this.URL +'getSales' , { headers: headers });
  }

  addSale(data: Sale): Observable<Sale> {
    let headers = this.createAuthrorizationHeader();
    return this.http.post<Sale>(this.URL+ 'addSale', data, { headers: headers }) ;
  }
  
  removeSale(id: number): Observable<Sale> {
    let headers = this.createAuthrorizationHeader();
    return this.http.delete<Sale>(this.URL+'deleteSaleByIdParam/'+`${id}`, { headers: headers })
  }

  updateSale(data: Sale): Observable<Sale> {
    let headers = this.createAuthrorizationHeader();
    return this.http.put<Sale>(this.URL+'updateSaleById', data , { headers: headers })
  }

  getSale(id: number) : Observable<{success: boolean, data: Sale[]}> { // id - pojedyńczy samochód
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Sale[]}>(this.URL+'getSaleByIdParam/'+`${id}` , { headers: headers }) //samo formatuje na JSON
  }

  getSaleByFilter(client_id: number) : Observable<{success: boolean, data: Sale[]}> { // id - pojedyńczy samochód
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Sale[]}>(this.URL+'getSaleByClientIdParam/'+`${client_id}` , { headers: headers }) //samo formatuje na JSON
  }

  getClients(): Observable<{success: boolean, data: Client[]}> {
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Client[]}>(this.URL +'getClients' , { headers: headers });
  }
  
  getProducts(): Observable<{success: boolean, data: Product[]}> {
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Product[]}>(this.URL +'getproducts' , { headers: headers });
  }
}