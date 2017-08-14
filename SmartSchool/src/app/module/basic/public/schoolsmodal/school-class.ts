export class SchoolClass {
	"id": number;
	"name": string;
	"nick_name": string;
	"address_id": number;
	"branch":number;
	"parent_school":number;
	"office_no":string;
	"nominated_contact_no":string;
	"nominated_contact_person":string;
	"school_desc":string;
	"place_holder1":string;
	"place_holder2":string;
	"area":string;
	"city":string;
	"province":string;
	constructor() {
		this.name = "";
		this.nick_name = "";
		this.address_id = 0;
		this.branch = 1;
		this.parent_school = 1;
		this.office_no = "";
		this.nominated_contact_no = "";
		this.nominated_contact_person = "";
		this.school_desc = "";
		this.area = "";
		this.city = "";
		this.province = "";
		this.place_holder1 = "";
		this.place_holder2 = "";
		
	}
}
