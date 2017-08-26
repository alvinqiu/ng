export class ResourceClass {
	uuid: number;
	authorName:string;
	createTime:string;
	format:string;
	courseName:string;
	stagesName:string;
	schoolName:string;
	note:string;
	name:string;
	previews:Array<string>;
	sourceType: number;
	constructor() {
		this.authorName = "";
		this.createTime = "";
		this.format = "";
		this.courseName = "";
		this.stagesName = "";
		this.schoolName = "";
		this.note = "";
		this.name = "";
		this.previews = [];
		this.sourceType = 0;
	}
}
