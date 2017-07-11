
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
            title:'二手车B2B大厅',
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
                title:'二手车B2B大厅',
                path:'/b2bHall',
            },
            {
                title:name,
                path:'',
            },
        ]
    },
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
    ]
}
