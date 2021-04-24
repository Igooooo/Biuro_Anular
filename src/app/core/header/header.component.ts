import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private myService: AppService,
    private _router: Router) { 
      /*
      this.myService.getUserName()
      .subscribe(
        data => this.username= data.toString(),
        error => this._router.navigate(['/main/login'])
      )
      */
    }

  ngOnInit(): void {
  }

  logout(){
    //localStorage.removeItem('token');
    console.log('Wylogowanie');
    this._router.navigate(['/login']);
  }
}
