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
import {A11yModule} from '@angular/cdk/a11y';
import { MatInputModule} from '@angular/material/input';
import { MatToolbarModule  } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule}  from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS  } from '@angular/material/form-field';
import { DialogRemoveUserComponent } from './users/dialog-remove-user/dialog-remove-user.component'
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { DialogRemoveProductComponent } from './products/dialog-remove-product/dialog-remove-product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { DialogRemoveClientComponent } from './clients/dialog-remove-client/dialog-remove-client.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AddSaleComponent } from './sales/add-sale/add-sale.component';
import { DialogRemoveSaleComponent } from './sales/dialog-remove-sale/dialog-remove-sale.component';
import { SaleDetailsComponent } from './sales/sale-details/sale-details.component';
import { DialogSearchClientSaleComponent } from './sales/dialog-search-client-sale/dialog-search-client-sale.component';
import { DialogSearchProductSaleComponent } from './sales/dialog-search-product-sale/dialog-search-product-sale.component';
import { MatTableModule } from '@angular/material/table' 
import { MatCardModule } from '@angular/material/card'
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator'
@NgModule({
  declarations: [MenuComponent, UsersComponent, SalesComponent, ProductsComponent, RaportsComponent, UserDetailsComponent, AddUserComponent, DialogRemoveUserComponent, LoginComponent, AddProductComponent, DialogRemoveProductComponent, ProductDetailsComponent, ClientsComponent, ClientDetailsComponent, DialogRemoveClientComponent, AddClientComponent, UserSettingsComponent, AddSaleComponent, DialogRemoveSaleComponent, SaleDetailsComponent, DialogSearchClientSaleComponent, DialogSearchProductSaleComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    A11yModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    UsersComponent,
    MenuComponent, 
    A11yModule,   
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } }
  ],
  
})
export class MainModule { }
