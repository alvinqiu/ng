import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { IndexComponent } from './component/index/index.component';
import { ReviewComponent } from './component/review/review.component';
import { MineComponent } from './component/mine/mine.component';



const appRoutes:Routes = [
  {path: '', component: IndexComponent},
  {path:'resource', component:IndexComponent},
  {path:'review', component:ReviewComponent},
  {path:'mine', component:MineComponent},
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
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
