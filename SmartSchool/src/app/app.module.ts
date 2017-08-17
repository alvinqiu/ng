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
import {
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdListModule,
  MdMenuModule,
} from '@angular/material';
import { LoginModule } from './module/login/login.module';
import { HomepageModule } from './module/homepage/homepage.module';
import { BasicModule } from './module/basic/basic.module';
import { AssetsModule } from './module/assets/assets.module';
import { ResourceModule } from './module/resource/resource.module';
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
    LoginModule,
    HomepageModule,
    BasicModule,
    AssetsModule,
    ResourceModule,

  ],
  providers: [AuthGuard, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
