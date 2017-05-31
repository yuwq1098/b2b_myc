import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const colloct_car = r => require.ensure([], () => r(require('../page/colloct/colloct')), 'collect')
const car_details = r => require.ensure([], () => r(require('../page/car/car-details')), 'carDetails')


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
            path: '/colloct',
            component: colloct_car,
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