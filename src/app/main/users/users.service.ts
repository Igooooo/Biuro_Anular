import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { FormBuilder } from '@angular/forms';
import { SearchUserByNameSurnameCity } from 'src/app/shared/model/searchUserByNameSurnameCity';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
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

  getUsers(): Observable<{success: boolean, data: User[]}> {
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: User[]}>(this.URL +'getUsers' , { headers: headers });
  }

  addUser(data: User): Observable<User> {
    console.log('data' + data)
    return this.http.post<User>(this.URL+ 'auth/signup', data) ;
  }
  
  removeUser(id: number): Observable<User> {
    let headers = this.createAuthrorizationHeader();
    return this.http.delete<User>(this.URL+'deleteUserByIdParam/'+`${id}`, { headers: headers })
  }

  updateUser(data: User): Observable<User> {
    let headers = this.createAuthrorizationHeader();
    return this.http.put<User>(this.URL+'updateUserById', data , { headers: headers })
  }

  getUser(id: number) : Observable<{success: boolean, data: User}> { // id - pojedyńczy samochód
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: User}>(this.URL+'getUserByIdParam/'+`${id}` , { headers: headers }) //samo formatuje na JSON
  }

  // raczej nie zadziała
  getUserByFilter(name: string, surname: string, city: string) : Observable<{success: boolean, data: User[]}> { // id - pojedyńczy samochód
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: User[]}>(this.URL+'getUserByNameSurnameCityParam/'+`${name}`+'&'+`${surname}`+'&'+`${city}` , { headers: headers }) //samo formatuje na JSON
  }

     

}

