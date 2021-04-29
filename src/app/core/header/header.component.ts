import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(private router: Router,
              private toastr: ToastrService,
              private usersService: UsersService,
              private cd: ChangeDetectorRef ) { 
    }

  ngOnInit(): void {
    let id: number = Number(localStorage.getItem('id'))
    this.getUserInfo(id);
    console.log('Wchodze do header');
    this.cd.markForCheck();
  }

  logout(){
    localStorage.removeItem('token');
    this.showToasterLogoutUser();
    this.userSurname = '';
    this.userName= 'Brak użytkownika';
    this.router.navigate(['/login']);
  }

  showToasterLogoutUser() : void {
    this.toastr.success("Wylogowano!");
  }

  getUserInfo(id: number): void {
    let userId = id
    this.usersService.getUser(userId).subscribe(
      (user) => {
        let lenghtName = JSON.stringify(user.data.name).length;
        let lenghtSurname = JSON.stringify(user.data.surname).length;
        this.userName = JSON.stringify(user.data.name).substr(1,lenghtName-2)  
        this.userSurname = JSON.stringify(user.data.surname).substr(1,lenghtSurname-2)  
        console.log('W header: Imie ' + this.userName + ' Nazwisko ' + this.userSurname);
      }, err => {
        console.log('err' + err);
      }) 
      this.cd.markForCheck();
  }
}
