import { Component, OnInit } from '@angular/core';
import { Menu, fileTypeList } from '../../config/menu';
import { 
  IPageChangeEvent
} from '@covalent/core';
import { UploadModalComponent } from '../public/upload-modal/upload-modal.component';
import { MdDialog } from '@angular/material';
function toTree(data, parent_id) {
    var tree = [];
    var temp;
    for (var i = 0; i < data.length; i++) {
        if (data[i].parent_id == parent_id) {
            var obj = data[i];
            temp = toTree(data, data[i].id);
            if (temp.length > 0) {
             obj.children = temp;
            }
            tree.push(obj);
        }
    }
    return tree;
}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  primary:object;
  junior:object;
  senior:object;
  showMenu = {
  	period:[],
  	subject:[],
  	version:[],
  	textbook:[]
  }
  tree = []
  searchMenu = {
    period:0,
    subject:0,
    version:0,
    textbook:0
  }
  searchInputTerm: string;
  fileTypes = []
  pageSizeAll: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number = 0;
  constructor(
    public dialog: MdDialog
    ) { }

  ngOnInit() {
  	this.tree = toTree(Menu, 0); 
    this.fileTypes =  fileTypeList;
  	this.showMenu.period = this.tree;
    this.searchMenu.period = this.tree[0].id
  	this.showMenu.subject = this.tree[0].children;
    this.searchMenu.subject = this.tree[0].children[0].id
  	this.showMenu.version = this.tree[0].children[0].children;
    this.searchMenu.version = this.tree[0].children[0].children[0].id;
    this.showMenu.textbook = this.tree[0].children[0].children[0].children;
    this.searchMenu.textbook = this.tree[0].children[0].children[0].children[0].id;

  }

  periodChange(): void {
    this.showMenu.period.map( item => {
      if (item.id == this.searchMenu.period) {
        this.showMenu.subject = item.children;
        this.searchMenu.subject = item.children[0].id
        this.showMenu.version = item.children[0].children;
        this.searchMenu.version = item.children[0].children[0].id;
        this.showMenu.textbook = item.children[0].children[0].children;
        this.searchMenu.textbook = item.children[0].children[0].children[0].id;
      }
    })
  }

  subjectChange(): void {
    this.showMenu.subject.map( item => {
      if (item.id == this.searchMenu.subject) {
        this.showMenu.version = item.children;
        this.searchMenu.version = item.children[0].id;
        this.showMenu.textbook = item.children[0].children;
        this.searchMenu.textbook = item.children[0].children[0].id;
      }
    })
  }

  versionChange(): void {
    this.showMenu.version.map( item => {
      if (item.id == this.searchMenu.version) {
        this.showMenu.textbook = item.children;
        this.searchMenu.textbook = item.children[0].id;
      }
    })
  }

  textbookChange(): void {

  }

  change(event: IPageChangeEvent): void {

  }

  handleSearch(searchInputTerm: string):void {

  }

  openDialog(condition: any): void {
    condition.tree = this.tree;
    condition.fileTypes = this.fileTypes;
    let dialogRef = this.dialog.open(UploadModalComponent, {
      data: condition,
      width: "60%"
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
