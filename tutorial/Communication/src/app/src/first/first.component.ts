import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


@Component({

selector: 'first-child',

template: '{{input}}'

})
export class FirstChildComponent implements OnInit {

@Input()
input;

constructor() { }

	ngOnInit() { }

}





@Component({

	selector: 'first-parent',

	template: '<first-child [input]="data"></first-child>'

})
export class FirstParentComponent implements OnInit {

	data: string;

	constructor() { }

	ngOnInit() {

		this.data = "输入型绑定：输入型绑定指的是利用模板语法中的属性型绑定方式，将父组件的数据传递到子组件对应的对象中，子组件中的对象一般使用@Input装饰器来修饰，作为数据的接受者";

	}

}