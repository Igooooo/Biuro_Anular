import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router,
              private toastr: ToastrService ) { 
    }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token');
    console.log('Wylogowanie');
    this._router.navigate(['login']);
    this.showToasterLogoutUser();
  }

  showToasterLogoutUser() : void {
    this.toastr.success("Wylogowano!");
  }
}
