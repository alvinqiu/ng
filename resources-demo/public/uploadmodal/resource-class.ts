export class ResourceClass {
	name: string;
	stagesId: number;
	courseId: number;
	typeId: number;
	schoolId: number;
	note: string;
	format:string;
	previews: Array<string>;
	path: string;
	visibility: string;
	constructor(){
		this.name = "";
		this.stagesId = 0;
		this.courseId = 0;
		this.typeId = 0;
		this.schoolId = 0;
		this.note = "";
		this.previews = [];
		this.path = "";
		this.format = "";
		this.visibility = "";

	}
}
