export class GradeClass {
	"id": number;
	"schoolId": number;
	"gradeName": string;
	"schoolName": string;
	"gradeManager":number;
	"gradeDesc":string;
	"gradeLevel":Date;
	"gradeAttr":number;
	"status":number;
	constructor() {
		this.gradeName = "";
		this.schoolName = "";
		this.gradeManager = 0;
		this.gradeDesc = "";
		this.gradeLevel = new Date();
		this.gradeAttr = 0;
		this.status = 0;
	}
}
