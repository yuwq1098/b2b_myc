import axios from 'axios'
import qs from 'qs'
import {joinUrl,dataToJson,strToJson} from 'assets/js/util.js'
import {store} from 'assets/js/store.js'; 
import {md5} from 'assets/js/md5.js';


//获取headers签名字段
const getSignHeaders=function(){
    let [timestamp,token,secret,sign] = [null,null,null,null];
    if(store.get('loginInfo')){
        [timestamp,token,secret]=[
            ((+new Date())/1000).toFixed(0),
            strToJson(store.get('loginInfo')).AccessToken,
            strToJson(store.get('loginInfo')).AccessSecret,      
        ];
        sign=md5(timestamp+token+secret);
    }
    return [timestamp,token,secret,sign]
};
let [timestamp,token,secret,sign] = getSignHeaders();


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
        let [timestamp,token,secret,sign] = getSignHeaders();
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
    
    //获取热门车辆品牌
    getHotBrand(params){
        return fetch('/action2/HotCarBrand.ashx',dataToJson(params));
    },

    //根据品牌获取车系
    getCarSeriesByBrand(id){
        let params = {
            brandid: id,
        }
        return fetch('/action2/CarSeries.ashx',params);
    },

    //根据车系获取车型
    getCarModel(id){
        let params = {
            seriesid: id,
        }
        return fetch('/action2/CarModel.ashx',params);
    },

    //获取所有省份
    getAllProvince(){
        return get('/action2/AllProvince.ashx');
    },

    //获取省份的城市
    getCityForProvince(code){
        let params = {
            proCode: code,
        }
        return fetch('/action2/CityForProvince.ashx', qs.stringify(params));
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


    /*
     * 验证注册类
     */


    // 获取图形验证码
    getImgRandomCode(){
        let timestamp = (+new Date()).valueOf();
        let url = '/action2/ImgRandomCode.ashx'+'?FS=18&a='+timestamp;
        return get(url)
    },

    // 获取手机验证码(语音或者短信)
    getSMSCode(params){
        return fetchSign('/action2/GetSMSCode.ashx',dataToJson(params));
    },

    // 验证手机号是否重复
    checkMobileCanReg(params){
        return fetchSign('/action2/CheckMobileCanReg.ashx',dataToJson(params));
    },

    // 注册
    register(params){
        return fetchSign('/action2/RegUser.ashx',dataToJson(params));
    },


    /*
     * 个人中心
     */

    
    // 修改个人信息
    editMemberInfo(params){
        return fetchSign('/action2/MemberInfoEdit.ashx',dataToJson(params));
    },

    // 银行卡管理
    manageBankCard(params){
        return fetchSign('/action2/BankCardMng.ashx',dataToJson(params));
    },

    // 修改密码
    editPassword(params){
        return fetchSign('/action2/EditPassword.ashx',dataToJson(params));
    },

    // 忘记密码（找回密码）
    forgotPassword(params){
        return fetchSign('/action2/ForgotPassword.ashx',dataToJson(params));
    },

    // 更绑手机号
    editMobile(params){
        return fetchSign('/action2/ReplaceMobile.ashx',dataToJson(params));
    },
    
    // 忘记支付密码
    forgetPayPass(params){
        return fetchSign('/action2/EditPayPassword.ashx',dataToJson(params));
    },

    // 设置支付密码
    setPayPass(params){
        return fetchSign('/action2/SetPayPassword.ashx',dataToJson(params));
    },

    // 修改支付密码
    editPayPass(params){
        return fetchSign('/action2/ForgotPasswordByOrg.ashx',dataToJson(params));
    },
    

    /*
     * 收藏夹
     */
    

    // 操作收藏的车辆
    myFavoriteCar(params){
        return fetchSign('/action2/FavoriteB2BCar.ashx',dataToJson(params));
    },

    // 操作收藏的车行
    myFavoriteCdg(params){
        return fetchSign('/action2/FavoriteCdg.ashx',dataToJson(params));
    },



    /*
     * 认证类
     */


    // 获取认证详情信息
    getAuthDetails(params){
        return fetchSign('/action2/AuthDetail.ashx',dataToJson(params));
    },

    // 车行认证
    authApply(params){
        return fetchSign('/action2/B2BAuthApply.ashx',dataToJson(params));
    },
    

    /*
     * 支付、交易、金额类
     */


    // 各类金额流水账单
    getBillList(params){
        return fetchSign('/action2/MyB2BCreditPoint.ashx',dataToJson(params));
    },

    // 账单交易详情页
    getBillDetails(params){
        return fetchSign('/action2/TradeDetail.ashx',dataToJson(params));
    },
    
    // 我的账户余额 
    getUserAccount(params){
        return fetchSign('/action2/UserAccount.ashx',dataToJson(params));
    },


    /*
     * B2B核心业务
     */


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

    //删除、下架、上架 车辆
    operateB2BCar(params){
        return fetchSign('/action2/OperateB2BCar.ashx',dataToJson(params));
    },
    
    //我的车源信息(状态混乱)
    getMyB2BCarMobile(params){
        return fetchSign('/action2/MyB2BCar.ashx',dataToJson(params));
    },

    //我的车源信息(PC)
    getMyB2BCar(params){
        return fetchSign('/action2/MyB2BCarPC.ashx',dataToJson(params));
    },

    //B2B车辆大厅列表
    getB2BCarList(params){
        return fetchSign('/action2/B2BCarList.ashx', dataToJson(params))
    },

    //B2B车辆大厅列表详情
    getCarDetalis(params){
        return fetchSign('/action2/B2BCarDetail.ashx', dataToJson(params))
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
    },

    // 管理我的购物车
    manageShoppingCart(params){
        return fetchSign('/action2/ShoppingCartMng.ashx', dataToJson(params))
    },

    // 平台交易历史记录
    tradeHistory(params){
        return fetchSign('/action2/B2BOrderHistory.ashx', dataToJson(params))
    },

    // 车行详情页
    CDGStoreDetails(params){
        return fetchSign('/action2/CDGStore.ashx', dataToJson(params))
    },


    /*
     * 首页相关
     */
    
    // 获取首页信息
    getHomeInfo(){
        return get('/action2/HomePageInfo.ashx')
    },

    // 猜你喜欢
    getGuessYouLike(){
        return get('/action2/GuessYouLike.ashx')
    },
    
    // 相似推荐
    getSimilarRecommend(params){
        return fetchSign('/action2/SimilarRecommend.ashx', dataToJson(params))
    },

}
