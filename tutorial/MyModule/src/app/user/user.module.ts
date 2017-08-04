import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { UserListComponent } from './components/user-list/user-list.component';
import { UserLIstServiceService } from './components/user-list/user-list-service.service';
import { UserListServiceDirective } from './components/user-list/user-list-service.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [UserListComponent, UserListServiceDirective],
  exports: [
  	UserListComponent,
  ],
	providers: [
		UserLIstServiceService
	],
})
export class UserModule { }
