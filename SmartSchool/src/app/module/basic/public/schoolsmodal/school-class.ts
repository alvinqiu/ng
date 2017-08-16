export class SchoolClass {
	"id": number;
	"name": string;
	"nickName": string;
	"addressId": number;
	"branch": number;
	"parentSchool": number;
	"officeNo": string;
	"nominatedContactNo": string;
	"nominatedContactPerson": string;
	"schoolDesc": string;
	"placeHolder1": string;
	"placeHolder2": string;
	"area": string;
	"city": string;
	"province": string;
	"address": any;
	constructor() {
		this.name = "";
		this.nickName = "";
		this.addressId = 0;
		this.branch = 1;
		this.parentSchool = 1;
		this.officeNo = "";
		this.nominatedContactNo = "";
		this.nominatedContactPerson = "";
		this.schoolDesc = "";
		this.area = "";
		this.city = "";
		this.province = "";
		this.placeHolder1 = "";
		this.placeHolder2 = "";
		this.address = {};
	}
}
