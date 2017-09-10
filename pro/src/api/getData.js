import axios from 'axios'
import qs from 'qs'
import {joinUrl,dataToJson,strToJson} from 'assets/js/util.js'
import {store} from 'assets/js/store.js'
import cookie from 'assets/js/cookie.js'
import {md5} from 'assets/js/md5.js'


// 引入系统变量
import * as SYSTEM from 'api/system.js'


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
axios.defaults.timeout = 12000;      // 请求超时12s
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'https://www.muyouche.com/';
// axios.defaults.baseURL = 'http://localhost:8080';


// http request 拦截器
axios.interceptors.request.use(
    (config) => {
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

// 自定义请求数据方法(post请求/签名)
export function fetchSign(url, params) {
    return new Promise((resolve, reject) => {
        let newUrl = joinUrl(url);
        let [timestamp,token,secret,sign] = getSignHeaders();
        const config = {
            headers: {timestamp:timestamp,token:token,sign:sign},
        }
        axios.post(newUrl, params,config)
            .then(response => {
                // if(response.config.url.match("/action2/MyMemberInfo.ashx")!=null){
                //     if(response.data.code==SYSTEM.CODE_IS_OUT){
                //         console.log("过期了")
                //     }
                // }
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

// 自定义请求支付(post请求/签名)
export function payFetchSign(url, params) {

    return new Promise((resolve, reject) => {
        let newUrl = joinUrl(url);
        let [timestamp,token,secret,sign] = getSignHeaders();
        
        let Json = params;
        
        // 支付宝支付
        if(Json.payType=='alipay'){ 
            let url = newUrl+'?token='+token+'&timestamp='+timestamp+'&sign='+sign+
                        '&payType='+Json.payType+
                        '&payAmount='+Json.payAmount+
                        '&amountType='+Json.amountType+
                        '&orderId='+Json.orderId;
             
            window.open(url); 
            resolve({code:0});
        }
        
        //微信支付
        if(Json.payType=='wxpay_jsapi'){
            
            var hash = window.location.hash;
            var path = hash.substring(1,hash.indexOf('?')!=-1?hash.indexOf('?'):hash.length);
            let url = 'http://localhost:8080/static/page/o_oWXZF.html'+
                            '?json={"orderId":"'+Json.orderId+
                            '","payAmount":"'+Json.payAmount+
                            '","amountType":"'+Json.amountType+
                            '","origin":"'+window.location.origin+
                            '","path":"'+path+
                            '"}';
            
            getOpenId(url,function(data){
                //console.log(data);
                Json.openid=cookie.get('yydOpenId');
                //console.log(json);
                
                /*微信支付后端集成后数据接口*/
                // $.ajax({
                //     headers:{timestamp:timestamp,token:token,sign:sign},
                //     url:URL+'/action2/pay/payB2BCreditPoint.ashx',     
                //     data:JSON.stringify(Json),
                //     type:'POST',
                //     dataType:'json',
                //     success:function(data1){
                //         //console.log(data1);
                //         if(data1.code==0){
                //             json.appId=data1.data.appId;
                //             json.timeStamp=data1.data.timeStamp;
                //             json.nonceStr=data1.data.nonceStr;
                //             json.package=data1.data.package;
                //             json.signType=data1.data.signType;
                //             json.paySign=data1.data.paySign;
                            
                //             if(json.amountType=='信誉保证金'||json.amountType=='平台余额'){
                //                 json.url=endUrl||'/mo1/?#'+arr[0];
                //             }else{
                //                 json.url=endUrl||'/mo1/?#'+arr[1];
                //             }                                       
                //             WXFZ(json);
                //         }else{
                //             alerts(data1.msg);
                //         }
                //     }
                // });
            }); 
        }

        // 微信扫码支付
        if(Json.payType=='wxpay_native'){ 

            let [timestamp,token,secret,sign] = getSignHeaders();
            const config = {
                headers: {timestamp:timestamp,token:token,sign:sign},
            }
            
            let params = {
                payType: Json.payType,
                payAmount: Json.payAmount,
                amountType: Json.amountType,
                orderId: Json.orderId,
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
        }

        // 余额支付
        if(Json.payType=='balance_pay'){ 

            let [timestamp,token,secret,sign] = getSignHeaders();
            const config = {
                headers: {timestamp:timestamp,token:token,sign:sign},
            }

            let params = {
                PayType: Json.amountType,
                PayPwd: Json.payPass,
                payAmount: Json.payAmount,
                OrderId: Json.orderId,
            }
            
            let newUrl = joinUrl("/action2/BlancePay.ashx");
            
            // 请求充值api接口
            axios.post(newUrl, params,config)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })

        }

        // 农行支付或银联支付
        if(Json.payType=='abc'||Json.payType=='union_pay'){
            let url_bank = newUrl+'?token='+token+'&timestamp='+timestamp+'&sign='+sign+
                                '&payType='+Json.payType+
                                '&payAmount='+Json.payAmount+
                                '&amountType='+Json.amountType+
                                '&orderId='+Json.orderId+
                                '&clientType='+Json.clientType||1;
            window.open(url_bank); 
            resolve({code:0});
        }
    })
}

// 获取微信openId 
export function getOpenId(url,callBack){
        
    //获得微信基本权限的code（无需授权）
    var snsapi_base = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd9b3d678e7ae9181&redirect_uri='+
                        url+'&response_type=code&scope=snsapi_base#wechat_redirect';

    //获得微信最高权限的code（需要授权）
    var snsapi_userinfo = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd9b3d678e7ae9181&redirect_uri='+
                                url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';

    // 如果在本地存储中没有发现openId再进行获取操作
    console.log(cookie.get('yydOpenId'));
    if(cookie.get('yydOpenId')=="undefined"){
        console.log("进来了不,没有openid");
        if(!window.location.href.match('code=')){
            window.location.href=snsapi_base;   
        }else{
            var json={};
            var str=window.location.href;
            
            json.wxcode=strToJson(str.substr(str.indexOf('?')+1,str.length)).code;
            json.appid='wxd9b3d678e7ae9181';
            console.log(json);
            // $.ajax({
            //     url:URL+'/action/GetWXOpenID.ashx',    
            //     data:json,
            //     type:'POST',
            //     dataType:'json',
            //     success:function(data){
            //         if(data.code=='sucess'){
            //             cookie.set('yydOpenId',data.openid);
            //         }
            //         // 如果回调存在，name执行回调
            //         if(callBack) callBack(data);
            //     }
            // });
        }
    }else{
        // 如果回调存在，name执行回调
        callBack&&callBack();
    }            
}

// 微信内置对象封装
export function WXFZ(json,callBall){
    function onBridgeReady(){
       WeixinJSBridge.invoke(
           'getBrandWCPayRequest',{
               "appId":json.appId,                  //公众号名称，由商户传入     
               "timeStamp":json.timeStamp,          //时间戳，自1970年以来的秒数     
               "nonceStr":json.nonceStr,            //随机串     
               "package":json.package,     
               "signType":json.signType,            //微信签名方式：     
               "paySign":json.paySign               //微信签名 
           },
           function(res){ 
                //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
               if(res.err_msg=='get_brand_wcpay_request:ok') {
                    window.location.href=json.url;
               }else{
                    console.log("微信支付失败");
               }
               callBall&&callBall(res);
           }
       ); 
    }
    if(typeof WeixinJSBridge=="undefined"){
       if(document.addEventListener){
           document.addEventListener('WeixinJSBridgeReady',onBridgeReady,false);
       }else if(document.attachEvent){
           document.attachEvent('WeixinJSBridgeReady',onBridgeReady); 
           document.attachEvent('onWeixinJSBridgeReady',onBridgeReady);
       }
    }else{
       onBridgeReady();
    } 
};

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
    
    /*
     * 基础类
     */
    
    // 上传隐私类图片
    uploadImg(params){
        return fetchSign('/action2/UploadPrivateFile.ashx', qs.stringify(params))
    },

    // 批量上传隐私类图片
    uploadPrivateFileBatch(params){
/**/        return fetchSign('/action2/UploadPrivateFileBatch.ashx', qs.stringify(params))
    },
    
    // 上传隐私类图片base64
    uploadPrivateFileBase64(params){
        return fetchSign('/action2/UploadPrivateFileBase64.ashx', qs.stringify(params))
    },
    
    // 上传开放类资源
    uploadPublicFile(params){
        return fetchSign('/action2/UploadPublicFile.ashx', qs.stringify(params))
    },

    // 批量上传开放类图片
    uploadPublicFileBatch(params){
/**/        return fetchSign('/action2/UploadPublicFileBatch.ashx', qs.stringify(params))
    },

    //上传开放类资源base64
    uploadPublicFileBatch(params){
        return fetchSign('/action2/UploadPublicFileBase64.ashx', qs.stringify(params))
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
        return fetch('/action2/AllCity.ashx');
    },

    //保存订阅信息
    subscribeCarBrand(params){
        return fetchSign('/action2/SubscribeCarBrand.ashx',dataToJson(params));
    },

    //获取个人订阅列表
    mySubscribeCarBrand(params){
        return fetchSign('/action2/MySubscribeCarBrand.ashx',dataToJson(params));
    },

    // 删除订阅
    deleteSubscribeCarBrand(params){
        return fetchSign('/action2/deleteSubscribeCarBrand.ashx',dataToJson(params));
    },

    //获取热门车辆品牌
    getHotBrand(params){
        return fetch('/action2/HotCarBrand.ashx',dataToJson(params));
    },

    // 获取所有车辆颜色
    getAllCarColor(){
        return get('/action2/AllCarColor.ashx')
    },

    // 获取微信jsApiTickets
    getWxApiSign(params){
        return fetchSign('/action2/WxJsApiSign.ashx',dataToJson(params))
    },
    
    // 二手车估值
    getCarAppraisement(params){
/**/        return fetchSign('/action2/CarAppraisement.ashx',dataToJson(params));
    },

    

    /*
     * 支付交易金额类
     */
    
    // 各类常规充值(支付)接口
    payAmount(params){
        return fetchSign('/action2/pay/payB2BCreditPoint.ashx',dataToJson(params));
    },

    // 充值接口
    rechargeAmount(params){
        return payFetchSign('/action2/pay/payB2BCreditPoint.ashx',dataToJson(params));
    },

    // 各类金额流水账单
    getBillList(params){
        return fetchSign('/action2/MyB2BCreditPoint.ashx',dataToJson(params));
    },

    // 我的账户金额 
    getUserAccount(params){
        return fetchSign('/action2/UserAccount.ashx',dataToJson(params));
    },

    // 使用余额进行各类支付
    blancePay(params){
        return fetchSign('/action2/BlancePay.ashx',dataToJson(params));
    },

    // 各类提现接口
    withdrawCashApply(params){
        return fetchSign('/action2/WithdrawCashApply.ashx',dataToJson(params));
    },

    // 账单交易详情页
    getBillDetails(params){
        return fetchSign('/action2/TradeDetail.ashx',dataToJson(params));
    },

    // 粉丝返利转到平台余额
    rebate2Balance(params){
/**/        return fetchSign('/action2/Rebate2Balance.ashx',dataToJson(params));
    },

    // 一期提现到二期
    secondPhaseMoneyToTwo(params){
/**/        return fetchSign('/action2/FirstPhaseMoney2SecondPhaseMoney.ashx',dataToJson(params));
    },

    // 支付状态查询
    checkPayStatus(params){
        return fetchSign('/action2/pay/chkPayStatus.ashx',dataToJson(params));
    },



    /*
     * B2B核心业务
     */

    //秒杀立即下单接口
    getAddB2BOrder(params){
        return fetchSign('/action2/addB2BOrder.ashx', dataToJson(params))
    },

    //B2B订单列表
    getB2BOrder(params){
        return fetchSign('/action2/B2BOrder.ashx', dataToJson(params))
    },

    // B2B订单详情
    getB2BOrderDetail(params){
        return fetchSign('/action2/B2BOrderDetail.ashx', dataToJson(params))
    },

    // 卖家发起合同模版需要的内容
    sellerNeedContract(params){
        return fetchSign('/action2/B2BOrderContractNeedInfo.ashx', dataToJson(params))
    },

    // B2B卖家签合同
    signContractSeller(params){
        return fetchSign('/action2/signContractSeller.ashx', dataToJson(params))
    },

    // B2B买家签合同
    signContractBuyer(params){
        return fetchSign('/action2/signContractBuyer.ashx', dataToJson(params))
    },

    // 买家或双方查看合同内容
    orderContractView(params){
        return fetchSign('/action2/OrderContractView.ashx', dataToJson(params))
    },


    // 更改订单状态
    changeB2BOrderStatus(params){
        return fetchSign('/action2/ChangeB2BOrderStatus.ashx', dataToJson(params))
    },

    // 获取当前大厅最后几次推送的消息
    lastHallCarList(params){
/**/        return fetchSign('/action2/LastHallCarList.ashx', dataToJson(params))
    },

    // B2B购物车管理
    manageShoppingCart(params){
        return fetchSign('/action2/ShoppingCartMng.ashx', dataToJson(params))
    },

    // 获取购物车数量
    getMyShoppingCartNumber(){
        let data = {
            ActType: 'MyList',
            PageSize: 1,
            PageIndex:  1
        }
        return fetchSign('/action2/ShoppingCartMng.ashx', dataToJson(data))
    },

    // 车商圈
    carDealerCircle(params){
/**/        return fetchSign('/action2/CarDealerCircle.ashx', dataToJson(params))
    },

    // 平台交易历史记录
    tradeHistory(params){
/**/        return fetchSign('/action2/B2BOrderHistory.ashx', dataToJson(params))
    },

    // 新车商排名（发车量为主）
    carDealerCircleRanking(params){
/**/        return fetchSign('/action2/CarDealerCircleRanking.ashx', dataToJson(params))
    },

    // 车行详情页
    CDGStoreDetails(params){
        return fetchSign('/action2/CDGStore.ashx', dataToJson(params))
    },

    // 合作商车辆推荐给线下客户
    intermediaryShareB2B(params){
/**/        return fetchSign('/action2/IntermediaryShareB2B.ashx', dataToJson(params))
    },

    // 发布同行急求
    pushB2BCarNeed(params){
/**/        return fetchSign('/action2/PushB2BCarNeed.ashx', dataToJson(params))
    },

    // 同行急求列表信息
    B2BCarNeedList(params){
/**/        return fetchSign('/action2/B2BCarNeedList.ashx', dataToJson(params))
    },

    // 置顶|删除|修改 同行急求
    carDealerCircleRanking(params){
/**/        return fetchSign('/action2/PushB2BCarNeed2Top.ashx', dataToJson(params))
    },


    /*
     * 激光推送
     */


    /*
     * 认证类
     */

    // 获取认证详情信息
    getAuthDetails(params){
        return fetchSign('/action2/AuthDetail.ashx',dataToJson(params));
    },

    // 车行信息修改
    cdgEdit(params){
        return fetchSign('/action2/CdgEdit.ashx',dataToJson(params));
    },

    // 车行认证
    authApply(params){
        return fetchSign('/action2/B2BAuthApply.ashx',dataToJson(params));
    },

    //车行认证
    B2BAuthApply(params){
        return fetchSign('/action2/B2BAuthApply.ashx',dataToJson(params))
    },


    /*
     * B2B车辆管理
     */

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

    // 批量刷新在售车源(all代表所有，否则传入以英文,号分隔的CarId)
/**/    batchRefresh(params){
        return fetchSign('/action2/FreshenB2BCar.ashx', dataToJson(params))
    },

    // B2B车辆大厅时间戳后新车数量
/**/    newCarCount(params){
        return fetchSign('/action2/B2BNewCarCount.ashx', dataToJson(params))
    },

    // 车辆报价（b2b意向价）
/**/    quotedPrice(params){
        return fetchSign('/action2/B2BQuotedPrice.ashx', dataToJson(params))
    },

    // 车辆评论留言
/**/    carComment(params){
        return fetchSign('/action2/B2BCarComment.ashx', dataToJson(params))
    },

    // 车辆价格评判(评价系统)
/**/    judgeCarPrice(params){
        return fetchSign('/action2/B2BCarPriceJudge.ashx', dataToJson(params))
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

    // 忘记支付密码
    forgetPayPass(params){
        return fetchSign('/action2/EditPayPassword.ashx',dataToJson(params));
    },

    // 忘记密码（找回密码）
    forgotPassword(params){
        return fetchSign('/action2/ForgotPassword.ashx',dataToJson(params));
    },

    // 更绑手机号
    editMobile(params){
        return fetchSign('/action2/ReplaceMobile.ashx',dataToJson(params));
    },

    // 设置支付密码
    setPayPass(params){
        return fetchSign('/action2/SetPayPassword.ashx',dataToJson(params));
    },

    // 修改支付密码
    editPayPass(params){
        return fetchSign('/action2/ForgotPasswordByOrg.ashx',dataToJson(params));
    },

    // 我的团队&我的粉丝
    myTeam(params){
/**/        return fetchSign('/action2/MyTeam.ashx',dataToJson(params));
    },

    // 意见反馈可用类别
    getFeedback(){
        return fetchSign('/action2/FeedbackType.ashx');
    },

    // 意见反馈提交
    feedbackSubmit(params){
        return fetchSign('/action2/FeedbackSubmit.ashx',dataToJson(params));
    },

    // 我的意见反馈列表
    myFeedbackList(params){
        return fetchSign('/action2/FeedbackList.ashx',dataToJson(params));
    },

    // 获取我的我的个人信息
    getMyMemberInfo(params){
        return fetchSign('/action2/MyMemberInfo.ashx',dataToJson(params));
    },

    // 合作签约合同提交
    signPartnerContract(params){
/**/        return fetchSign('/action2/signPartnerContract.ashx',dataToJson(params));
    },


    /*
     * 收藏夹
     */

    // B2B车商收藏管理
    myFavoriteCdg(params){
        return fetchSign('/action2/FavoriteCdg.ashx',dataToJson(params));
    },

    // B2B车辆收藏管理
    myFavoriteCar(params){
        return fetchSign('/action2/FavoriteB2BCar.ashx',dataToJson(params));
    },

    /*
     * 验证、登录及注册类
     */

    //图形验证码
    imgRandomCode(params){
/**/        return fetch('/action2/ImgRandomCode.ashx', qs.stringify(params))
    },

    //用户登录||(FormData提交方式[qs转换])
    Login(params){
        return fetch('/action2/UserLogin.ashx', qs.stringify(params))
    },

    // 获取手机验证码(语音或者短信)
    getSMSCode(params){
        return fetch('/action2/GetSMSCode.ashx',JSON.stringify(params));
    },

    // 检测手机号是否已经被使用过
    checkMobileCanReg(params){
        return fetchSign('/action2/CheckMobileCanReg.ashx',dataToJson(params));
    },

    // 检测手机号是否已经被使用过
    getOpenId(params){
        return fetchSign('/action2/GetOpenId.ashx',dataToJson(params));
    },

    // 注册
    register(params){
        return fetchSign('/action2/RegUser.ashx',dataToJson(params));
    },

    // 手机加短信登录（无账号自动注册）
    loginByMobile(params){
        return fetchSign('/action2/UserLoginByMobile.ashx',dataToJson(params));
    },
    

    /*
     * 第三方接入
     */
    
    //查违章-支持的省份
    trafficViolationProvince(params){
/**/        return fetch('/action2/TrafficViolationProvince.ashx', qs.stringify(params))
    },

    //查违章-支持的城市及所需要的车架号或发机动
    trafficViolationCity(params){
/**/        return fetch('/action2/TrafficViolationCity.ashx', qs.stringify(params))
    },

    //查违章-查询车辆实际违章
    trafficViolationSearch(params){
/**/        return fetch('/action2/TrafficViolationSearch.ashx', qs.stringify(params))
    },

    //查违章-根据记录编号展示查询记录
    trafficViolationView(params){
/**/        return fetch('/action2/TrafficViolationView.ashx', qs.stringify(params))
    },

    //查违章-我的查询记录列表
    trafficViolationList(params){
/**/        return fetch('/action2/TrafficViolationList.ashx', qs.stringify(params))
    },

    //B2B查保养-创建查询
    XMaintenanceRrecordFree(params){
/**/        return fetch('/action2/XMaintenanceRrecordFree.ashx', qs.stringify(params))
    },

    //B2B查保养-查询列表
    XMaintenanceRrecordFreeList(params){
/**/        return fetch('/action2/XMaintenanceRrecordFreeList.ashx', qs.stringify(params))
    },

    //B2B查保养-查看具体报告
    XMaintenanceRrecordFreeReportShow(params){
/**/        return fetch('/action2/XMaintenanceRrecordFreeReportShow.ashx', qs.stringify(params))
    },


    /*
     * 环信IM
     */


    /*
     * 首页相关
     */
    
    // 获取首页信息
    getHomeInfo(){
        return get('/action2/HomePageInfo.ashx')
    },

    // 猜你喜欢   NewBatch:NewBatch
    getGuessYouLike(){
        if(arguments.length>0){
            return get('/action2/GuessYouLike.ashx?NewBatch='+arguments[0])
        }else{
            return get('/action2/GuessYouLike.ashx')
        }
        
    },

    // 安卓版本
    androidVersion(){
        return get('/action2/AndroidVersion.ashx')
    },

    // 广告帮助等视频
    getAdVideos(){
        return get('/action2/AdvertisementVideo.ashx')
    },
    

}
