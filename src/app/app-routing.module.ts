import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
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
import { AddSaleComponent } from './main/sales/add-sale/add-sale.component';
import { SaleDetailsComponent } from './main/sales/sale-details/sale-details.component';
import { SalesComponent } from './main/sales/sales.component';
import { UserSettingsComponent } from './main/user-settings/user-settings.component';
import { AddUserComponent } from './main/users/add-user/add-user.component';
import { UserDetailsComponent } from './main/users/user-details/user-details.component';
import { UsersComponent } from './main/users/users.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'users/add', component: AddUserComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard]}, 
  {path: 'userSettings', component: UserSettingsComponent, canActivate: [AuthGuard]},
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
  {path: 'client/add', component: AddClientComponent, canActivate: [AuthGuard]},
  {path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]}, 
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'products/add', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]},
  {path: 'raports', component: RaportsComponent, canActivate: [AuthGuard]},
  {path: 'sales', component: SalesComponent, canActivate: [AuthGuard]},
  {path: 'sale/add', component: AddSaleComponent, canActivate: [AuthGuard]},
  {path: 'sale/:id', component: SaleDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
