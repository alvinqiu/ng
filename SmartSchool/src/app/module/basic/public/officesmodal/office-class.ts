export class OfficeClass {
	id: number;
	buildingId: number;
	schoolId: number;
	roomName: string;
	attributeId: number;
	roomDesc: string;
	multiMedia: number;
	maxCapacity: number;
	constructor() {
		this.buildingId = 0;
		this.schoolId = 0;
		this.roomName = "";
		this.attributeId = 0;
		this.roomDesc = "";
		this.multiMedia = 0;
		this.maxCapacity = 0;
	}
}
