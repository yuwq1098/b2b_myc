import axios from 'axios'
import qs from 'qs'
import {joinUrl,dataToJson} from 'assets/js/util.js'
import {store} from 'assets/js/store.js'; 
import {md5} from 'assets/js/md5.js';

let [timestamp,token,secret,sign] = [null,null,null,null]
//获取headers签名字段
const getSignHeaders=function(){
    if(store.get('loginInfo')){
        [timestamp,token,secret]=[
            ((+new Date())/1000).toFixed(0),
            store.get('loginInfo').AccessToken,
            store.get('loginInfo').AccessSecret,      
        ];
        sign=md5(timestamp+token+secret);
    }
};
//初次加载先获取一次headers签名字段
getSignHeaders();

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'https://www.muyouche.com/';
// axios.defaults.baseURL = 'http://localhost:8080';


// http request 拦截器
axios.interceptors.request.use(
    config => {
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
        getSignHeaders();
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
    
    //用户登录||(FormData提交方式[qs转换])
    Login(params){
        return fetch('/action2/UserLogin.ashx', qs.stringify(params))
    },

    //获取验证码
    getImgRandomCode(){
        let timestamp = (+new Date()).valueOf();
        let data = {
            a: timestamp
        }
        return get('/action2/ImgRandomCode.ashx', data)
    },

    //上传隐私类图片
    uploadImg(params){
        return fetchSign('/action2/UploadPrivateFile.ashx', qs.stringify(params))
    },
    
    //上传隐私类图片base64
    uploadPrivateFileBase64(params){
        return fetchSign('/action2/UploadPrivateFileBase64.ashx', qs.stringify(params))
    },
    
    //上传开放类资源
    uploadPublicFile(params){
        return fetchSign('/action2/UploadPublicFile.ashx', qs.stringify(params))
    },

    //上传开放类资源base64
    uploadPublicFileBatch(params){
        return fetchSign('/action2/UploadPublicFileBase64.ashx', qs.stringify(params))
    },

    //车行认证
    B2BAuthApply(params){
        return fetchSign('/action2/B2BAuthApply.ashx',dataToJson(params))
    },
    
    //获取车辆品牌
    getCarBrand(){
        return get('/action2/CarBrand.ashx');
    },

    //根据品牌获取车系
    getCarSeriesByBrand(id){
        let params = {
            brandid: id,
        }
        return fetch('/action2/CarSeries.ashx',params);
    },

    //根据车系获取车型
    getCarModel(params){
        return fetch('/action2/CarModel.ashx',params);
    },

    //获取所有省份
    getAllProvince(){
        return get('/action2/AllProvince.ashx');
    },

    //获取省份的城市
    getCityForProvince(params){
        return get('/action2/CityForProvince.ashx', qs.stringify(params));
    },

    //获取所有城市
    getAllCityList(){
        return get('/action2/AllCity.ashx');
    },
    
    //保存订阅信息
    subscribeCarBrand(params){
        return fetchSign('/action2/SubscribeCarBrand.ashx',dataToJson(params));
    },

    //获取个人订阅列表
    mySubscribeCarBrand(params){
        return fetchSign('/action2/MySubscribeCarBrand.ashx',dataToJson(params));
    },

    //删除订阅
    deleteSubscribeCarBrand(params){
        return fetchSign('/action2/deleteSubscribeCarBrand.ashx',dataToJson(params));
    },
    
    //获取我的我的个人信息
    getMyMemberInfo(params){
        return fetchSign('/action2/MyMemberInfo.ashx',dataToJson(params));
    },

    //获取所有车辆颜色
    getAllCarColor(){
        return get('/action2/AllCarColor.ashx')
    },

    //支付信誉保证金
    payB2BCreditPoint(params){
        return fetchSign('/action2/payB2BCreditPoint.ashx',dataToJson(params));
    },
    
    //我的信誉金流水账单
    myB2BCreditPoint(params){
        return fetchSign('/action2/MyB2BCreditPoint.ashx',dataToJson(params));
    },
    
    //发布B2B车辆
    addOrEditB2BCar(params){
        return fetchSign('/action2/AddOrEditB2BCar.ashx',dataToJson(params));
    },

    //删除、下架车辆
    operateB2BCar(params){
        return fetchSign('/action2/OperateB2BCar.ashx',dataToJson(params));
    },
    
    //我的车辆信息
    getMyB2BCar(params){
        return fetchSign('/action2/MyB2BCar.ashx',dataToJson(params));
    },

    //B2B车辆大厅列表
    getB2BCarList(params){
        return fetch('/action2/B2BCarList.ashx', dataToJson(params))
    },

    //B2B车辆大厅列表详情
    getCarDetalis(params){
        return fetch('/action2/B2BCarDetail.ashx', dataToJson(params))
    },
    
    //秒杀立即下单接口
    getAddB2BOrder(params){
        return fetchSign('/action2/B2BCarDetail.ashx', dataToJson(params))
    },

    //B2B订单列表
    getB2BOrder(params){
        return fetchSign('/action2/B2BOrder.ashx', dataToJson(params))
    },

    // B2B订单详情
    getB2BOrderDetail(params){
        return fetchSign('/action2/B2BOrderDetail.ashx', dataToJson(params))
    },

    // B2B卖家签合同
    signContractSeller(params){
        return fetchSign('/action2/signContractSeller.ashx', dataToJson(params))
    },

    // B2B买家签合同
    signContractBuyer(params){
        return fetchSign('/action2/signContractBuyer.ashx', dataToJson(params))
    },

    // 更改订单状态
    changeB2BOrderStatus(params){
        return fetchSign('/action2/ChangeB2BOrderStatus.ashx', dataToJson(params))
    },

    // 获取当前大厅最后几次推送的消息
    lastHallCarList(params){
        return fetchSign('/action2/LastHallCarList.ashx', dataToJson(params))
    }


}
