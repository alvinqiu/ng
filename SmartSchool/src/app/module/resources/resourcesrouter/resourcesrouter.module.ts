import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { IndexComponent } from '../index/index.component';
import { DetailComponent } from '../detail/detail.component';
import { ReviewComponent } from '../review/review.component';
import { MineComponent } from '../mine/mine.component';

const ResourcesRoutes: Route[] = [
	{ path: '', redirectTo: 'index',  pathMatch: 'full'},
	{ path: 'index', component: IndexComponent },
	{ path: 'detail/:id', component: DetailComponent },
	{ path: 'review', component: ReviewComponent},
	{ path: 'mine', component: MineComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ResourcesRoutes),
  ],
  declarations: []
})
export class ResourcesrouterModule { }
