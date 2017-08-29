
/** 
* @description 网站外层面包屑列表本地化资源 
* @creatDate 2017-6-28
* @author Geek.Yu  email:1098654043@qq.com
*/ 

// 面包屑信息
export const crumbsInfo = {

    // b2b大厅
    'b2bHall':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'二手车交易大厅',
            path:'',
        },
    ],
    // b2b车辆详情
    'b2bCar':function(name){
        return [
            {
                title:'首页',
                path:'/',
            },
            {
                title:'二手车交易大厅',
                path:'/b2bHall',
            },
            {
                title:name,
                path:'',
            },
        ]
    },
    // 我的购物车
    'shoppingCart':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'二手车交易大厅',
            path:'/b2bHall',
        },
        {
            title:'购物车',
            path:'',
        },
    ],
    // 卖车大厅
    'sellHome':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'卖车大厅',
            path:'',
        },
    ],
    // 发布新车
    'sendCar':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'卖车大厅',
            path:'/sellHome',
        },
        {
            title:'发布新车',
            path:'',
        },
    ],

    // 我们是谁
    'who':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'关于我们',
            path:'/about',
        },
        {
            title:'我们是谁',
            path:'',
        },
    ],

    // 我们做啥
    'what':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'关于我们',
            path:'/about',
        },
        {
            title:'我们做啥',
            path:'',
        },
    ],

    // 联系我们
    'contact':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'关于我们',
            path:'/about',
        },
        {
            title:'联系我们',
            path:'',
        },
    ],

    // 意见反馈
    'feedback':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'关于我们',
            path:'/about',
        },
        {
            title:'意见反馈',
            path:'',
        },
    ],

    // 友情链接
    'partner':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'关于我们',
            path:'/about',
        },
        {
            title:'友情链接',
            path:'',
        },
    ],

    // 招贤纳士
    'recruit':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'关于我们',
            path:'/about',
        },
        {
            title:'招贤纳士',
            path:'',
        },
    ],

    // 视频帮助页
    'practice':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'帮助中心',
            path:'/helpCenter',
        },
        {
            title:'视频教程（帮助）',
            path:'',
        },
    ],

    // 常见问题
    'FAQ':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'帮助中心',
            path:'/helpCenter',
        },
        {
            title:'常见问题',
            path:'',
        },
    ],

    // B2B交易规则
    'dealFlow':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'帮助中心',
            path:'/helpCenter',
        },
        {
            title:'B2B交易规则',
            path:'',
        },
    ],

    // 流程及认证审批
    'applyFlow':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'帮助中心',
            path:'/helpCenter',
        },
        {
            title:'流程及认证审批',
            path:'',
        },
    ],

    // 隐私保护承诺
    'privacy':[
        {
            title:'首页',
            path:'/',
        },
        {
            title:'帮助中心',
            path:'/helpCenter',
        },
        {
            title:'隐私保护承诺',
            path:'',
        },
    ],

    // 车商详情页
    'merchantInfoDetails':function(name){
        return [
            {
                title:'首页',
                path:'/',
            },
            {
                title:name,
                path:'',
            },
        ]
    },

}
