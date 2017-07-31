import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { InfoComponent } from '../info/info.component';

const PersonalRoutes: Route[] = [
	{ path: '', redirectTo: 'info',  pathMatch: 'full'},
	{ path: 'info', component: InfoComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PersonalRoutes),
  ],
  declarations: []
})
export class PersonalrouterModule { }
