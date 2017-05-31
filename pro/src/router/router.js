import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const colloct_car = r => require.ensure([], () => r(require('../page/colloct/colloct')), 'collect')
const car_details = r => require.ensure([], () => r(require('../page/car/car-details')), 'carDetails')


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