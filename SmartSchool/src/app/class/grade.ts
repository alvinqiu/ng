export class GradeClass {
	"id": number;
	"schoolId": number;
	"gradeName": string;
	"schoolName": string;
	"gradeManagerName":string;
	"gradeDesc":string;
	"gradeLevel":number;
	"gradeAttr":number;
	"status":number;
	constructor() {
		this.gradeName = "";
		this.schoolName = "";
		this.gradeManagerName = "";
		this.gradeDesc = "";
		this.gradeLevel = 0;
		this.gradeAttr = 0;
		this.status = 0;
	}
}
