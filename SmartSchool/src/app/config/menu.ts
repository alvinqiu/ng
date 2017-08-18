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
		"icon": "class",
		"name": "个人中心",
		"url": "/app/basic/personal",
		"description": "建设中..."
	}, {
		"icon": "school",
		"name": "教职工信息",
		"url": "/app/basic/staffs",
		"description": "建设中..."
	},
	// {
	// 	"icon":"school",
	// 	"name":"部门管理",
	// 	"url":"/app/basic/departs",
	// 	"description": "建设中..."
	// },
	{
		"icon": "subject",
		"name": "教学楼管理",
		"url": "/app/basic/buildings",
		"description": "建设中..."
	}, {
		"icon": "class",
		"name": "教室办公室管理",
		"url": "/app/basic/offices",
		"description": "建设中..."
	}, {
		"icon": "subject",
		"name": "学科管理",
		"url": "/app/basic/subjects",
		"description": "建设中..."
	}, {
		"icon": "subject",
		"name": "课程管理",
		"url": "/app/basic/course",
		"description": "建设中..."
	}, {
		"icon": "class",
		"name": "年级管理",
		"url": "/app/basic/grades",
		"description": "建设中..."
	}, {
		"icon": "class",
		"name": "班级管理",
		"url": "/app/basic/classes",
		"description": "建设中..."
	}, {
		"icon": "class",
		"name": "密码管理",
		"url": "/app/basic/password",
		"description": "建设中..."
	}]
}, {
	"id": "resource",
	"name": "资源管理",
	"children": [{
		"icon": "school",
		"name": "智慧云网盘",
		"url": "/app/resource/index",
		"description": "建设中..."
	}, {
		"icon": "school",
		"name": "我的资源",
		"url": "/app/resource/mine",
		"description": "建设中..."
	}, {
		"icon": "school",
		"name": "资源审核",
		"url": "/app/resource/review",
		"description": "建设中..."
	}]
}, {
	"id": "resource",
	"name": "资产管理",
	"children": [{
		"icon": "school",
		"name": "资产管理",
		"url": "/app/assets/index",
		"description": "建设中..."
	}]
}

]

export const MenuTeacher = [{
	"id": "basic",
	"name": "基础信息管理",
	"children": [
		{
			"icon": "class",
			"name": "个人中心",
			"url": "/app/basic/personal",
			"description": "建设中..."
		}, {
			"icon": "class",
			"name": "密码管理",
			"url": "/app/basic/password",
			"description": "建设中..."
		}]
}, {
	"id": "resource",
	"name": "资源管理",
	"children": [{
		"icon": "school",
		"name": "智慧云网盘",
		"url": "/app/resource/index",
		"description": "建设中..."
	}, {
		"icon": "school",
		"name": "我的资源",
		"url": "/app/resource/mine",
		"description": "建设中..."
	}]
}]

export const MenuSuper = [{
	"id": "basic",
	"name": "基础信息管理",
	"children": [{
		"icon": "class",
		"name": "个人中心",
		"url": "/app/basic/personal",
		"description": "建设中..."
	}, {
		"icon": "school",
		"name": "教职工信息",
		"url": "/app/basic/staffs",
		"description": "建设中..."
	}, {
		"icon": "school",
		"name": "学校管理",
		"url": "/app/basic/schools",
		"description": "建设中..."
	}, {
		"icon": "class",
		"name": "密码管理",
		"url": "/app/basic/password",
		"description": "建设中..."
	}]
}, {
	"id": "resource",
	"name": "资源管理",
	"children": [{
		"icon": "school",
		"name": "智慧云网盘",
		"url": "/app/resource/index",
		"description": "建设中..."
	}, {
		"icon": "school",
		"name": "我的资源",
		"url": "/app/resource/mine",
		"description": "建设中..."
	}, {
		"icon": "school",
		"name": "资源审核",
		"url": "/app/resource/review",
		"description": "建设中..."
	}]
}, {
	"id": "resource",
	"name": "资产管理",
	"children": [{
		"icon": "school",
		"name": "资产管理",
		"url": "/app/assets/index",
		"description": "建设中..."
	}]
}, {
	"id": "shedule",
	"name": "排课系统",
	"children": [{
		"icon": "school",
		"name": "走班排课",
		"url": "",
		"description": "建设中..."
	}]
}

]
