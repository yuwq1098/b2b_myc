import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const buy_car_list = r => require.ensure([], () => r(require('../page/buy/car_list')), 'buyCarList')
const car_details = r => require.ensure([], () => r(require('../page/car/car-details')), 'carDetails')
const sellCar = r => require.ensure([], () => r(require('../page/sell/sellCar')), 'sellCar')
const paymentIndex = r => require.ensure([], () => r(require('../page/payment/payment.vue')), 'paymentIndex')

const member = r => require.ensure([], () => r(require('../page/member/member')), 'member')
const odrder_buyCar = r => require.ensure([], () => r(require('../page/member/order/order_buy.vue')), 'buyCarOrder')
const odrder_sellCar = r => require.ensure([], () => r(require('../page/member/order/order_sell.vue')), 'buyCarOrder')
const collect_car = r => require.ensure([], () => r(require('../page/member/collect/car.vue')), 'collectCar')
const collect_merchant = r => require.ensure([], () => r(require('../page/member/collect/merchant.vue')), 'collectMerchant')



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
            path: '/payment',
            component: paymentIndex,
            meta: { }
        },
        {
            path: '/member',
            component: member,
            meta: { },
            children: [
                {
                    path: 'order',
                    redirect: 'order/buyCar'
                },
                {
                    path: 'order/buyCar',
                    component: odrder_buyCar,
                    meta: { },
                },
                {
                    path: 'order/sellCar',
                    component: odrder_sellCar,
                    meta: { },
                },
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
	]
}]