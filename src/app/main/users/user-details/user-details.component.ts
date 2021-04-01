import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User[] = [];

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

  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this. loadCar();
    //console.log('sprawdzenie' + this.user)
    //console.log('this user'+ JSON.stringify(this.user));
  }

  
  updateUser(): void {
    this.usersService.updateCar(this.userForm.value).subscribe();
    //console.log('Update'+ JSON.stringify(this.userForm.value))
    // console.log('User' + JSON.stringify(this.user));
    //this.router.navigate(['/users']);
  }



  loadCar() : void {
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

  

}
