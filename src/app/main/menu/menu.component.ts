import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  
  message: string = 'Nie jesteś zalogowany!'
  constructor( private http: HttpClient) { }


  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token :any = localStorage.getItem('token');
    headers = headers.set('x-access-token', token);
    return headers
  }


  ngOnInit(): void {
    let headers = this.createAuthrorizationHeader();
    console.log('headers ' + JSON.stringify(headers));
    this.http.get('http://localhost:8080/api/getUsers' , { headers: headers }).subscribe(
      res => {
        console.log(JSON.stringify(res));
      },
      err => {
        console.log('błąd ' + JSON.stringify(err));
      }
    );
  }

}
