import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { clientType } from 'src/app/shared/enums/clientType';
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
  constructor(private userService: UsersService,
              private router: Router) { 
    
  }

  ngOnInit(): void {
    this.getUsers();
    console.log("jestem znowu w comp")
    console.log('Ile' + this.users.length);
    //console.log('jestem w user comp ' + this.users.values)
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users.data
        //console.log('user'+ JSON.stringify(this.users));
      }
    );
  }

  removeUser(user: User, event: any) {  // metoda event ma zapobiec przekierowaniu do detali samochodu (guzuk remove jest na jego polu)
    event.stopPropagation();
    this.userService.removeUser(user.id).subscribe(() => {
      this.getUsers();
    });
    //console.log('id:' + user.id)
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
  
}
