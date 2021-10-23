import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL: string = 'http://localhost:3000/api/products/'; // DO ZMIANY - chyba nie potrzebne
  private URL: string = 'http://localhost:8080/api/';
  private products: Product[] = [];  // DO ZMIANY - chyba nie potrzebne

  constructor(private http: HttpClient) {
  }

  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token :any = localStorage.getItem('token');
    headers = headers.set('x-access-token', token);
    return headers
  }

  getProducts(): Observable<{success: boolean, data: Product[]}> {
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Product[]}>(this.URL +'getproducts' , { headers: headers });
  }

  addProduct(data: Product): Observable<Product> {
    let headers = this.createAuthrorizationHeader();
    return this.http.post<Product>(this.URL+ 'addProduct', data, { headers: headers }) ;
  }
  
  removeProduct(id: number): Observable<Product> {
    let headers = this.createAuthrorizationHeader();
    return this.http.delete<Product>(this.URL+'deleteProductByIdParam/'+`${id}`, { headers: headers })
  }

  updateProduct(data: Product): Observable<Product> {
    let headers = this.createAuthrorizationHeader();
    return this.http.put<Product>(this.URL+'updateProductById', data , { headers: headers })
  }

  getProduct(id: number) : Observable<{success: boolean, data: Product[]}> { 
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Product[]}>(this.URL+'getProductByIdParam/'+`${id}` , { headers: headers }) 
  }

  // DO ZMIANY - weryfiacja czy potrzebne
  getProductByFilter(name: string) : Observable<{success: boolean, data: Product[]}> {
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Product[]}>(this.URL+'getProductByNameParam/'+`${name}` , { headers: headers }) 
  }

}

