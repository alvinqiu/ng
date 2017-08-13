import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../../service/api.service';
import { StaffClass } from './staff-class';
@Component({
  selector: 'app-staffsmodal',
  templateUrl: './staffsmodal.component.html',
  styleUrls: ['./staffsmodal.component.css']
})
export class StaffsmodalComponent implements OnInit {
  genderList = [
    { value: 0, viewValue: '男' },
    { value: 1, viewValue: '女' }
  ];
  passTypeList = [
    { value: 1, viewValue: '身份证' },
    { value: 2, viewValue: '护照' },
    { value: 3, viewValue: '港澳台侨胞证' }
  ];
  hkmtList = [
    { value: 1, viewValue: '香港' },
    { value: 2, viewValue: '澳门' },
    { value: 3, viewValue: '台湾' }
  ];
  politicalStatusList = [
    { value: 1, viewValue: '共产党' },
    { value: 2, viewValue: '国民党' },
    { value: 3, viewValue: '共青团员' }
  ];
  maritalStatusList = [
    { value: 1, viewValue: '未婚' },
    { value: 2, viewValue: '已婚' }
  ];
  disabilityList = [
    { value: 0, viewValue: '否(不残疾)' },
    { value: 1, viewValue: '是(残疾)' }
  ];
  statusList = [
    { value: 1, viewValue: '在职' },
    { value: 2, viewValue: '离职' },
    { value: 3, viewValue: '休假' }
  ];
  highestDegreeList = [
    { value: 1, viewValue: '本科' },
    { value: 2, viewValue: '中专' },
    { value: 3, viewValue: '大专' },
    { value: 4, viewValue: '硕士' },
    { value: 5, viewValue: '博士' }
  ];
  engDegreeList = [
    { value: 1, viewValue: '英语四级' },
    { value: 2, viewValue: '英语6级' },
    { value: 3, viewValue: '英语专业8级' }
  ];
  mandarinDegreeList = [
    { value: 1, viewValue: '甲等' },
    { value: 2, viewValue: '乙等' },
    { value: 3, viewValue: '丙等' }
  ];
  studyAbroadList = [
    { value: 0, viewValue: '无' },
    { value: 1, viewValue: '有' }
  ];
  teacherCertList = [
    { value: 0, viewValue: '无' },
    { value: 1, viewValue: '有' }
  ];


  status: string;
  staffData: StaffClass;
  selectedRows: Array<StaffClass>;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private dialogRef: MdDialogRef<StaffsmodalComponent>,
    private _service: ApiService
  ) {
    this.selectedRows = groups.selectedRows;
    this.staffData = new StaffClass();
    switch (groups.func) {
      case "edit":
        this.status = "edit";
        this._service
          .getBasicHttp(`/api/bi/staff/getStaffById/${this.selectedRows[0].id}`, (response: any) => {
            this.staffData = response;
          });
        break;
      case "add":
        this.status = "add";
        break;
      default:
        break;
    }
  }

  ngOnInit() {
  }

  save() {
    let url = "";
    if (this.status == "edit") {
      url = `/api/bi/staff/updateStaff/${this.selectedRows[0].id}`;
    } else {
      url = "/api/bi/staff/addStaff";
    }
    document.getElementById('app-loading').style.display = "flex";
    this._service
      .postBasicHttp(url, this.staffData, (response: any) => {
        document.getElementById('app-loading').style.display = "none";
        this.dialogRef.close({ "status": "refresh", "data": response })
      });
  }
}
