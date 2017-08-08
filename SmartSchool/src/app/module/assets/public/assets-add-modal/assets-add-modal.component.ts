import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-assets-add-modal',
  templateUrl: './assets-add-modal.component.html',
  styleUrls: ['./assets-add-modal.component.css']
})
export class AssetsAddModalComponent implements OnInit {
  types = [
    {value: '1', viewValue: '点读机'},
    {value: '2', viewValue: '复读机'},
    {value: '3', viewValue: '大飞机'}
  ];
  suppliers = [
    {value: '1', viewValue: 'test1'},
    {value: '2', viewValue: 'test2'},
    {value: '3', viewValue: 'test3'}
  ];

  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private dialogRef: MdDialogRef<AssetsAddModalComponent>
  ) { }

  ngOnInit() {
  }

}
