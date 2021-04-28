import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { UsersService } from './main/users/users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MainService } from './main/main.service';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ProductService } from './main/products/product.service';
import { ClientService } from './main/clients/client.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
    //ToastrModule.forRoot(),
  ],
  exports: [
  ],
  providers: [UsersService, MainService, AppService, AuthService, ProductService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
