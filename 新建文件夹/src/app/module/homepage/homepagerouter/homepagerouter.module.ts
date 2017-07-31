import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MenusComponent } from '../menus/menus.component';

const HomepageRoutes: Route[] = [
	{ path: '', redirectTo: 'menus',  pathMatch: 'full'},
	{ path: 'menus', component: MenusComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomepageRoutes),
  ],
  declarations: []
})
export class HomepagerouterModule { }
