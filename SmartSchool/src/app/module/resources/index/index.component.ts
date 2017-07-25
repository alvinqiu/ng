import { Component, OnInit } from '@angular/core';
import { 
  IPageChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { UploadmodalComponent } from '../public/uploadmodal/uploadmodal.component';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  list:any = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ]
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  searchInputTerm: string;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
    ) { }
  change(event: IPageChangeEvent): void {
    this.event = event;
    console.log(event)
  }
  handleSearch(searchInputTerm: string):void {
    console.log(searchInputTerm)
  }
  ngOnInit() {
  }
  openDialog():void {
    let dialogRef = this.dialog.open(UploadmodalComponent, {
      data:{"value":"test"},
      width:"60%"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
