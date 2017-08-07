import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { TdFileService, IUploadOptions } from '@covalent/core';
import { ResourceClass } from './resource-class';
import { ApiService } from '../../../../service/api.service';
@Component({
  selector: 'app-uploadmodal',
  templateUrl: './uploadmodal.component.html',
  styleUrls: ['./uploadmodal.component.css'],
  providers: [ TdFileService ]
})
export class UploadmodalComponent implements OnInit {
  foods = [];
  typelist = [];
  file: File;
  status:string;
  uploading: boolean = false;
  model:ResourceClass;
  fileSelectMsg: string = '您还没有选择文件';
  fileUploadMsg: string = '您还没有上传文件';
  dialogModal:MdDialogRef<UploadmodalComponent>;
  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<UploadmodalComponent>,
  	private fileUploadService: TdFileService,
    private _service: ApiService
  	) { 
    this.typelist = groups.typelist
    this.dialogModal = dialogRef;
    switch(groups.func) {
      case "modify":
      default:
        this.status = "add";
        this.model = new ResourceClass();
        break;
    }
  }

  ngOnInit() {
  }
  selectEvent(file: File): void {
    this.fileSelectMsg = file.name;
  }

  uploadEvent(file: File): void {
    this.fileUploadMsg = file.name;
    this.uploading = true;
    let options: IUploadOptions = {
      url: '/resource/upload',
      method: 'post',
      file: file
    };
    this.fileUploadService.upload(options).subscribe((response) => {
      this.uploading = false;
      this.model = Object.assign({}, this.model, response)
    });

  }

  cancelEvent(): void {
    this.fileSelectMsg = '您还没有选择文件';
    this.fileUploadMsg = '您还没有上传文件';
    this.model.path = '';
    this.uploading = false;
  }
  save() {
    // this._service.postResourceHttp() {

    // })
    
  }
}
