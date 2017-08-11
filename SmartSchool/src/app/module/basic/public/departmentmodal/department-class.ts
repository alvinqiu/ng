export class DepartmentClass {
	id: number;
	name: string;
	parent: number;
	address: string;
	manager: string;
	officeNumber: string;
	mobileNumber: string;
	departmentDesc: string;
	constructor() {
		this.name = "";
		this.parent = 0;
		this.address = "";
		this.manager = "";
		this.officeNumber = "";
		this.mobileNumber = "";
		this.departmentDesc = "";
	}
}
