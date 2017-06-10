import axios from 'axios'
import qs from 'qs'
import {joinUrl,dataToJson} from 'assets/js/util.js'
import {store} from 'assets/js/store.js'; 
import {md5} from 'assets/js/md5.js';

//headers字段
let [timestamp,token,secret]=[
        ((+new Date())/1000).toFixed(0),
        store.get('AccessToken'),
        store.get('AccessSecret'),      
    ];
let sign=md5(timestamp+token+secret);

//更新headers字段
const updataSign=function(){
    [timestamp,token,secret]=[
        ((+new Date())/1000).toFixed(0),
        store.get('AccessToken'),
        store.get('AccessSecret'),      
    ];
    sign=md5(timestamp+token+secret);
};

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'https://www.muyouche.com/';
// axios.defaults.baseURL = 'http://localhost:8080';


// http request 拦截器
axios.interceptors.request.use(
    config => {
        // updataSign();
        // if (token&&secret) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers = {timestamp:timestamp,token:token,sign:sign};
        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    });



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

// 自定义请求数据方法(post请求)
export function fetchSign(url, params) {
    return new Promise((resolve, reject) => {
        let newUrl = joinUrl(url);
        updataSign();
        const config = {
            headers: {timestamp:timestamp,token:token,sign:sign},
        }
        axios.post(newUrl, params,config)
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
        return fetch('/action2/B2BCarList.ashx', dataToJson(params))
    },
    //根据车辆id获取车辆详情信息
    getCarDetalis(params){
        return fetch('/action2/B2BCarDetail.ashx', dataToJson(params))
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

    //获取我的我的个人信息
    getMyMemberInfo(params){
        return fetchSign('/action2/MyMemberInfo.ashx',dataToJson(params));
    },
    
    /*getMyMemberInfo(params){
        const url = joinUrl("/action2/MyMemberInfo.ashx");
        updataSign();
        const data = dataToJson(params);
        const config = {
            headers: {timestamp:timestamp,token:token,sign:sign},
        }
        return axios.post(url, data, config).then((res) => {
            return Promise.resolve(res.data)
        })

        // return fetch('/action2/MyMemberInfo.ashx',dataToJson(params));
    },*/
}
