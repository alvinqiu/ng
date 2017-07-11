import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { IndexComponent } from '../index/index.component';
const ResourcesRoutes: Route[] = [
	{ path: '', redirectTo: 'index',  pathMatch: 'full'},
	{ path: 'index', component: IndexComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ResourcesRoutes),
  ],
  declarations: []
})
export class ResourcesrouterModule { }
