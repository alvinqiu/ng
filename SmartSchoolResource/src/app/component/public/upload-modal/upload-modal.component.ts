import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { TdFileService, IUploadOptions } from '@covalent/core';
import { ResourceClass } from './resource-class';
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
    textbook:[]
  };
  belongs = [
    {value: 1, viewValue: '公开'},
    {value: 2, viewValue: '私有'}
  ]
  fileSelectMsg: string = '您还没有选择文件';
  fileUploadMsg: string = '您还没有上传文件';
  fileTypes = [];
  resource:ResourceClass; 
  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<UploadModalComponent>
  	) { 
    this.resource = new ResourceClass();
    this.fileTypes = groups.fileTypes;
    this.showMenu.period = groups.tree;
    this.resource.period = groups.tree[0].id;
    this.showMenu.subject = groups.tree[0].children;
    this.resource.subject = groups.tree[0].children[0].id;
    this.showMenu.version = groups.tree[0].children[0].children;
    this.resource.version = groups.tree[0].children[0].children[0].id;
    this.showMenu.textbook = groups.tree[0].children[0].children[0].children;
    this.resource.textbook = groups.tree[0].children[0].children[0].children[0].id;

  }

  ngOnInit() {
  }

  periodChange() {
    this.showMenu.period.map( item => {
      if (item.id == this.resource.period) {
        this.showMenu.subject = item.children;
        this.resource.subject = item.children[0].id
        this.showMenu.version = item.children[0].children;
        this.resource.version = item.children[0].children[0].id;
        this.showMenu.textbook = item.children[0].children[0].children;
        this.resource.textbook = item.children[0].children[0].children[0].id;
      }
    })
  }
  subjectChange() {
    this.showMenu.subject.map( item => {
      if (item.id == this.resource.subject) {
        this.showMenu.version = item.children;
        this.resource.version = item.children[0].id;
        this.showMenu.textbook = item.children[0].children;
        this.resource.textbook = item.children[0].children[0].id;
      }
    })
  }
  versionChange() {
    this.showMenu.version.map( item => {
      if (item.id == this.resource.version) {
        this.showMenu.textbook = item.children;
        this.resource.textbook = item.children[0].id;
      }
    })
  }
  textbookChange() {
    
  }
  save() {
  	
  }
  cancelEvent() {

  }
  uploadEvent(file: File):void {
    this.fileUploadMsg = file.name;
    let options: IUploadOptions = {
      url: '/resource/upload',
      method: 'post',
      file: file
    };
  }
  selectEvent(file: File):void {
    this.fileSelectMsg = file.name;
  }

}
