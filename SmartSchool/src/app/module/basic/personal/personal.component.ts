import { Component, OnInit } from '@angular/core';
import { StaffClass } from '../public/staffsmodal/staff-class';
import { ApiService } from '../../../service/api.service';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
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
  startDate = new Date();
  status: string;
  staffData: StaffClass;
  headImg: any;
  constructor(
    private _service: ApiService
  ) {
    this.staffData = new StaffClass();
  }
  ngOnInit() {
    this._service.getBasicHttp(`/user/profile`, res => {
      this.staffData = Object.assign({}, res.staff, res.user);
      this.staffData.beginWorkTime = new Date(res.staff.beginWorkTime);
      this.staffData.birthDate = new Date(res.staff.birthDate);
      this.staffData.graduateTime = new Date(res.staff.graduateTime);
      this.staffData.joinTime = new Date(res.staff.joinTime);
      this.staffData.offJobTime = new Date(res.staff.offJobTime);
    });
  }
  imageFinishedUploading(e: any) {
    console.log("imageFinishedUploading " + e);
    this.headImg = e;
  }
  imageRemoved(e: any) {
    console.log("imageRemoved " + e);
    this.headImg = [];
  }
  uploadStateChange(e: any) {
    console.log("uploadStateChange " + e);
  }
  save() {
    this._service.postBasicHttp(`/user/uploadFile/`, this.headImg, res => {
      this.ngOnInit();
    });
    this._service.postBasicHttp(`/api/bi/staff/updateStaff/${this.staffData.id}`, this.staffData, res => {
      this.ngOnInit();
    });
  }
  selectedChanged(e: any) { }
}
