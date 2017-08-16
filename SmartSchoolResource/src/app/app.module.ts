import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { IndexComponent } from './component/index/index.component';
import { ReviewComponent } from './component/review/review.component';
import { MineComponent } from './component/mine/mine.component';
import { ApiGuardGuard } from './component/guard/api-guard.guard';
import {
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdListModule,
  MdMenuModule,
  MdRadioModule,
} from '@angular/material';
import {
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentFileModule,
} from '@covalent/core';
import { TreeModule } from 'angular-tree-component';

import { BarRatingModule } from 'ngx-bar-rating';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
const appRoutes:Routes = [
  {path: '', redirectTo: 'resource',  pathMatch: 'full'},
  { 
    path:'resource', 
    canActivate: [ApiGuardGuard],
    children: [
      { path: '', redirectTo: 'index',  pathMatch: 'full' },
      { path:'index', component:IndexComponent },
      { path:'review', component:ReviewComponent },
      { path:'mine', component:MineComponent }
    ]
  },
  
]

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ReviewComponent,
    MineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes,{ useHash: true }),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdRadioModule,
    TreeModule,
    CovalentPagingModule,
    CovalentSearchModule,
    CovalentFileModule,
  ],
  providers: [ApiGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
