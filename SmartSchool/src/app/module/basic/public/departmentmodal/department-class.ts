export class DepartmentClass {
	id: number;
	name: string;
	parent: number;
	address: string;
	manager: string;
	officeNumber: string;
	mobileNumber: string;
	departmentDesc: string;
	parDeptName: string;
	schoolId: number;
	schoolName: string;
	constructor() {
		this.id = 0;
		this.name = "";
		this.parent = 0;
		this.address = "";
		this.manager = "";
		this.officeNumber = "";
		this.mobileNumber = "";
		this.departmentDesc = "";
		this.parDeptName = "";
		this.schoolId = 0;
		this.schoolName = "";
	}
}
