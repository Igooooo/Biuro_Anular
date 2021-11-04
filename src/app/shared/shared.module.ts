import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MainPageActionComponent } from './components/main-page-action/main-page-action.component';
import { RouterModule } from '@angular/router';
import { MainPageSearchComponent } from './components/main-page-search/main-page-search.component';
import { MainPageTableComponent } from './components/main-page-table/main-page-table.component';
@NgModule({
  declarations: [MainMenuComponent, MainPageActionComponent, MainPageSearchComponent, MainPageTableComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatCardModule,
    RouterModule
  ],
  exports: [MainMenuComponent,MainPageActionComponent, MainPageSearchComponent, MainPageTableComponent]
})
export class SharedModule { }
