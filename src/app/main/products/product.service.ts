import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL: string = 'http://localhost:3000/api/products/';
  private URL: string = 'http://localhost:8080/api/';
  private products: Product[] = [];

  constructor(private http: HttpClient) {
  }

  // Dodawanie tokena do nagłówka
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
    console.log('data' + data)
    return this.http.post<Product>(this.URL+ 'addProduct', data) ;
  }
  
  removeProduct(id: number): Observable<Product> {
    let headers = this.createAuthrorizationHeader();
    return this.http.delete<Product>(this.URL+'deleteProductByIdParam/'+`${id}`, { headers: headers })
  }

  updateProduct(data: Product): Observable<Product> {
    let headers = this.createAuthrorizationHeader();
    return this.http.put<Product>(this.URL+'updateProductById', data , { headers: headers })
  }

  getProduct(id: number) : Observable<{success: boolean, data: Product[]}> { // id - pojedyńczy samochód
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Product[]}>(this.URL+'getProductByIdParam/'+`${id}` , { headers: headers }) //samo formatuje na JSON
  }

  // raczej nie zadziała
  getProductByFilter(name: string) : Observable<{success: boolean, data: Product[]}> { // id - pojedyńczy samochód
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Product[]}>(this.URL+'getProductByNameParam/'+`${name}` , { headers: headers }) //samo formatuje na JSON
  }

  /* Stary Backend
  getproducts(): Observable<{success: boolean, data: Product[]}> {
    return this.http.get<{success: boolean, data: Product[]}>('http://localhost:8080/api/getproducts' , { headers: headers });
  }
  addProduct(data: Product): Observable<Product> {
    console.log('data' + data)
    return this.http.post<Product>(this.apiURL, data) ;
  }
  removeProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.apiURL+`${id}`)
  }
  updateCar(data: Product): Observable<Product> {
    return this.http.patch<Product>(this.apiURL, data)
  }
  getProduct(id: number) : Observable<{success: boolean, data: Product[]}> { // id - pojedyńczy samochód
    return this.http.get<{success: boolean, data: Product[]}>(this.apiURL+`${id}`) //samo formatuje na JSON
  }
  getProductByFilter(name: string, surname: string, city: string) : Observable<{success: boolean, data: Product[]}> { // id - pojedyńczy samochód
    console.log('serwis' + name, city, surname)
    return this.http.get<{success: boolean, data: Product[]}>(this.apiURL+'/data/'+`${name}`+'&'+`${surname}`+'&'+`${city}`) //samo formatuje na JSON
  }
  getProductByFilter(name: string, surname: string, city: string) : Observable<dProduct> { // id - pojedyńczy samochód
    console.log('serwis' + name, city, surname)
    return this.http.get<Product>(this.apiURL+`${name}`+`${surname}`+`${city}`) //samo formatuje na JSON
  */
}

