import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomepageComponent } from './homepage.component';
import { HomepagerouterModule } from './homepagerouter/homepagerouter.module';
import { MenusComponent } from './menus/menus.component';
import {
  MdCardModule,
  MdButtonModule,
  MdListModule,
  MdIconModule,
  MdChipsModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    HomepagerouterModule,
    MdIconModule,
    MdListModule,
    MdCardModule,
    MdButtonModule,
    MdChipsModule,
  ],
  declarations: [HomepageComponent, MenusComponent]
})
export class HomepageModule { }
