import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/model/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private URL: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const accessToken :any = localStorage.getItem('accessToken');
    headers = headers.set('x-access-token', accessToken);
    return headers
  }

  getClients(): Observable<{success: boolean, data: Client[]}> {
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: Client[]}>(this.URL +'getClients' , { headers: headers });
  }

  addClient(data: Client): Observable<Client> {
    let headers = this.createAuthrorizationHeader();
    return this.http.post<Client>(this.URL+ 'addClient', data, { headers: headers } ) ;
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
    return this.http.get<{success: boolean, data: Client[]}>(this.URL+'getClientByIdParam/'+`${id}` , { headers: headers });
  }

}

