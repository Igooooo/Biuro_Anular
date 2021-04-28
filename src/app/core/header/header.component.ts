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

  constructor(private router: Router,
              private toastr: ToastrService ) { 
    }

  ngOnInit(): void {
    console.log('Jestem w header');
  }

  logout(){
    localStorage.removeItem('token');
    this.showToasterLogoutUser();
    this.router.navigate(['/login']);
  }

  showToasterLogoutUser() : void {
    this.toastr.success("Wylogowano!");
  }
}
