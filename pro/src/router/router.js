import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const buy_car_list = r => require.ensure([], () => r(require('../page/buy/car_list')), 'buyCarList')
const car_details = r => require.ensure([], () => r(require('../page/car/car-details')), 'carDetails')
const sellCar = r => require.ensure([], () => r(require('../page/sell/sellCar')), 'sellCar')

// ����·��
export default[{
	path: '/',
    component: App, //����·�ɣ���Ӧindex.html
    children: [ //����·�ɡ���ӦApp.vue
        //��ַΪ��ʱ��תhelloҳ��
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
            path: '/carDetails',
            component: car_details,
            meta: {
                isGoTop: true,
            }
        },
	]
}]