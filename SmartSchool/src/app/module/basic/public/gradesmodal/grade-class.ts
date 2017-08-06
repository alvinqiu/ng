export class GradeClass {
	"id": number;
	"schoolId": number;
	"gradeName": string;
	"schoolName": string;
	"managerName":string;
	"gradeDesc":string;
	"gradeLevel":Date;
	"gradeAttr":number;
	"status":number;
	constructor() {
		this.gradeName = "";
		this.schoolName = "";
		this.managerName = "";
		this.gradeDesc = "";
		this.gradeLevel = new Date();
		this.gradeAttr = 0;
		this.status = 0;
	}
}
