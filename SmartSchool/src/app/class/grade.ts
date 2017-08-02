export class GradeClass {
	"id": number;
	"schoolId": number;
	"gradeName": string;
	"schoolName": string;
	"managerName":string;
	"gradeDesc":string;
	"timestamp":number;
	"gradeLevel":number;
	"gradeAttr":number;
	"status":number;
	constructor() {
		this.gradeName = "";
		this.schoolName = "";
		this.managerName = "";
		this.gradeDesc = "";
		this.gradeLevel = 0;
		this.timestamp = 0;
		this.gradeAttr = 0;
		this.status = 0;
	}
}
