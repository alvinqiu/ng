import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { IndexComponent } from '../index/index.component';
import { SearchComponent } from '../search/search.component';
import { DetailComponent } from '../detail/detail.component';
import { MineComponent } from '../mine/mine.component';
import { ReviewComponent } from '../review/review.component';
const ResourceRoutes: Route[] = [
	{ path: '', redirectTo: 'index',  pathMatch: 'full'},
	{ path: 'index', component: IndexComponent },
	// { path: 'search/:id', component: SearchComponent},
	{ path: 'search', children: [
		{path: '', component: SearchComponent},
		{path: ':id', component: SearchComponent}
	]},
	{ path: 'detail', component: DetailComponent },
	{ path: 'mine', component: MineComponent},
	{ path: 'review', component: ReviewComponent},
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
