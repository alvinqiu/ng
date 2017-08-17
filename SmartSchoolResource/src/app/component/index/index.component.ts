import { Component, OnInit } from '@angular/core';
import { Menu } from '../../config/menu';

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
  constructor() { }

  ngOnInit() {
  	let arr = toTree(Menu, 0);
  	console.log(arr)
  	// this.primary = arr[0];
  	// this.junior = arr[1];
  	// this.senior = arr[2];
  	
  	this.showMenu.period = arr;
  	// this.showMenu.subject = arr[0].children;
  	// this.showMenu.version = arr[0].children.children;
  	// this.showMenu.textbook = arr[0].children.children.children;

  }



}
