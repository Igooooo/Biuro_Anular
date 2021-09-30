import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MatCardModule } from '@angular/material/card'
@NgModule({
  declarations: [MainMenuComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [MainMenuComponent,]
})
export class SharedModule { }
