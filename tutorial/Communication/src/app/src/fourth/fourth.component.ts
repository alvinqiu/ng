import { Component, OnInit, Injectable, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.css']
})
export class FourthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Injectable()
export class Service {

	input$: EventEmitter<string> = new EventEmitter<string>();

	output$: EventEmitter<string> = new EventEmitter<string>();

	constructor() {

	}

}

@Component({

	selector: 'fourth-child',

	template: `
	通过服务依赖注入的方式，我们可以了解到，服务在父子组件之间是可以共享的，因此，我们可以利用共享的服务的形式在父子组件之间进行通信。
	<button id="out" (click)="click()">click for output</button>

	`

})
export class FourthChildComponent {

	constructor(private _service: Service) {

		this._service.input$.subscribe(function (input: string) {

			console.log(input);

		})

	}

	click() {

		this._service.output$.emit('点击子组件按钮触发父组件方法');

	}

}

@Component({

	selector: 'fourth-parent',

	template: '<fourth-child></fourth-child><button id="input" (click)="click()">click for input</button>',

	providers: [Service]

})
export class FourthParentComponent {

	constructor(private _service: Service) {

		this._service.output$.subscribe(function (output: string) {

			console.log(output);

		})

	}

	click() {

		this._service.input$.emit('点击父组件按钮触发子组件方法');

	}

}