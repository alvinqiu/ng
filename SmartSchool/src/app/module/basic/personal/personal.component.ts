import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  imageFinishedUploading(e:any) {
    console.log(e)
  }
  imageRemoved(e:any) {
    console.log(e)
  }
  uploadStateChange(e:any) {
    console.log(e)
  }

}
