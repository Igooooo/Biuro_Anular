import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userType } from 'src/app/shared/enums/userType';
import { UsersService } from '../users.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({});
  
  // Typ klienta
  typeOfUserDefault = userType.pracownik ;
  typeOfUser = Object.values(userType);

  // Walidacja formularza
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  phoneRegex = /^[+,\d]\d{7,12}$/;


  constructor(private cd: ChangeDetectorRef,    
              private usersService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createFormUser();
  }

fieldTextType?: boolean;

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

  createFormUser() : void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      pesel: ['',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      city:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      street: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      phone: ['',Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])],
      email: ['',Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      password: ['',Validators.compose([Validators.required, Validators.pattern(this.passwordRegex)])],
      type: [this.typeOfUserDefault,Validators.required]
  });
    this.cd.markForCheck();
  }

  addUser() : void {
    this.usersService.addUser(this.userForm.value).subscribe(() => {
      console.log('formularz' + this.userForm.value);
      this.router.navigate(['/users']);
      this.showToasterAddUser();
    }, err => {   
        this.showToasterAddUserError(err.error.message);
      }
    );
  }

  reset() : void {
    this.userForm.reset({
        type: this.typeOfUserDefault
    });
  }

  showToasterAddUser() : void {
    this.toastr.success(this.userForm.controls.name.value + " " + this.userForm.controls.surname.value + " został dodany pomyślnie!");
  }

  showToasterAddUserError(err : string) : void {
    let lenghtErr = err.length;
    let text = err.substr(0,lenghtErr-1);
    this.toastr.error(text);
  }
}
