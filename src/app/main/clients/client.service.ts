import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/model/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiURL: string = 'http://localhost:3000/api/users/';
  private URL: string = 'http://localhost:8080/api/';


  constructor(private http: HttpClient) {
  }


  // Dodawanie tokena do nagłówka
  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token :any = localStorage.getItem('token');
    headers = headers.set('x-access-token', token);
    return headers
  }

  getClients(): Observable<{success: boolean, data: Client[]}> {
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Client[]}>(this.URL +'getClients' , { headers: headers });
  }

  addClient(data: Client): Observable<Client> {
    console.log('data' + data)
    return this.http.post<Client>(this.URL+ 'addClient', data) ;
  }
  
  removeClient(id: number): Observable<Client> {
    let headers = this.createAuthrorizationHeader();
    return this.http.delete<Client>(this.URL+'deleteClientByIdParam/'+`${id}`, { headers: headers })
  }

  updateClient(data: Client): Observable<Client> {
    let headers = this.createAuthrorizationHeader();
    return this.http.put<Client>(this.URL+'updateClientById', data , { headers: headers })
  }

  getClient(id: number) : Observable<{success: boolean, data: Client[]}> { 
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Client[]}>(this.URL+'getClientByIdParam/'+`${id}` , { headers: headers }) //samo formatuje na JSON
  }

  // raczej nie zadziała
  getClientByFilter(name: string, surname: string, city: string) : Observable<{success: boolean, data: Client[]}> { // id - pojedyńczy samochód
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Client[]}>(this.URL+'getClientByNameSurnameCityParam/'+`${name}`+'&'+`${surname}`+'&'+`${city}` , { headers: headers }) //samo formatuje na JSON
  }

  /* Stary Backend
  getClients(): Observable<{success: boolean, data: Client[]}> {
    return this.http.get<{success: boolean, data: Client[]}>('http://localhost:8080/api/getClients' , { headers: headers });
  }
  addClient(data: Client): Observable<Client> {
    console.log('data' + data)
    return this.http.post<Client>(this.apiURL, data) ;
  }
  removeClient(id: number): Observable<Client> {
    return this.http.delete<Client>(this.apiURL+`${id}`)
  }
  updateCar(data: Client): Observable<Client> {
    return this.http.patch<Client>(this.apiURL, data)
  }
  getClient(id: number) : Observable<{success: boolean, data: Client[]}> { // id - pojedyńczy samochód
    return this.http.get<{success: boolean, data: Client[]}>(this.apiURL+`${id}`) //samo formatuje na JSON
  }
  getClientByFilter(name: string, surname: string, city: string) : Observable<{success: boolean, data: Client[]}> { // id - pojedyńczy samochód
    console.log('serwis' + name, city, surname)
    return this.http.get<{success: boolean, data: Client[]}>(this.apiURL+'/data/'+`${name}`+'&'+`${surname}`+'&'+`${city}`) //samo formatuje na JSON
  }
  getClientByFilter(name: string, surname: string, city: string) : Observable<dClient> { // id - pojedyńczy samochód
    console.log('serwis' + name, city, surname)
    return this.http.get<Client>(this.apiURL+`${name}`+`${surname}`+`${city}`) //samo formatuje na JSON
  */
}

