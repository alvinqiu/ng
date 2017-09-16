import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	RouterModule,
	Routes
} from '@angular/router';
import { LoginComponent } from '../module/login/login.component';
// import { BasicComponent } from '../module/basic/basic.component';
// import { AssetsComponent } from '../module/assets/assets.component';
import { HomepageComponent } from '../module/homepage/homepage.component';
import { ResourceComponent } from '../module/resource/resource.component'
import { AuthGuard } from '../guard/auth.guard';

const router: Routes = [
	{ path: '', redirectTo: 'app', pathMatch: 'full' },
	{
		path: 'app',
		canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
			{
				path: 'login',
				component: LoginComponent,
				canActivateChild: [AuthGuard],
				loadChildren: '../module/login/login.module#LoginModule',
			},
			{
				path: 'homepage',
				component: HomepageComponent,
				canActivateChild: [AuthGuard],
				loadChildren: '../module/homepage/homepage.module#HomepageModule',
			},
			// {
			// 	path: 'basic',
			// 	component: BasicComponent,
			// 	canActivateChild: [AuthGuard],
			// 	loadChildren: '../module/basic/basic.module#BasicModule',
			// },
			// {
			// 	path: 'assets',
			// 	canActivateChild: [AuthGuard],
			// 	component: AssetsComponent,
			// 	loadChildren: '../module/assets/assets.module#AssetsModule',
		 //    },

		    {
				path: 'resource',
				canActivateChild: [AuthGuard],
				component: ResourceComponent,
				loadChildren: '../module/resource/resource.module#ResourceModule',
		    },
		]
	}
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(router, { useHash: true }),
	],
	declarations: []
})
export class AppRouterModule { }



