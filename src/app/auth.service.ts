import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './shared/model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private login_url = 'http://localhost:8080/api/auth/signin';

  loginUser(login: Login) {
    return this.http.post<any>(this.login_url, login)
  }
}
