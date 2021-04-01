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
    BrowserAnimationsModule,

  ],
  exports: [
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
