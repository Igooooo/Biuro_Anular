import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { clientType } from 'src/app/shared/enums/clientType';
import { User } from 'src/app/shared/model/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({});
  
  typeOfClientDefault = clientType.normalny ;
  typeOfClient = Object.values(clientType);

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  ageRegex = /^\d+/;
  phoneRegex = /^[+,\d]\d{7,12}$/;

  // Walidacje formularza
  userFromDefault : any = {
    type: this.typeOfClientDefault
  }

  /*
  userForm = this.formBuilder.group({  // metody z FormBuilder (dostępne w Angularze)
    name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])], // [wartosc startowa, walidatory]
    surname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
    age: ['',Validators.compose([Validators.required, Validators.pattern(this.ageRegex)])],
    pesel: ['',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
    city:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
    street: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
    phone: ['',Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])],
    email: ['',Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
    type: [this.typeOfClient_default,Validators.required]
  })
  */

  createFormUser() : void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      age: ['',Validators.compose([Validators.required, Validators.pattern(this.ageRegex)])],
      pesel: ['',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      city:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      street: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      phone: ['',Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])],
      email: ['',Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      type: [this.typeOfClientDefault,Validators.required]
    })
    //this.cd.markForCheck();

  }

  constructor(private cd: ChangeDetectorRef,    
              private usersService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.createFormUser();
  }

  addUser() : void {
    this.usersService.addUser(this.userForm.value).subscribe();
    console.log('formularz' + this.userForm.value);
    this.router.navigate(['/users']);
  }

  reset() : void {
    this.userForm.reset({
        type: this.typeOfClientDefault
    });
  }
}
