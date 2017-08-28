export class ResourceClass {
    name: string;
    period:number;
    subject:number;
    version:number;
    textbook:number;
    chapter:number ;
    section:number ;
    path: string;
    note:string;
    visibility: string;
    typeId: number;
    sourceType: number;
    constructor() {
        this.name = '';
    	this.period = 0;
    	this.subject = 0;
    	this.version = 0;
    	this.textbook = 0;
        this.chapter = 0;
        this.section = 0;
        this.path = '';
        this.note = "";
        this.visibility = "PUBLIC";
        this.typeId = 0;
        this.sourceType = 1; 
    }
}
