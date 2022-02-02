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

  login(): void {
    this.auth.login(this.loginForm.getRawValue()).subscribe(
      res => {
        let id: number = Number(localStorage.getItem('id'))
        this.getUserInfo(id);
        this.router.navigate([''])
      },
      err => {
        this.showToasterLoginError();
        console.log('err ', err)
      }
    );
  }

  getUserInfo(id: number): void {
    let userId = id
    this.usersService.getUser(userId).subscribe(
      (user) => {
        this.userName = user.data.name;
        this.userSurname = user.data.surname;
        this.showToasterLogin();
      }, err => {
        console.log('err ', err);
      })
  }

  showToasterLoginError(): void {
    this.toastr.error("Błędny e-mail lub hasło!");
  }

  showToasterLogin(): void {
    this.toastr.success('Witamy ' + this.userName + ' ' + this.userSurname);
  }
}

