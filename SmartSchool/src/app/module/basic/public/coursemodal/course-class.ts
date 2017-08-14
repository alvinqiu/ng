export class CourseClass {
	id: number;
	subjectId: number;
	courseName: string;
	requiredCour: number;
	courseDesc: string;
	period: number;
	gradeId: number;
	constructor() {
		this.subjectId = 0;
		this.courseName = "";
		this.requiredCour = 1;
		this.courseDesc = "";
		this.period = 0;
		this.gradeId = 0;
	}
}
