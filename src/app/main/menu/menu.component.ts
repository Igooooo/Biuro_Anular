import { HttpClient } from '@angular/common/http';
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

  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/getUsers').subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('błąd' + err);
      }
    );
  }

}
