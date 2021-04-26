import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router) { 
    }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token');
    console.log('Wylogowanie');
    this._router.navigate(['/login']);
  }
}
