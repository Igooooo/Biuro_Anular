import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/model/user';
import { UsersService } from './users.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog} from '@angular/material/dialog';
import { DialogRemoveUserComponent } from './dialog-remove-user/dialog-remove-user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  error :boolean = false;
  limit_show_user_min = 0;
  limit_show_user_max = 10;
  users: User[] = [];
  userForm = new FormGroup({});

  dataSource?: any;
  displayedColumns: string[] = ['name', 'surname', 'city', 'street', 'phone', 'email', 'type', 'remove'];
  changes = new Subject<void>();
  // get refereence to paginator
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  /*
  firstPageLabel = $localize`Pierwsza strona`;
  itemsPerPageLabel = $localize`Ilość:`;
  lastPageLabel = $localize`Last page`;
  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';
  */

  

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
        this.dataSource = new MatTableDataSource(users.data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.error = true;
        console.log('błąd w userach ' + JSON.stringify(err));
      }
    );
  }

  loadUserByFilter() : void {
    this.usersService.getUserByFilter(this.userForm.controls.name.value, this.userForm.controls.surname.value, this.userForm.controls.city.value).subscribe(
      (users) => {
      this.users = users.data;
      }, err => {
        console.log('err ' + JSON.stringify(err));
      }) 
  }
  
  removeUser(user: User) {  // metoda event ma zapobiec przekierowaniu do detali samochodu (guzuk remove jest na jego polu)
    this.usersService.removeUser(user.id).subscribe(() => {
      this.getUsers();
      this.showToasterRemoveUser();
    }, err => {
      console.log('err ' + JSON.stringify(err));
      this.showToasterRemoveUserError();
    }); 
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
  }

  back() : void {
    if (this.limit_show_user_min - 10 >= 0){
      this.limit_show_user_min=this.limit_show_user_min-10
      this.limit_show_user_max=this.limit_show_user_max-10
    } else {
      this.limit_show_user_min=this.limit_show_user_min
      this.limit_show_user_max=this.limit_show_user_max
    }
  }  

  refresh() : void {
    this.getUsers();
    this.cd.markForCheck();
    this.showToasterRefreshUser();
  }

  showToasterRemoveUser() : void {
    this.toastr.success("Użytkownik został pomyślnie usunięty!");
  }

  showToasterRemoveUserError() : void {
    this.toastr.error("Użytkownik nie został usunięty!");
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim().toLowerCase())
  }

}
