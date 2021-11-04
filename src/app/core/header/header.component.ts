import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { UsersService } from 'src/app/main/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName?: string;
  userSurname?: string;
  isAuth: boolean = false;

  constructor(public usersService: UsersService,
              private router: Router,
              private toastr: ToastrService,
              private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe(data => {
      this.isAuth = data;
      if (this.isAuth) {
        this.isAuth = true;
        let id: number = Number(localStorage.getItem('id'))
      this.getUserInfo(id);
      }
    });  
  }

  getUserInfo(id: number): void {
    let userId = id
    this.usersService.getUser(userId).subscribe(
      (user) => {
        this.userName = JSON.stringify(user.data.name).substr(1,JSON.stringify(user.data.name).length-2);
        this.userSurname = JSON.stringify(user.data.surname).substr(1,JSON.stringify(user.data.surname).length-2);
      }, err => {
        console.log('err' + err);
      }) 
  } 

  logout() {
/*
    localStorage.removeItem('token');
    this.usersService.userSubject$.next(null);
    this.showToasterLogoutUser();
    this.router.navigate(['/login']); */
  
  this.auth.logout();
  this.usersService.userSubject$.next(null);
  this.showToasterLogoutUser();
  this.router.navigate(['/login']);
} 

  showToasterLogoutUser() : void {
    this.toastr.success("Wylogowano!");
  }
}
