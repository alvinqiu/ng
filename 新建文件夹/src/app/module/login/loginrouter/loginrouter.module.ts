import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { IndexComponent } from '../index/index.component';

const LoginRoutes: Route[] = [
	{ path: '', component: IndexComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
  ],
  declarations: []
})
export class LoginrouterModule { }
