export class GradeClass {
	"gradeName": string;
	"schoolName": string;
	"gradeManagerName":string;
	"gradeDesc":string;
	"gradeLevel":Date;
	"gradeAttr":number;
	"status":number;
	constructor() {
		this.gradeName = "";
		this.schoolName = "";
		this.gradeManagerName = "";
		this.gradeDesc = "";
		this.gradeLevel = new Date();
		this.gradeAttr = 0;
		this.status = 0;
	}
}
