import { Component, OnInit } from '@angular/core';
import { 
  IPageChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  list:any = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
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
  ngOnInit() {
  }
  handleSearch(searchInputTerm: string):void {
    console.log(searchInputTerm)
  }
  openDialog():void {
    
  }

}
