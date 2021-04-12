import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/model/user';
import { UsersService } from './users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  limit_show_user_min = 0;
  limit_show_user_max = 10;
  users: User[] = [];

  constructor(private cd: ChangeDetectorRef,
              private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.refresh();
    console.log("jestem w user.componetns")
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users.data
      }
    );
  }

  removeUser(user: User, event: any) {  // metoda event ma zapobiec przekierowaniu do detali samochodu (guzuk remove jest na jego polu)
    event.stopPropagation();
    this.userService.removeUser(user.id).subscribe(() => {
      this.getUsers();
    });
  }

  goToUserDetails(user: User) : void {
    this.router.navigate(['/users', user.id]);
  }
  
  next(){
    console.log('Ile2' + this.users.length);
    if (this.limit_show_user_min + 10 < this.users.length){
      this.limit_show_user_min=this.limit_show_user_min+10
      this.limit_show_user_max=this.limit_show_user_max+10
    } else {
      this.limit_show_user_min=this.limit_show_user_min
      this.limit_show_user_max=this.limit_show_user_max
    }
    
  }
  back(){
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
  }
}
