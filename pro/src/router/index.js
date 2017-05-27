import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/index')), 'home')
const collect_car = r => require.ensure([], () => r(require('../page/collect/index')), 'collect')

const elm_ix = r => require.ensure([], () => r(require('../element/index')), 'elm_ix')
const elm_test = r => require.ensure([], () => r(require('../element/test')), 'elm_test')
const elm_daterange = r => require.ensure([], () => r(require('../element/daterange')), 'elm_daterange')
const elm_upload = r => require.ensure([], () => r(require('../element/upload')), 'elm_upload')



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
		    component: home
	    },
        {
            path: '/collect',
            component: collect_car
        },
        {
            path: '/elm',
            component: elm_ix,
            redirect: "/elm/test",
            children: [{
                path: 'test',
                component: elm_test
            },{
                path: 'daterange',
                component: elm_daterange
            },{
                path: 'upload',
                component: elm_upload
            }]
        }
	]
}]