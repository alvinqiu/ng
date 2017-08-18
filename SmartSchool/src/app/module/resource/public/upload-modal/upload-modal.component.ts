import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { TdFileService, IUploadOptions } from '@covalent/core';
import { ResourceClass } from './resource-class';
import { ApiService } from '../../../../service/api.service';
@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent implements OnInit {
  dialogModal:MdDialogRef<UploadModalComponent>;
  showMenu = {
    period:[],
    subject:[],
    version:[],
    textbook:[],
    chapter: [],
    section: []
  };
  Masking = true;
  belongs = [
    {value: "PUBLIC", viewValue: '公开'},
    {value: "PRIVATE", viewValue: '私有'}
  ]
  fileSelectMsg: string = '您还没有选择文件';
  fileUploadMsg: string = '您还没有上传文件';
  fileTypes = [];
  resource:ResourceClass; 
  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<UploadModalComponent>,
    private fileUploadService: TdFileService,
    private _service: ApiService
  	) { 
    this.resource = new ResourceClass();
    this.fileTypes = groups.fileTypes;
    this.showMenu.period = groups.tree;
    this.resource.period = this.showMenu.period.length>0?this.showMenu.period[0].id:0;
    this.showMenu.subject = this.showMenu.period.length>0?this.showMenu.period[0].children:[];
    this.resource.subject = this.showMenu.subject.length>0?this.showMenu.subject[0].id:0;
    this.showMenu.version = this.showMenu.subject.length>0?this.showMenu.subject[0].children:[];
    this.resource.version = this.showMenu.version.length>0?this.showMenu.version[0].id:0;
    this.showMenu.textbook = this.showMenu.version.length>0?this.showMenu.version[0].children:[];
    this.resource.textbook = this.showMenu.textbook.length>0?this.showMenu.textbook[0].id:0;

    this._service.getResourceHttp(`/category/sections?gradeId=${this.resource.textbook}`, res => {
        this.showMenu.chapter = res
        this.resource.chapter = res.length > 0?res[0].id:0;
        this.showMenu.section = this.showMenu.chapter.length > 0?this.showMenu.chapter[0].children:[];
        this.resource.section = this.showMenu.section.length > 0?this.showMenu.section[0].id: 0;
        this.Masking = false;
    })
  }

  ngOnInit() {
  }

  periodChange() {
    console.log("periodChange")
    this.showMenu.period.map( item => {
      if (item.id == this.resource.period) {
        this.showMenu.subject = item.children;
        this.resource.subject = this.showMenu.subject.length>0?this.showMenu.subject[0].id:0;
        this.subjectChange();
      }
    })
  }
  subjectChange() {
    console.log("subjectChange")
    this.showMenu.subject.map( item => {
      if (item.id == this.resource.subject) {
        this.showMenu.version = item.children;
        this.resource.version = this.showMenu.version.length>0?this.showMenu.version[0].id:0;
        // this.showMenu.textbook = this.showMenu.version.length>0?this.showMenu.version[0].children:[];
        // this.resource.textbook = this.showMenu.textbook.length>0?this.showMenu.textbook[0].id:0;
        this.versionChange()
      }
    })
  }
  versionChange() {
    this.showMenu.version.map( item => {
      if (item.id == this.resource.version) {
        this.showMenu.textbook = item.children;
        this.resource.textbook = this.showMenu.textbook.length>0?this.showMenu.textbook[0].id:0;
        this.textbookChange();
      }
    })
  }
  textbookChange() {
    this.Masking = true;
    this._service.getResourceHttp(`/category/sections?gradeId=${this.resource.textbook}`, res => {
            this.showMenu.chapter = res
            this.resource.chapter = res.length > 0?res[0].id:0;
            this.showMenu.section = this.showMenu.chapter.length > 0?this.showMenu.chapter[0].children:[];
            this.resource.section = this.showMenu.section.length > 0?this.showMenu.section[0].id: 0;
            this.Masking = false;
    })
  }
  chapterChange() {
    this.showMenu.chapter.map( item => {
      if (item.id == this.resource.chapter) {
        this.showMenu.section = item.children;
        this.resource.section = this.showMenu.section.length>0?this.showMenu.section[0].id:0;
      }
    })
  }
  sectionChange() {
    
  }
  cancelEvent() {
    this.fileSelectMsg = '您还没有选择文件';
    this.fileUploadMsg = '您还没有上传文件';
    this.resource.path = '';
  }
  uploadEvent(file: File):void {
    this.fileUploadMsg = file.name;
    this.Masking = true;
    let options: IUploadOptions = {
      url: '/resource/upload',
      method: 'post',
      file: file
    };
    this.fileUploadService.upload(options).subscribe((response) => {
      this.Masking = false;
      this.resource = Object.assign({}, this.resource, response)
    });
  }
  selectEvent(file: File):void {
    this.fileSelectMsg = file.name;
  }
  save() {
    let target = Object.assign({}, {
      stagesId: this.resource.period,
      courseId: this.resource.subject,
      versionId: this.resource.version,
      gradeId: this.resource.textbook,
      sectionId: [this.resource.chapter, this.resource.section],
    })
    this.Masking = true;
    this._service.postResourceHttp('/resource', Object.assign({}, this.resource, target), res => {
      this.dialogRef.close({"status":"refresh"});
      this.Masking = false;
    })
  }

}
