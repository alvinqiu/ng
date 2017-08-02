import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { IndexComponent } from '../index/index.component';
import { SpecificComponent } from '../specific/specific.component';

const AssetsRoutes: Route[] = [
	{ path: '', redirectTo: 'index',  pathMatch: 'full'},
	{ path: 'index', component: IndexComponent },
  { path: 'specific', component: SpecificComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AssetsRoutes),

  ],
  declarations: []
})
export class AssetsrouterModule { }
