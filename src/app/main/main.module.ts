import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { SalesComponent } from './sales/sales.component';
import { ProductsComponent } from './products/products.component';
import { RaportsComponent } from './raports/raports.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './users/add-user/add-user.component';
import { MatToolbarModule  } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule}  from '@angular/material/select';
import {A11yModule} from '@angular/cdk/a11y';

@NgModule({
  declarations: [MenuComponent, UsersComponent, SalesComponent, ProductsComponent, RaportsComponent, UserDetailsComponent, AddUserComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    A11yModule,
    MatButtonModule,
    //MatToolbarModule,
    //MatIconModule,
    //MatFormFieldModule,
    //MatSelectModule
  ],
  exports: [
    UsersComponent,
    MenuComponent,    
    //MatButtonModule,
    //MatToolbarModule,
    //MatIconModule,
    //MatFormFieldModule,
    //MatSelectModule
  
  ]
})
export class MainModule { }
