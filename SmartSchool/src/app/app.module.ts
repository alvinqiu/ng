import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRouterModule } from './router/router.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import {
  MdToolbarModule,
  MdButtonModule,
  // MdSidenavModule,
  MdIconModule,
  MdListModule,
  MdMenuModule,
} from '@angular/material';
import { AuthGuard } from './guard/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRouterModule,
    BrowserAnimationsModule,
    MdListModule,
    MdIconModule,
    MdToolbarModule,
    MdMenuModule,
    MdButtonModule,
    FlexLayoutModule,
    CookieModule.forRoot(),

  ],
  providers: [AuthGuard, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
