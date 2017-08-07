export class ResourceClass {
	name: string;
	stagesId: number;
	courseId: number;
	note: string;
	previews: Array<string>;
	path: string;
	constructor(){
		this.name = "";
		this.stagesId = 0;
		this.courseId = 0;
		this.note = "";
		this.previews = [];
		this.path = "";

	}
}
