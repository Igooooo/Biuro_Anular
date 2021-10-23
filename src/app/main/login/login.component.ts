import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userName?: string;
  userSurname?: string;
  hide: boolean = true;

  constructor(private router: Router,
              private auth: AuthService,
              private toastr: ToastrService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  login() : void {
    this.auth.loginUser(this.loginForm.getRawValue()).subscribe(
      res => {
        localStorage.setItem('token', res.accessToken)
        localStorage.setItem('id', JSON.parse(res.id)) 
        let id: number = Number(localStorage.getItem('id'))
        this.getUserInfo(id);
        this.showToasterLogin()
        this.router.navigate(['main'])
      },
      err => {
        this.showToasterLoginError();
        console.log('err ' + JSON.stringify(err))
      }
    ); 
  }

  getUserInfo(id: number): void {
    let userId = id
    this.usersService.getUser(userId).subscribe(
      (user) => {
      let lenghtName = JSON.stringify(user.data.name).length;
      let lenghtSurname = JSON.stringify(user.data.surname).length;
      this.userName = JSON.stringify(user.data.name).substr(1,lenghtName-2)  
      this.userSurname = JSON.stringify(user.data.surname).substr(1,lenghtSurname-2)  
      }, err => {
        console.log('err' + err);
      }) 
  }

  showToasterLoginError() : void {
    this.toastr.error("Błędny e-mail lub hasło!");
  }

  showToasterLogin() : void {
    this.toastr.success('Zalogowano pomyślnie!');
  }
}

