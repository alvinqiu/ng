import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Menu, MenuTeacher, MenuSuper } from '../../../config/menu';
import { CookieService } from 'ngx-cookie';
import { UtilService } from '../../../service/util.service';
import { UserClass } from '../public/user-class';
import { ApiService } from '../../../service/api.service';



@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  Menu = [];
  user = {
    user: {
      roleId:3
    }
  }
  link = "";
  constructor(
    private _service: ApiService,
    private _utilservice: UtilService,
    private _cookieService:CookieService
  	) { }
  
  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service.getBasicHttp("/user/profile", res => {
      this.user = res;
      this.link = `/paike/pk/login/login.do?schoolId=${res.user.schoolId}&userId=${res.user.id}`;
      switch (res.user.roleId) {
        case 1:
          this.Menu = MenuSuper;
          break;
        case 2:
          this.Menu = Menu;
          break;
        case 3:
          this.Menu = MenuTeacher;
          break;
        default:
          this.Menu = MenuTeacher;
          break;
      }
      document.getElementById('app-loading').style.display = "none";
    })
  	
    
  }

  ngAfterViewInit() {
    
  }



}
