import App from '../App'

//b2b主页
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
//我要买车
const buy_car_list = r => require.ensure([], () => r(require('../page/buy/car_list')), 'buyCarList')
//车辆详情
const car_details = r => require.ensure([], () => r(require('../page/car/car-details')), 'carDetails')
//我要卖车
const sellCar = r => require.ensure([], () => r(require('../page/sell/sellCar')), 'sellCar')
//支付主页
const paymentIndex = r => require.ensure([], () => r(require('../page/payment/payment.vue')), 'paymentIndex')
//创建订单
const pay_create = r => require.ensure([], () => r(require('../page/payment/create.vue')), 'payCreate')
//签订合同
const pay_contract = r => require.ensure([], () => r(require('../page/payment/contract.vue')), 'payContract')
//支付定金
const pay_deposit = r => require.ensure([], () => r(require('../page/payment/deposit.vue')), 'payDeposit')
//过户完毕
const pay_success = r => require.ensure([], () => r(require('../page/payment/transfer_success.vue')), 'paySuccess')

//会员中心首页
const member = r => require.ensure([], () => r(require('../page/member/member')), 'member')
//买车订单
const order_buyCar = r => require.ensure([], () => r(require('../page/member/order/order_buy.vue')), 'buyCarOrder')
//卖车订单
const order_sellCar = r => require.ensure([], () => r(require('../page/member/order/order_sell.vue')), 'buyCarOrder')
//退款维权
const order_refund = r => require.ensure([], () => r(require('../page/member/order/order_refund.vue')), 'orderRefund')
//收藏车辆
const collect_car = r => require.ensure([], () => r(require('../page/member/collect/car.vue')), 'collectCar')
//收藏商家
const collect_merchant = r => require.ensure([], () => r(require('../page/member/collect/merchant.vue')), 'collectMerchant')

// 我的钱包
const my_wallet = r => require.ensure([], () => r(require('../page/member/money/wallet.vue')), 'myWallet')
// 账单详情
const bill_details = r => require.ensure([], () => r(require('../page/member/money/bill_details.vue')), 'billDetails')

//车源管理
const car_manage = r => require.ensure([], () => r(require('../page/member/manage/manage.vue')),'carManage')

//修改绑定的手机号
const upd_tel = r => require.ensure([], () => r(require('../page/member/setting/upd_tel.vue')), 'modifyPhone')
//修改密码
const upd_pwd = r => require.ensure([], () => r(require('../page/member/setting/upd_pwd.vue')), 'modifyPassword')
//使用帮助
const s_help = r => require.ensure([], () => r(require('../page/member/setting/s_help.vue')), 'setHelp')


// 轮播测试
const t_swiper_demo = r => require.ensure([], () => r(require('../page/test/swiper-demo')), 'swiperDemo')



// 定义路由
export default[{
	path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转hello页面
        {
            path: '',
            redirect: '/home'
        },
	    {
		    path: '/home',
		    component: home,
            meta: {
                isGoTop: true,
            }
	    },
        {
            path: '/buyCar',
            component: buy_car_list,
            meta: { }
        },
        {
            path: '/sellCar',
            component: sellCar,
            meta: { }
        },
        {
            path: '/pay',
            component: paymentIndex,
            redirect:'/pay/create',
            children: [
                {
                    //创建订单
                    path: 'create',
                    component: pay_create,
                    meta: {
                        step: 1,
                    },
                },
                {
                    //签订合同
                    path: 'contract',
                    component: pay_contract,
                    meta: {
                        step: 2,
                    },
                },
                {
                    //支付定金
                    path: 'deposit',
                    component: pay_deposit,
                    meta: {
                        step: 3,
                    },
                },
                {
                    //过户成功
                    path: 'success',
                    component: pay_success,
                    meta: {
                        step: 4,
                    },
                },
            ],
        },
        {
            //会员中心
            path: '/member',
            component: member,
            meta: { },
            children: [
                //订单中心
                {
                    path: 'order',
                    redirect: 'order/buyCar'
                },
                {
                    path: 'order/buyCar',
                    component: order_buyCar,
                    meta: { },
                },
                {
                    path: 'order/sellCar',
                    component: order_sellCar,
                    meta: { },
                },
                {
                    path: 'order/refund',
                    component: order_refund,
                    meta: { },
                },
                //我的收藏
                {
                    path: 'collect',
                    redirect: 'collect/car'
                },
                {
                    path: 'collect/car',
                    component: collect_car,
                    meta: { },
                },
                {
                    path: 'collect/merchant',
                    component: collect_merchant,
                    meta: { },
                },
                //我的钱包
                {
                    path: 'wallet/myWallet',
                    component: my_wallet,
                    meta: { },
                },
                {
                    path: 'wallet/bill',
                    component: bill_details,
                    meta: { },
                },
                //车源管理
                {
                    path: 'manage',
                    component: car_manage,
                    meta: { },
                },
                //设置
                {
                    path: 'setting/phone',
                    component: upd_tel,
                    meta: { },
                },
                {
                    path: 'setting/password',
                    component: upd_pwd,
                    meta: { },
                },
                {
                    path: 'setting/help',
                    component: s_help,
                    meta: { },
                },
            ]
        },
        {
            path: '/order',
            component: member,
            meta: { }
        },
        {
            path: '/carDetails',
            component: car_details,
            meta: {
                isGoTop: true,
            }
        },

        {
            path: '/test/swiper',
            component: t_swiper_demo,
            meta: {}
        },
	]
}]