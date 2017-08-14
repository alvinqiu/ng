import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { MdDialog } from '@angular/material';
import { MsgmodalComponent } from '../public/msgmodal/msgmodal.component';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  oldPassword: string
  newPassword: string
  newRepeatPassword: string
  constructor(
  	public dialog: MdDialog,
  	private _service: ApiService
  	) { }

  ngOnInit() {
  }

  save() {
  	this._service.putBasicHttp(`/user`,{oldPassword: this.oldPassword, newPassword: this.newPassword}, res => {
  		let dialogRef = this.dialog.open(MsgmodalComponent, {
	        data:{"label":"成功","msg":"密码修改成功", "color":"accent","icon":"error"},
	        width:"60%"
	      });
  	} , () => {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
          data:{"label":"失败","msg":"密码修改失败", "color":"accent","icon":"error"},
          width:"60%"
        });
    })
  }
}
