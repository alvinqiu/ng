import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { IndexComponent } from '../index/index.component';
import { DetailComponent } from '../detail/detail.component';
const ResourceRoutes: Route[] = [
	{ path: '', redirectTo: 'index',  pathMatch: 'full'},
	{ path: 'index', component: IndexComponent },
	{ path: 'detail/:id', component: DetailComponent },
	// { path: 'error', component: ErrorComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ResourceRoutes),
  ],
  declarations: []
})
export class ResourceModuleModule { }
