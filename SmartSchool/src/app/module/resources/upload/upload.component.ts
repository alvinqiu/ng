import { Component, OnInit } from '@angular/core';
import { TdFileService, IUploadOptions } from '@covalent/core';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [ TdFileService ]
})
export class UploadComponent implements OnInit {
  file: File;
  fileSelectMsg: string = 'No file selected yet.';
  fileUploadMsg: string = 'No file uploaded yet.';
  constructor(private fileUploadService: TdFileService) { }

  ngOnInit() {
  }

  selectEvent(file: File): void {
    this.fileSelectMsg = file.name;
  }

  uploadEvent(file: File): void {
    this.fileUploadMsg = file.name;
  }

  cancelEvent(): void {
    this.fileSelectMsg = 'No file selected yet.';
    this.fileUploadMsg = 'No file uploaded yet.';
  }
}
