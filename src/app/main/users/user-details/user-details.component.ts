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
  typeOfUserDefault: string = userType.pracownik ;
  typeOfUser = Object.values(userType);
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
    this.usersService.updateUser(this.userForm.value).subscribe(() => {
      this.router.navigate(['/users']);
      this.showToasterUpdateUser();
    }, err => {   
        console.log('err ', err);
        this.showToasterUpdateUserError();
      }
    );
  }


  loadUser() : void {
    const id = +this.route.snapshot.params['id']; 
    this.usersService.getUser(id).subscribe(
      (user) => {
      this.user = user.data;
      this.userForm.patchValue(this.user);
      }, err => {
        console.log('err' + err);
      }) 
  }

  showToasterUpdateUser() : void{
    this.toastr.success(this.userForm.controls.name.value + " " + this.userForm.controls.surname.value + " zosta?? zaktualizowany pomy??lnie!");
  }

  showToasterUpdateUserError() : void {
    this.toastr.success(this.userForm.controls.name.value + " " + this.userForm.controls.surname.value + " nie zosta?? zaktualizowany pomy??lnie!");
  }
}
