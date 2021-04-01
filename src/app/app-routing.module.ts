import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { MenuComponent } from './main/menu/menu.component';
import { ProductsComponent } from './main/products/products.component';
import { RaportsComponent } from './main/raports/raports.component';
import { SalesComponent } from './main/sales/sales.component';
import { AddUserComponent } from './main/users/add-user/add-user.component';
import { UserDetailsComponent } from './main/users/user-details/user-details.component';
import { UsersComponent } from './main/users/users.component';



const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MenuComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/add', component: AddUserComponent},
  {path: 'users/:id', component: UserDetailsComponent}, // można dodać resole jak w car service
  {path: 'products', component: ProductsComponent},
  {path: 'raports', component: RaportsComponent},
  {path: 'sales', component: SalesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
