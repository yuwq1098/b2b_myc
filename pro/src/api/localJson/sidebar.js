/** 
* @description 会员中心侧边栏导航信息 
* @creatDate 2017-6-26
* @author Geek.Yu  email:1098654043@qq.com
*/ 

//侧边导航信息
export const sidebarMenu = [
    {
        'title': '会员中心',
        'hash': '',
        'icon': 'icon-huiyuan',
        'children': [
            {
                'title': '我的主页',
                'hash': '/member/home',
            },
            {
            	'title': '车商认证',
	        	'hash': '/member/applyHome',
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
	        	'hash': '/member/buyOrder',
            },
            {
                'title': '买车仲裁维权',
                'hash': '/member/buyArbitrateList',
            },
            {
            	'title': '卖车订单',
	        	'hash': '/member/sellOrder',
            },
            {
                'title': '卖车仲裁维权',
                'hash': '/member/sellArbitrateList',
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
	        	'hash': '/member/sourceHome',
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
	        	'hash': '/member/wallet',
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
	        	'hash': '/member/collectCar',
            },
            {
            	'title': '车商收藏',
	        	'hash': '/member/merchantCar',
            },
        ]
    },
    {
        'title': '账户设置',
        'hash': '',
        'icon': 'icon-shezhi',
        'children': [
            {
            	'title': '个人资料设置',
	        	'hash': '/member/personal',
            },
            // {
            //     'title': '绑定银行卡',
            //     'hash': '/member/cardManage',
            // },
            {
            	'title': '安全中心',
	        	'hash': '/member/safetyCenter',
            },
        ]
    },

]