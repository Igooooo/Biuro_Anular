import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/shared/model/user';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router,
              private auth: AuthService,
              private toastr: ToastrService) {

    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  login() : void {
    console.log('jestem w login');
    this.auth.loginUser(this.loginForm.getRawValue()).subscribe(
      res => {
        console.log('res ' + JSON.stringify(res));
        localStorage.setItem('token', res.accessToken)
        this.router.navigate(['main'])
        this.showToasterLogin()
      },
      err => {
        this.showToasterLoginError();
        console.log('err ' + JSON.stringify(err))
      }
    ); 
  }

  showToasterLoginError() : void {
    this.toastr.error("Błędny e-mail lub hasło!");
  }

  showToasterLogin() : void {
    this.toastr.success("Zalogowano pomyślnie!");
  }
}
