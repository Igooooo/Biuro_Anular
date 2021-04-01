import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { clientType } from 'src/app/shared/enums/clientType';
import { User } from 'src/app/shared/model/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  
  ePropertyType = Object.values(clientType);
  /*
  userForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    age: new FormControl(''),
    pesel: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    date: new FormControl(''),
  })*/

  // Walidacje
  userForm = this.formBuilder.group({  // metody z FormBuilder (dostępne w Angularze)
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]], // [wartosc startowa, walidatory]
    surname: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
    age: ['',Validators.required],
    pesel: ['',Validators.required],
    city: ['',Validators.required],
    street: ['',Validators.required],
    phone: ['',Validators.required],
    email: ['',Validators.required],
    type: ['',Validators.required]
  })

  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    console.log('Enum JSON' + JSON.stringify(this.ePropertyType));
    console.log('Enum' + this.ePropertyType);
  }

  
  addUser() : void {
    this.usersService.addUser(this.userForm.value).subscribe();
    console.log('formularz' + this.userForm.value);
    this.router.navigate(['/users']);
  }
  
}
