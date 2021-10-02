import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsersService } from 'src/app/main/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName?: string;
  userSurname?: string;

  constructor(public usersService: UsersService, // dzieki temu moge w HTML użyć
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    let id: number = Number(localStorage.getItem('id'))
    this.getUserInfo(id);
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
    localStorage.removeItem('token');
    this.usersService.userSubject$.next(null);
    this.showToasterLogoutUser();
    this.router.navigate(['/login']);
  }

  showToasterLogoutUser() : void {
    this.toastr.success("Wylogowano!");
  }
}
