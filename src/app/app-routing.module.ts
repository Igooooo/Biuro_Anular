import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { AddClientComponent } from './main/clients/add-client/add-client.component';
import { ClientDetailsComponent } from './main/clients/client-details/client-details.component';
import { ClientsComponent } from './main/clients/clients.component';
import { LoginComponent } from './main/login/login.component';
import { MenuComponent } from './main/menu/menu.component';
import { AddProductComponent } from './main/products/add-product/add-product.component';
import { ProductDetailsComponent } from './main/products/product-details/product-details.component';
import { ProductsComponent } from './main/products/products.component';
import { RaportsComponent } from './main/raports/raports.component';
import { SalesComponent } from './main/sales/sales.component';
import { UserSettingsComponent } from './main/user-settings/user-settings.component';
import { AddUserComponent } from './main/users/add-user/add-user.component';
import { UserDetailsComponent } from './main/users/user-details/user-details.component';
import { UsersComponent } from './main/users/users.component';



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MenuComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/add', component: AddUserComponent},
  {path: 'users/:id', component: UserDetailsComponent}, 
  {path: 'userSettings', component: UserSettingsComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'client/add', component: AddClientComponent},
  {path: 'client/:id', component: ClientDetailsComponent}, 
  {path: 'products', component: ProductsComponent},
  {path: 'products/add', component: AddProductComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'raports', component: RaportsComponent},
  {path: 'sales', component: SalesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
