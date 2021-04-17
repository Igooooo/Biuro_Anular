import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { clientType } from 'src/app/shared/enums/clientType';
import { User } from 'src/app/shared/model/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userForm = new FormGroup({});
  user: User[] = [];

  // Typ klienta
  typeOfClientDefault = clientType.normalny ;
  typeOfClient = Object.values(clientType);

  // Walidacja formularza
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  ageRegex = /^\d+/;
  phoneRegex = /^[+,\d]\d{7,12}$/;

  
  /*
  typeOfClient = Object.values(clientType);
  
  userForm = this.formBuilder.group({  // metody z FormBuilder (dostępne w Angularze)
    id: [''],
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
  */

  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route : ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createFormUser();
    this.loadUser();
    //console.log('sprawdzenie' + this.user)
    //console.log('this user'+ JSON.stringify(this.user));
  }
  
  createFormUser() : void {
    this.userForm = this.formBuilder.group({
      id: [''],
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
  }
  
  updateUser(): void {
    this.usersService.updateCar(this.userForm.value).subscribe();
    this.router.navigate(['/users']);
    this.showToasterUpdateUser();
    //console.log('Update'+ JSON.stringify(this.userForm.value))
    // console.log('User' + JSON.stringify(this.user));
    //this.router.navigate(['/users']);
  }

  loadUser() : void {
    // z aktualnego URLa zczytaujemy id igawka aktualnego routa. Pozwala zczytać aktualnego URLa i dobrac się do jego id | + przebaria string na number
    const id = +this.route.snapshot.params['id']; 
    this.usersService.getUser(id).subscribe( // przekazujemy id i zostajemy subscriberami
      (user) => {
      //console.log('user'+ JSON.stringify(user.data));
      this.user = user.data;
      this.userForm.patchValue(this.user[0]);
     // console.log('Odebrany JSON'+ JSON.stringify(this.user));
      }) // przypisanie do zmiennej
  }

  showToasterUpdateUser() : void{
    this.toastr.success(this.userForm.controls.name.value + " " + this.userForm.controls.surname.value + " został zaktualizowany pomyślnie!");
  }
}
