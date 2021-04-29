import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userType } from 'src/app/shared/enums/userType';
import { User } from 'src/app/shared/model/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userForm = new FormGroup({});
  user?: User;

  // Typ klienta
  typeOfUserDefault = userType.pracownik ;
  typeOfUser = Object.values(userType);

  // Walidacja formularza
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  ageRegex = /^\d+/;
  phoneRegex = /^[+,\d]\d{7,12}$/;

  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route : ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createFormUser();
    this.loadUser();
  }
  
  createFormUser() : void {
    this.userForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      pesel: ['',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      city:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      street: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      phone: ['',Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])],
      email: ['',Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      type: [this.typeOfUserDefault,Validators.required]
    })
  }
  
  updateUser(): void {
    this.usersService.updateUser(this.userForm.value).subscribe(
      err => {
        console.log('err' + err);
      }
    );
    this.router.navigate(['/users']);
    this.showToasterUpdateUser();
  }

  loadUser() : void {
    // z aktualnego URLa zczytaujemy id igawka aktualnego routa. Pozwala zczytać aktualnego URLa i dobrac się do jego id | + przebaria string na number
    const id = +this.route.snapshot.params['id']; 
    this.usersService.getUser(id).subscribe( // przekazujemy id i zostajemy subscriberami
      (user) => {
      //console.log('user'+ JSON.stringify(user.data));
      this.user = user.data;
      this.userForm.patchValue(this.user);
      //console.log('Odebrany JSON'+ JSON.stringify(this.user));
      }, err => {
        console.log('err' + err);
      }) 
  }

  showToasterUpdateUser() : void{
    this.toastr.success(this.userForm.controls.name.value + " " + this.userForm.controls.surname.value + " został zaktualizowany pomyślnie!");
  }
}
