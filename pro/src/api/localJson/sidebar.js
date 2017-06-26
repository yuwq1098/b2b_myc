/** 
* @description 会员中心侧边栏导航信息 
* @creatDate 2017-6-26
* @author Geek.Yu  email:1098654043@qq.com
*/ 

//侧边导航信息
export const sidebarMenu = [
    {
        'title': '个人中心',
        'hash': '',
        'icon': 'icon-huiyuan',
        'children': [
            {
            	'title': '车行认证',
	        	'hash': '',
            },
            {
            	'title': '我的购物车',
	        	'hash': '',
            },
        ]
    },
    {
        'title': '我的订单',
        'hash': '',
        'icon': 'icon-asmkticon0126',
        'children': [
            {
            	'title': '买车订单',
	        	'hash': '',
            },
            {
            	'title': '卖车订单',
	        	'hash': '',
            },
        ]
    },
    {
        'title': '车源管理',
        'hash': '',
        'icon': 'icon-yuan',
        'children': [
            {
            	'title': '我的车源',
	        	'hash': '',
            },
        ]
    },
    {
        'title': '我的钱包',
        'hash': '',
        'icon': 'icon-qianbao',
        'children': [
            {
            	'title': '现金账户',
	        	'hash': '',
            },
        ]
    },
    {
        'title': '我的收藏',
        'hash': '',
        'icon': 'icon-wodeshoucang',
        'children': [
            {
            	'title': '车辆收藏',
	        	'hash': '/member/collect/car',
            },
            {
            	'title': '车行收藏',
	        	'hash': '/member/collect/merchant',
            },
        ]
    },
    {
        'title': '账户设置',
        'hash': '',
        'icon': 'icon-shezhi',
        'children': [
            {
            	'title': '完善个人资料',
	        	'hash': '',
            },
            {
            	'title': '安全中心',
	        	'hash': '',
            },
        ]
    },

]