import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { UsersService } from 'src/app/main/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName?: string;
  userSurname?: string;
  message?: string;

  constructor(private router: Router,
              private toastr: ToastrService,
              private usersService: UsersService,
              private cd: ChangeDetectorRef ) { 
    }

  ngOnInit(): void {
    let id: number = Number(localStorage.getItem('id'))
    this.getUserInfo(id);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getUserInfo(id: number): void {
    let userId = id
    this.usersService.getUser(userId).subscribe(
      (user) => {
        let lenghtName = JSON.stringify(user.data.name).length;
        let lenghtSurname = JSON.stringify(user.data.surname).length;
        console.log(user.data.name)
        this.userName = JSON.stringify(user.data.name).substr(1,lenghtName-2)  
        this.userSurname = JSON.stringify(user.data.surname).substr(1,lenghtSurname-2)  
        console.log('W header: Imie ' + user.data.name + ' Nazwisko ' + user.data.surname);
      }, err => {
        console.log('err' + err);
      }) 
      this.cd.markForCheck();
  }

  logout(){
    localStorage.removeItem('token');
    this.showToasterLogoutUser();
    this.router.navigate(['/login']);
  }

  showToasterLogoutUser() : void {
    this.toastr.success("Wylogowano!");
  }

}
