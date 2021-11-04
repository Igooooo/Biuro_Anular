import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from './shared/model/login';
import { LoginData } from './shared/model/loginData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  private login_url = 'http://localhost:8080/api/auth/signin';

  login(login: Login) {
    return this.http.post<any>(this.login_url, login)
    .pipe(map((data: LoginData) => this.setLoginData(data)));
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }

  private setLoginData(data: LoginData): boolean {
    if (data) {
      localStorage.setItem('auth_token', JSON.stringify(data.access_token));
      localStorage.setItem('id', JSON.stringify(data.id));
      this.isLogged$.next(true);
      return true;
    } else {
      this.isLogged$.next(false);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    this.isLogged$.next(false);
  }
}
