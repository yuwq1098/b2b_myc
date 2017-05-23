import App from '../App'

const Hello = r => require.ensure([], () => r(require('../components/Hello.vue')), 'hello')


// 定义路由
export default[{
	path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转hello页面
        {
            path: '',
            redirect: '/hello'
        },
	    {
		    path: '/hello',
		    component: Hello
	    }
	]
}]