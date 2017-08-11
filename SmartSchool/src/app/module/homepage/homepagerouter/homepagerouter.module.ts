import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MenusComponent } from '../menus/menus.component';
import { ErrorComponent } from '../error/error.component';
const HomepageRoutes: Route[] = [
	{ path: '', redirectTo: 'menus',  pathMatch: 'full'},
	{ path: 'menus', component: MenusComponent },
	{ path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomepageRoutes),
  ],
  declarations: []
})
export class HomepagerouterModule { }
