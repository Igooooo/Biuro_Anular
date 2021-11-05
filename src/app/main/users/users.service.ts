import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userSubject$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private URL: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }


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

  getUser(id: number) : Observable<{success: boolean, data: User}> {
    let headers = this.createAuthrorizationHeader();
    return this.http.get<{success: boolean, data: User}>(this.URL+'getUserByIdParam/'+`${id}` , { headers: headers }).pipe(tap(user => {
      this.userSubject$.next(user.data)
    })) 
  }

}

