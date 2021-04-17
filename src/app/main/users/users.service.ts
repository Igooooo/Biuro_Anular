import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL: string = 'http://localhost:3000/api/users/';
  private users: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<{success: boolean, data: User[]}> {
    return this.http.get<{success: boolean, data: User[]}>(this.apiURL);
  }

  addUser(data: User): Observable<User> {
    console.log('data' + data)
    return this.http.post<User>(this.apiURL, data) ;
  }
  
  removeUser(id: number): Observable<User> {
    return this.http.delete<User>(this.apiURL+`${id}`)
  }

  updateCar(data: User): Observable<User> {
    return this.http.patch<User>(this.apiURL, data)
  }

  getUser(id: number) : Observable<{success: boolean, data: User[]}> { // id - pojedyńczy samochód
    return this.http.get<{success: boolean, data: User[]}>(this.apiURL+`${id}`) //samo formatuje na JSON
  }

  
  getUserByFilter(name: string, surname: string, city: string) : Observable<{success: boolean, data: User[]}> { // id - pojedyńczy samochód
    console.log('serwis' + name, city, surname)
    return this.http.get<{success: boolean, data: User[]}>(this.apiURL+'/data/'+`${name}`+'&'+`${surname}`+'&'+`${city}`) //samo formatuje na JSON
  }

/*
  getUserByFilter(name: string, surname: string, city: string) : Observable<dUser> { // id - pojedyńczy samochód
    console.log('serwis' + name, city, surname)
    return this.http.get<User>(this.apiURL+`${name}`+`${surname}`+`${city}`) //samo formatuje na JSON
  */
}

