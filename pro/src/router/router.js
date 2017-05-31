import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const buy_car_list = r => require.ensure([], () => r(require('../page/buy/car_list')), 'buyCarList')
const car_details = r => require.ensure([], () => r(require('../page/car/car-details')), 'carDetails')
const sellCar = r => require.ensure([], () => r(require('../page/sell/sellCar')), 'sellCar')
const member = r => require.ensure([], () => r(require('../page/member/member')), 'member')


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
            path: '/member',
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