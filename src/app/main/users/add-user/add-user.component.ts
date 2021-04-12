import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { clientType } from 'src/app/shared/enums/clientType';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({});
  
  // Typ klienta
  typeOfClientDefault = clientType.normalny ;
  typeOfClient = Object.values(clientType);

  // Walidacja formularza
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  ageRegex = /^\d+/;
  phoneRegex = /^[+,\d]\d{7,12}$/;

  constructor(private cd: ChangeDetectorRef,    
              private usersService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.createFormUser();
  }

  createFormUser() : void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      age: ['',Validators.compose([Validators.required, Validators.pattern(this.ageRegex)])],
      pesel: ['',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      city:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      street: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      phone: ['',Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])],
      email: ['',Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      type: [this.typeOfClientDefault,Validators.required]
    })
    this.cd.markForCheck();
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
