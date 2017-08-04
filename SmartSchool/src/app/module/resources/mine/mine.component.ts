import { Component, OnInit } from '@angular/core';
import { 
  IPageChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { UploadmodalComponent } from '../public/uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  list:any = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  selectedRows: any[] = [];
  searchInputTerm: string = "";
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
    ) { }
  change(event: IPageChangeEvent): void {
    this.event = event;
    console.log(event)
  }
  openDialog():void {
    let dialogRef = this.dialog.open(UploadmodalComponent, {
      data:{"value":"test"},
      width:"60%"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ngOnInit() {
  }
  handleSearch(searchInputTerm: string):void {
    console.log(searchInputTerm)
  }

}
