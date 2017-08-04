import { Component, OnInit, SimpleChanges, OnChanges, Input, Output, EventEmitter,ViewChild } from '@angular/core';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css']
})
export class ThirdComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


@Component({

	selector: 'third-child',

	template: `

	I am from {{_input}}<br />

	<button id="out" (click)="click()">click for out</button>

	`

})
export class ThirdChildComponent implements OnInit, OnChanges {
	_input: string;
	@Input()
	public set input(v: string) {
		this._input = v;
		console.log(v);

	}

	public get input(): string {

		return this._input;

	}
	@Output()
	output:EventEmitter<string> = new EventEmitter<string>();

	click(){
		this.output.emit("事件传播则是子组件如何向父组件通信的一种方式。子组件暴露一个 EventEmitter 属性，当事件发生时，子组件利用该属性 emits( 向上弹射 ) 事件。父组件绑定到这个事件属性，并在事件发生时作出回应。子组件的 EventEmitter 属性是一个 输出属性 ，通常带有 @Output 装饰器 。");
	}

	constructor() { }

	ngOnInit() { }

	ngOnChanges(changes: SimpleChanges) {

		console.log(changes);

	}

}

@Component({

	selector: 'third-parent',

	template: '<third-child [input]="data" (output)="output($event)" #child></third-child>{{child.input}}'

})
export class ThirdParentComponent implements OnInit {
	@ViewChild(ThirdChildComponent)
	private childComponent: ThirdChildComponent;

	data: string;

	constructor() { 

	}

	ngOnInit() {

		this.data = "parent";

	}

	output($event){
		this.data = $event;
		console.log(this.childComponent.input);
	}

}
