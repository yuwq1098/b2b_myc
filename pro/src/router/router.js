import App from '../App'


// 网站首页
const index = r => require.ensure([], () => r(require('page/home')), 'index')
// b2b大厅(买车)
const b2bHall = r => require.ensure([], () => r(require('page/buy/b2bHall')), 'b2bHall')
// 卖车大厅
const sell = r => require.ensure([], () => r(require('page/sell/sell.vue')), 'sell')
// 发布车辆订单填写页
const sendCar = r => require.ensure([], () => r(require('page/sell/sendCar.vue')), 'sendCar')
// 木有车服务
const service = r => require.ensure([], () => r(require('page/service/service.vue')), 'service')
// 使用帮助
const usinghelp = r => require.ensure([], () => r(require('page/help')), 'usinghelp')
// 关于股东
const partner = r => require.ensure([], () => r(require('page/partner/partner.vue')), 'usinghelp')


// b2b车辆详情
const b2bCarDetails = r => require.ensure([], () => r(require('page/car-details/b2bCar.vue')), 'b2bCarDetails')
// b2c车辆详情
const b2cCarDetails = r => require.ensure([], () => r(require('page/car-details/b2cCar.vue')), 'b2cCarDetails')


// 会员中心
const member = r => require.ensure([], () => r(require('page/member/member')), 'member')
// 会员中心首页（大概的包括各种信息）
const memberHome = r => require.ensure([], () => r(require('page/member/home')), 'memberHome')


// 用户中心 => 车行认证
const authApply = r => require.ensure([], () => r(require('page/member/center/apply')), 'authApply')
// 用户中心 => 我的购物车
const shoppingCart = r => require.ensure([], () => r(require('page/member/center/shopping-cart')), 'shoppingCart')


// 买车订单
const buyOrder = r => require.ensure([], () => r(require('page/member/order/buy')), 'buyOrder')
// 卖车订单
const sellOrder = r => require.ensure([], () => r(require('page/member/order/sell')), 'sellOrder')


// 车源管理 => 我的车源
const mySource = r => require.ensure([], () => r(require('page/member/car-source/manage')), 'mySource')


// 我的钱包 => 钱包主页
const walletHome = r => require.ensure([], () => r(require('page/member/wallet/home')), 'walletHome')


// 我的收藏 => 车辆收藏                                     
const carCollect = r => require.ensure([], () => r(require('page/member/collect/car/index')), 'carCollect')
// 我的收藏 => 车商收藏
const merchantCollect = r => require.ensure([], () => r(require('page/member/collect/merchant/index')), 'merchantCollect')


// 账户设置 => 个人资料设置
const personalSetting = r => require.ensure([], () => r(require('page/member/setting/personal')), 'personalSetting')
// 账户设置 => 安全中心
const safetySetting = r => require.ensure([], () => r(require('page/member/setting/safety')), 'safetySetting')


// 定义路由
export default[{
    path: '/',
    component: App,                     // 顶层路由，对应index.html
    children: [                         // 二级路由，对应App.vue
        {             
        // 页面为空时跳转至首页
            path: '',
            redirect: '/home'           // 页面重定向
        },
        {   
        // 首页
            path: '/index',
            component: index,
            alias: '/home',             // 使用别名
            meta: {
                notGoTop: true,
            }
        },
        {   
        // b2b大厅(买车)
            path: '/b2bHall',
            component: b2bHall,
            meta: { }
        },
        {
        // b2b车辆详情
            path: '/b2bCarDetails',
            component: b2bCarDetails,
            alias: '/b2bCar',           // 使用别名
            meta: { }    
        },
        {
        // b2c车辆详情
            path: '/b2bCarDetails',
            component: b2bCarDetails,
            alias: '/b2cCar',           // 使用别名
            meta: { }    
        },
        {   
        // 卖车大厅
            path: '/sell',
            component: sell,
            alias: '/sellHome',         // 使用别名
            meta: { }
        },
        {
        // 发布车辆订单填写页
            path: '/sendCar',
            component: sendCar,
            alias: '/sellSend',         // 使用别名
            meta: { }
        },
        {
        // 木有车服务
            path: '/service',
            component: service,
            alias: '/siteServer',       // 使用别名
            meta: { }
        },
        {
        // 帮助手册
            path: '/usinghelp',
            component: usinghelp,
            alias: '/helpHome',         // 使用别名
            meta: { }
        },
        {
        // 关于股东
            path: '/partner',
            component: partner,
            meta: { }
        },
        {
        // 会员中心
            path: '/member',
            component: member,
            redirect: '/member/home',
            meta: {
                requireAuth: true,              // 添加该字段，表示进入这个路由是需要登录的
            },
            children: [
                {
                // 会员主页
                    path: 'home',
                    component: memberHome,
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                // 车行认证
                    path: 'apply',
                    component: authApply,
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                // 我的购物车
                    path: 'shopCart',
                    component: shoppingCart,
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                // 买车订单
                    path: 'buyOrder',
                    component: buyOrder,
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                // 卖车订单
                    path: 'sellOrder',
                    component: sellOrder,
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                // 我的车源
                    path: 'car-source',
                    component: mySource,
                    alias: 'sourceHome',        // 使用别名
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                // 我的钱包主页
                    
                    path: 'wallet-home',
                    component: walletHome,
                    alias: 'wallet',            // 使用别名
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                // 车辆收藏
                    path: 'collect-car',
                    component: carCollect,
                    alias: 'collectCar',        // 使用别名
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                // 车行收藏
                    path: 'merchant-car',
                    component: merchantCollect,
                    alias: 'merchantCar',       // 使用别名
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                // 个人资料设置
                    path: 'personal',
                    component: personalSetting,
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                // 安全中心
                    path: 'safety',
                    component: safetySetting,
                    meta:{
                        requireAuth: true,      // 添加该字段，表示进入这个路由是需要登录的
                    },
                }
            ]
        }
    ],

}]