export class GradeClass {
	"id": number;
	"gradeName": string;
	"schoolName": string;
	"gradeManagerName":string;
	"gradeDesc":string;
	"gradeLevel":Date;
	"gradeAttr":number;
	"status":number;
	constructor() {
		this.id = 0;
		this.gradeName = "";
		this.schoolName = "";
		this.gradeManagerName = "";
		this.gradeDesc = "";
		this.gradeLevel = new Date();
		this.gradeAttr = 0;
		this.status = 0;
	}
}
