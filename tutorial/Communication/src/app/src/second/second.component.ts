import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({

	selector: 'second-child',

	template: '{{_input}}'

})
export class SecondChildComponent implements OnInit {

	_input:string;

	@Input()
	public set input(v : string) {

		this._input = v;

		console.log(v);

	}

	public get input() : string {

		return this._input;

	}

	constructor() { }

	ngOnInit() { }
	ngOnChanges(changes:SimpleChange) {

		console.log(changes);

	}

}

@Component({

	selector: 'second-parent',

	template: '<second-child [input]="data"></second-child>'

})
export class SecondParentComponent implements OnInit {

	data: string;

	constructor() { }

	ngOnInit() {

		this.data = "当数据发生变化时能够同步显示到模板视图中，可以使用一个输入属性的 setter 函数，以拦截父组件中值的变化，并采取行动; Angular2还提供了一个生命周期函数ngOnChanges 可以监听数据的变化。使用 OnChanges 生命周期钩子接口的 ngOnChanges 方法来监测输入属性值的变化并做出回应";

	}

}