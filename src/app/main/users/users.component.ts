import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/model/user';
import { UsersService } from './users.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog} from '@angular/material/dialog';
import { DialogRemoveUserComponent } from './dialog-remove-user/dialog-remove-user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  limit_show_user_min = 0;
  limit_show_user_max = 10;
  users: User[] = [];
  userForm = new FormGroup({});
  
  constructor(private cd: ChangeDetectorRef,
              private usersService: UsersService,
              private router: Router,
              private toastr: ToastrService,              
              public dialog: MatDialog,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getUsers();
    this.createFormUser();
    console.log("jestem w user.componetns")
  }

  createFormUser() : void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      city:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])]
    })
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(
      (users) => {
        this.users = users.data
      }
    );
  }

  loadUserByFilter() : void {
    if (this.userForm.controls.city.value == ''){
      this.userForm.controls.city.setValue(`%`);
    }
    this.usersService.getUserByFilter(this.userForm.controls.name.value, this.userForm.controls.surname.value, this.userForm.controls.city.value).subscribe(
      (users) => {
      this.users = users.data;
      console.log('users' + users)
     console.log('Odebrany JSON'+ JSON.stringify(this.users));
      }) 
  }
  
  /*
  removeUser(user: User, event: any) {  // metoda event ma zapobiec przekierowaniu do detali samochodu (guzuk remove jest na jego polu)
    event.stopPropagation();
    this.userService.removeUser(user.id).subscribe(() => {
      this.getUsers();
    });
    this.showToasterRemoveUser();
  }
  */

  removeUser(user: User) {  // metoda event ma zapobiec przekierowaniu do detali samochodu (guzuk remove jest na jego polu)
    this.usersService.removeUser(user.id).subscribe(() => {
      this.getUsers();
    });
    this.showToasterRemoveUser();
  }

  goToUserDetails(user: User) : void {
    this.router.navigate(['/users', user.id]);
  }

  reset() : void {
    this.userForm.reset();
  }
  
  next() : void {
    if (this.limit_show_user_min + 10 < this.users.length){
      this.limit_show_user_min=this.limit_show_user_min+10
      this.limit_show_user_max=this.limit_show_user_max+10
    } else {
      this.limit_show_user_min=this.limit_show_user_min
      this.limit_show_user_max=this.limit_show_user_max
    }
    console.log('next');
  }

  back() : void {
    if (this.limit_show_user_min - 10 >= 0){
      this.limit_show_user_min=this.limit_show_user_min-10
      this.limit_show_user_max=this.limit_show_user_max-10
    } else {
      this.limit_show_user_min=this.limit_show_user_min
      this.limit_show_user_max=this.limit_show_user_max
    }
    console.log('back');
  }  

  refresh() : void {
    this.getUsers();
    this.cd.markForCheck();
    this.showToasterRefreshUser();
  }

  showToasterRemoveUser() : void {
    this.toastr.success("Użytkownik został pomyślnie usunięty!");
  }

  showToasterRefreshUser() : void {
    this.toastr.success("Lista użytkowników została odświeżona!");
  }

  openDialog(user : User, event: any) : void {
    event.stopPropagation();
    this.dialog.open(DialogRemoveUserComponent, {data: {name: user.name, surname: user.surname}}).
    afterClosed().
    subscribe(result => {
      if(result === 'false'){
        this.removeUser(user);
      }     
    });
  }
}
