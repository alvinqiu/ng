import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { IndexComponent } from '../index/index.component';
import { DetailComponent } from '../detail/detail.component';
import { UploadComponent } from '../upload/upload.component';
const ResourcesRoutes: Route[] = [
	{ path: '', redirectTo: 'index',  pathMatch: 'full'},
	{ path: 'index', component: IndexComponent },
	{ path: 'detail/:id', component: DetailComponent },
	{ path: 'upload', component: UploadComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ResourcesRoutes),
  ],
  declarations: []
})
export class ResourcesrouterModule { }
