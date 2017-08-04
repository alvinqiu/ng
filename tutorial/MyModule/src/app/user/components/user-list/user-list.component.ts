import { Component, OnInit } from '@angular/core';
import { UserListClass } from "./user-list-class";
import { UserLIstServiceService } from "./user-list-service.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userListService: UserLIstServiceService) { }
  
  username: string;
  users: UserListClass[];
  
  ngOnInit() {
  	this.users = this.userListService.fetchAllUsers();
  }

	addNewUser() {
		let user = new UserListClass(this.username, this.users.length);
		this.users.push(user);
	}
}
