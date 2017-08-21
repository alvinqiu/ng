export const fileTypeList = [
	{
		"text": "全部",
		"value": "",
		"format": [

		]
	},
	{
		"text": "文档",
		"value": "WORD",
		"format": [
			".doc",
			".docx"
		]
	},
	{
		"text": "表格",
		"value": "EXCEL",
		"format": [
			".xls",
			".xlsx"
		]
	},
	{
		"text": "演示",
		"value": "PPT",
		"format": [
			".ppt",
			".pptx"
		]
	},
	{
		"text": "Pdf",
		"value": "PDF",
		"format": [
			".pdf"
		]
	},
	{
		"text": "文本",
		"value": "TEXT",
		"format": [
			".txt"
		]
	},
	{
		"text": "图片",
		"value": "IMAGE",
		"format": [
			".bmp",
			".gif",
			".jpg",
			".jpeg",
			".pic",
			".png",
			".tif"
		]
	},
	{
		"text": "视频",
		"value": "VIDEO",
		"format": [
			".avi",
			".rmvb",
			".rm",
			".asf",
			".divx",
			".mpg",
			".mpeg",
			".mpe",
			".wmv",
			".mp4",
			".mkv",
			".vob"
		]
	},
	{
		"text": "音频",
		"value": "VOICE",
		"format": [
			".wav",
			".aif",
			".au",
			".mp3",
			".ram",
			".wma",
			".mmf",
			".amr",
			".aac",
			".flac"
		]
	}
]

export const Menu = [{
	"id": "basic",
	"name": "基础信息管理",
	"children": [{
		"icon": "account_circle",
		"name": "个人中心",
		"url": "/app/basic/personal",
		"description": ""
	}, {
		"icon": "people",
		"name": "教职工信息",
		"url": "/app/basic/staffs",
		"description": ""
	},
	{
		"icon": "account_balance",
		"name": "教学楼管理",
		"url": "/app/basic/buildings",
		"description": ""
	}, {
		"icon": "local_post_office",
		"name": "教室办公室管理",
		"url": "/app/basic/offices",
		"description": ""
	}, {
		"icon": "subject",
		"name": "学科管理",
		"url": "/app/basic/subjects",
		"description": ""
	}, {
		"icon": "golf_course",
		"name": "课程管理",
		"url": "/app/basic/course",
		"description": ""
	}, {
		"icon": "grade",
		"name": "年级管理",
		"url": "/app/basic/grades",
		"description": ""
	}, {
		"icon": "class",
		"name": "班级管理",
		"url": "/app/basic/classes",
		"description": ""
	}, {
		"icon": "lock",
		"name": "密码管理",
		"url": "/app/basic/password",
		"description": ""
	}]
}, {
	"id": "resource",
	"name": "资源管理",
	"children": [{
		"icon": "cloud",
		"name": "智慧云网盘",
		"url": "/app/resource/index",
		"description": ""
	}, {
		"icon": "my_location",
		"name": "我的资源",
		"url": "/app/resource/mine",
		"description": ""
	}, {
		"icon": "rate_review",
		"name": "资源审核",
		"url": "/app/resource/review",
		"description": ""
	}]
}, {
	"id": "resource",
	"name": "资产管理",
	"children": [{
		"icon": "web_asset",
		"name": "资产管理",
		"url": "/app/assets/index",
		"description": ""
	}]
}

]

export const MenuTeacher = [{
	"id": "basic",
	"name": "基础信息管理",
	"children": [
		{
			"icon": "account_circle",
			"name": "个人中心",
			"url": "/app/basic/personal",
			"description": ""
		}, {
			"icon": "lock",
			"name": "密码管理",
			"url": "/app/basic/password",
			"description": ""
		}]
}, {
	"id": "resource",
	"name": "资源管理",
	"children": [{
		"icon": "cloud",
		"name": "智慧云网盘",
		"url": "/app/resource/index",
		"description": ""
	}, {
		"icon": "my_location",
		"name": "我的资源",
		"url": "/app/resource/mine",
		"description": ""
	}]
}]

export const MenuSuper = [{
	"id": "basic",
	"name": "基础信息管理",
	"children": [{
		"icon": "account_circle",
		"name": "个人中心",
		"url": "/app/basic/personal",
		"description": ""
	}, {
		"icon": "people",
		"name": "教职工信息",
		"url": "/app/basic/staffs",
		"description": ""
	}, {
		"icon": "school",
		"name": "学校管理",
		"url": "/app/basic/schools",
		"description": ""
	}, {
		"icon": "lock",
		"name": "密码管理",
		"url": "/app/basic/password",
		"description": ""
	}]
}, {
	"id": "resource",
	"name": "资源管理",
	"children": [{
		"icon": "cloud",
		"name": "智慧云网盘",
		"url": "/app/resource/index",
		"description": ""
	}, {
		"icon": "my_location",
		"name": "我的资源",
		"url": "/app/resource/mine",
		"description": ""
	}, {
		"icon": "rate_review",
		"name": "资源审核",
		"url": "/app/resource/review",
		"description": ""
	}]
}, {
	"id": "resource",
	"name": "资产管理",
	"children": [{
		"icon": "web_asset",
		"name": "资产管理",
		"url": "/app/assets/index",
		"description": ""
	}]
}, {
	"id": "shedule",
	"name": "排课系统",
	"children": [{
		"icon": "school",
		"name": "走班排课",
		"url": "",
		"description": ""
	}]
}

]
