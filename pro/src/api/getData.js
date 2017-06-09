import axios from 'axios'
import qs from 'qs'
import {joinUrl} from 'assets/js/util.js'



// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'https://www.muyouche.com/';
// axios.defaults.baseURL = 'http://localhost:8080';

//POST传参序列化
// axios.interceptors.request.use((config) => {
//     if(config.method  === 'post'){
//         config.data = qs.stringify(config.data);
//     }
//     return config;
// });


// 自定义请求数据方法(post请求)
export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        let newUrl = joinUrl(url);
        axios.post(newUrl, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

// 自定义拉取数据方法(get请求)
export function get(url) {
    return new Promise((resolve, reject) => {
        let newUrl = joinUrl(url);
        axios.get(newUrl)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * 创建临时数据
 */
const setpromise = data => {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}

export default {
    //获取所有城市
    getAllCityList(){
        return get('/action2/AllCity.ashx');
    },
    //获取所有车辆(JSON提交方式)
    getB2BCarList(params){
        return fetch('/action2/B2BCarList.ashx', JSON.stringify(params))
    },

    //用户登录||(FormData提交方式[qs转换])
    Login(params){
        return fetch('/action2/UserLogin.ashx', qs.stringify(params))
    },

    //获取车辆品牌
    getCarBrand(){
        return get('/action2/CarBrand.ashx');
    },
    //根据品牌获取车系
    getCarSeriesByBrand(params){
        return fetch('/action2/CarSeries.ashx',params);
    },
}
