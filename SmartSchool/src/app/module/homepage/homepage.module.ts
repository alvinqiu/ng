import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomepageComponent } from './homepage.component';
import { HomepagerouterModule } from './homepagerouter/homepagerouter.module';
import { MenusComponent } from './menus/menus.component';
import { ErrorComponent } from './error/error.component';
import { UtilService } from '../../service/util.service';
import { ApiService } from '../../service/api.service';
import {
  MdCardModule,
  MdButtonModule,
  MdListModule,
  MdIconModule,
  MdChipsModule,
} from '@angular/material';
import { CookieModule } from 'ngx-cookie';
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
    CookieModule.forRoot(),
  ],
  declarations: [HomepageComponent, MenusComponent, ErrorComponent],
  providers:[
    UtilService,
    ApiService

  ]
})
export class HomepageModule { }
