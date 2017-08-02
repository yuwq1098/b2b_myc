<template>
	<div class="b2bCarDetails">
	    <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">

                    <gk-bread-crumb
                        :crumbItems="crumbItems"
                        ></gk-bread-crumb><!-- 面包屑组件 -->

                    <div class="m-mn-hd f__clearfix">
                        <div class="f__fl" v-if="carImgData">
                            <fc-slide :carImgData="carImgData"></fc-slide>
                        </div>

                        <div class="m-mn-info f__fr">
                            <div class="m-tit">{{basicInfo.title}}</div>
                            <div class="m-pic f__clearfix">
                                <template v-if="!hasLogin">
                                    <span class="u-txt">未登录</span>
                                </template>
                                <template v-else-if="!hasAuth=='1'">
                                    <span class="u-txt">您尚未通过认证</span>
                                </template>
                                <template v-else-if="!hasCredit">
                                    <span class="u-txt">信誉保证金不足</span>
                                </template>
                                <template v-else>
                                    <span class="u-price">￥<em class="vital">{{basicInfo.price| priceFormat(2)}}</em>万</span>
                                </template>
                                <span class="u-del">零售价：{{basicInfo.retailPrice | priceFormat(2)}}万</span>
                                <!-- <a href="javascript:;" class="u-lk record">
                                    <i class="iconfont icon-activity_fill"></i>查询维修保养记录
                                </a> -->
                                <p class="u-view" v-if="otherInfo.browseCount&&otherInfo.browseCount>0">
                                    <i class="iconfont icon-yuedu"></i>{{otherInfo.browseCount}}
                                </p>
                            </div><!-- 价格 -->
                            <div class="m-des">
                                <div class="m-lst-wrap">
                                    <ul class="m-des-lst f__clearfix">
                                        <li class="u-item">
                                            <p class="u-tit">{{basicInfo.mileage | mileFn(2)}}</p>
                                            <p class="u-des">表显里程</p>
                                        </li>
                                        <li class="u-item">
                                            <p class="u-tit" v-if="basicInfo.transferTimes!='0'">{{basicInfo.transferTimes}}次</p>
                                            <p class="u-tit" v-else>暂无数据</p>
                                            <p class="u-des">过户次数</p>
                                        </li>
                                        <li class="u-item">
                                            <p class="u-tit">{{basicInfo.dischargeStandard}}</p>
                                            <p class="u-des">排放标准</p>
                                        </li>
                                        <li class="u-item">
                                            <p class="u-tit">{{basicInfo.plateDate | dateFn}}</p>
                                            <p class="u-des">上牌时间</p>
                                        </li>
                                        <li class="u-item">
                                            <p class="u-tit">{{basicInfo.plateInProvince | cityFn}}{{basicInfo.plateInCity | cityFn}}</p>
                                            <p class="u-des">牌照归属</p>
                                        </li>
                                        <li class="u-item">
                                            <p class="u-tit">{{basicInfo.serviceType}}</p>
                                            <p class="u-des">使用性质</p>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- 产品描述 -->
                            <!-- <div class="m-intro"></div> --><!-- 说明 -->
                            <div class="m-opra f__clearfix">
                                <template v-if="!hasLogin||!hasAuth=='1'||!hasCredit"
                                    >
                                    <a class="u-btn v2"
                                        @click="judgeHasPrivilege()"
                                        >收藏车辆</a>
                                </template>
                                <template v-else>
                                    <a class="u-btn v2"
                                        v-if="!otherInfo.isInFavorite"
                                        @click="inMyCollect(basicInfo.id)"
                                        >收藏车辆</a>
                                    <a href="javascript:;" class="u-btn not"
                                        v-if="otherInfo.isInFavorite">已收藏</a>
                                </template>
                                

                                <template v-if="!hasLogin||!hasAuth=='1'||!hasCredit"
                                    >
                                    <a class="u-btn"
                                        v-if="!otherInfo.isInCart"
                                        @click="judgeHasPrivilege()"
                                        >加入购物车</a>
                                    <a href="javascript:;" class="u-btn not"
                                        v-if="otherInfo.isInCart">已加入购物车</a>
                                </template>
                                <template v-else>
                                    <a class="u-btn"
                                        v-if="!otherInfo.isInCart"
                                        @click="inShopingCart(basicInfo.id)"
                                        >加入购物车</a>
                                    <a href="javascript:;" class="u-btn not"
                                        v-if="otherInfo.isInCart">已加入购物车</a>
                                </template>

                                <template v-if="hasLogin"
                                    >
                                    <template v-if="!hasAuth=='1'||!hasCredit"
                                    >
                                        <a class="u-btn v3"
                                            v-if="basicInfo.status=='1'"
                                            @click="judgeHasPrivilege()"
                                            >秒杀下单
                                        </a>
                                        <a href="javascript:;" class="u-btn not"
                                            v-else
                                            >秒杀下单
                                        </a>
                                    </template>
                                    <template v-else>
                                        <a class="u-btn v3"
                                            v-if="basicInfo.status=='1'"
                                            @click="addOrder(basicInfo.id)"
                                            >秒杀下单
                                        </a>
                                        <a href="javascript:;" class="u-btn not"
                                            v-else
                                            >秒杀下单
                                        </a>
                                    </template>
                                </template>

                            </div><!-- 操作 -->

                        </div><!-- 主要信息 -->
                    </div><!-- 主要的头部信息 -->

                    <div class="m-car-info">
                        <div class="m-box-hd-c">
                            <h3 class="u-tit">相关信息</h3>
                        </div>
                        <div class="m-mn f__clearfix">
                            <div class="m-basic f__fl">
                                <div class="u-tit">
                                    <span class="txt">车辆基本信息</span>
                                </div>
                                <div class="u-con f__clearfix">
                                    <ul class="u-list f__fl">
                                        <li class="u-item">
                                            <span class="u-attr">表显里程</span>
                                            <span class="u-val">{{basicInfo.mileage | mileFn(2)}}</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">过户次数</span>
                                            <span class="u-val" v-if="basicInfo.transferTimes">{{basicInfo.transferTimes}}次</span>
                                            <span class="u-val" v-else>暂无数据</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">排放标准</span>
                                            <span class="u-val">{{basicInfo.dischargeStandard}}</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">车身颜色</span>
                                            <span class="u-val">{{basicInfo.color}}</span>
                                        </li>
                                    </ul>
                                    <ul class="u-list f__fl">
                                        <li class="u-item">
                                            <span class="u-attr">上牌时间</span>
                                            <span class="u-val" v-if="basicInfo.plateDate">{{basicInfo.plateDate | dateFn}}</span>
                                            <span class="u-val" v-else>暂无数据</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">车辆所在地</span>
                                            <span class="u-val">{{basicInfo.inProvince | cityFn}}{{basicInfo.inCity | cityFn}}</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">牌照归属</span>
                                            <span class="u-val">{{basicInfo.plateInProvince | cityFn}}{{basicInfo.plateInCity | cityFn}}</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">使用性质</span>
                                            <span class="u-val">{{basicInfo.serviceType}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- 基本信息 -->
                            <div class="u-line-y"></div><!-- 垂直分割线 -->
                            <div class="m-merchant f__fr">
                                <div class="m-mct-box">
                                    <div class="m-mct-hd">
                                        
                                        <template v-if="!hasLogin||!hasAuth=='1'||!hasCredit"
                                            >
                                            <a class="u-icon"
                                                @click="judgeHasPrivilege()"
                                                >
                                                <img :src="otherInfo.faceImgUrl" :alt="otherInfo.cdgName" />
                                            </a><!-- 车商商头像 -->
                                        </template>
                                        <template v-else>
                                            <router-link :to="{path:'/merchantDetails',query:{cid:basicInfo.mid}}" class="u-icon" tag="a">
                                                <img :src="otherInfo.faceImgUrl" :alt="otherInfo.cdgName" />
                                            </router-link><!-- 车商商头像 -->
                                        </template>

                                        <div class="u-tit">
                                            <template v-if="!hasLogin||!hasAuth=='1'||!hasCredit"
                                                >
                                                <a class="name" 
                                                    @click="judgeHasPrivilege()">{{otherInfo.cdgName}}
                                                </a>
                                            </template>
                                            <template v-else>
                                                <router-link :to="{path:'/merchantDetails',query:{cid:basicInfo.mid}}" class="name" tag="a">{{otherInfo.cdgName}}</router-link>
                                            </template>
                                            <div class="u-prove">{{otherInfo.authType}}</div><!-- 认证标识 -->
                                        </div><!-- 车商名字 -->
                                        <div class="u-tel">
                                            
                                            <!-- 未认证及保证金不足的用户不允许看车商的信息 -->
                                            <template v-if="!hasLogin||!hasAuth=='1'||!hasCredit"
                                                >
                                                <span class="name">{{otherInfo.contacter | usernameFormat}}</span>
                                                <span class="tel">{{otherInfo.tel | telFormat}}</span>
                                            </template>
                                            <template v-else>
                                                <span class="name">{{otherInfo.contacter}}</span>
                                                <span class="tel">{{otherInfo.tel}}</span>
                                            </template>
                                            
                                            <span class="onSell"
                                                v-if="otherInfo.onSellCount&&otherInfo.onSellCount>0"
                                                >在售<em class="data">{{otherInfo.onSellCount}}</em>辆</span>
                                        </div><!-- 电话 -->

                                        <div class="u-adss"><span class="tit">车行地址</span>{{otherInfo.address | addressFormat}}</div><!-- 地址 -->
                                        
                                        
                                    </div><!-- 头部 -->
                                    <div class="u-mct-txt">
                                        <span class="tit">车行描述：</span>
                                        <p class="desc">{{otherInfo.desc}}</p>
                                    </div><!-- 文本介绍 -->   
                                </div>
                                
                            </div><!-- 车商认证信息 -->
                        </div>

                    </div><!-- 车辆信息 -->

                    <div class="m-carPhoto" 
                        v-if="carImgData.imgItems&&carImgData.imgItems.length>=2"
                        >
                        <div class="m-box-hd-c">
                            <h3 class="u-tit">车辆图片</h3>
                        </div>
                        <div class="m-photo-con">
                            <ul class="m-photo-lst f__clearfix">
                                <template v-for="(item,index) in carImgData.imgItems">
                                    <li class="m-item">
                                        <div class="u-pic">
                                            <img :src="item.fileUrl" :alt="item.title" />
                                        </div>
                                    </li>
                                </template>
                            </ul>    
                        </div><!-- 图片内容 -->
                    </div><!-- 车辆图片信息 -->

                    <div class="m-process">
                        <div class="m-box-hd-c">
                            <h3 class="u-tit">购车流程</h3>
                        </div>
                        <div class="u-pic">
                            <img :src="buyCarFlowImg" alt="购车流程图" />
                        </div>
                    </div><!-- 购车流程 -->
                    
                    <div class="m-remd" v-show="similarList&&similarList.length>0">
                        <!-- <div class="m-box-hd">
                            <div class="u-adorn"></div>装饰物
                            <h3 class="u-tit">相似推荐</h3>
                        </div> -->
                        <div class="m-box-hd-c">
                            <h3 class="u-tit">相似推荐</h3>
                        </div>
                        <div class="m-lst-gp-b">
                            <ul class="m-lst f__clearfix">
                                <remd-list-box
                                    :carList="similarList"
                                    >
                                </remd-list-box>
                            </ul>
                        </div><!-- 列表组b -->
                    </div><!-- 相似推荐 -->

                    <div class="m-remd" v-show="!similarList||similarList.length==0">
                        <div class="m-box-hd-c">
                            <h3 class="u-tit">相似推荐</h3>
                        </div>
                        <div class="m-lst-gp-b">
                            <ul class="m-lst f__clearfix">
                                <remd-list-box
                                    :carList= "b2bCarList"
                                    >
                                </remd-list-box>
                            </ul>
                        </div><!-- 列表组b -->
                    </div><!-- 相似推荐 -->

                </section><!-- 1200px布局 -->
            </div><!-- 网页主体 -->
		</div>
	</div>
</template>

<script>

    // 引入jq
    import $ from "jquery"
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import { mapGetters,mapActions } from 'vuex'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 车行信息的构造类
    import {basicInfo,carDetails,fileInfoList,otherInfo} from 'base/class/carDetails.js'

    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"

    // 双向控制焦点图组件
    import fcSlide from "components/slide/fc_slide.vue"

    // b2b车辆信息构造类
    import {b2bCarInfo} from "base/class/carInfo.js"
    // 相似推荐信息列表盒子
    import remdListBox from "components/boxLayout/remdListBox.vue"


	export default {
        name: "b2bCarDetails",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
            fcSlide,
            remdListBox,
        },
        // 数据
        data() {
            return{

                // 是否登录
                hasLogin: "",
                // 是否认证
                hasAuth: "",
                // 是否有足额的信誉保证金
                hasCredit: "",

                // 车辆ID
                carId: 0,
                
                // 流程图
                buyCarFlowImg: require("assets/img/img-flow.png"),

                // 车辆基本信息
                basicInfo:{},
                // 车况信息列表
                carDetails: [],
                // 文件列表
                fileInfoList:[],
                // 其他信息
                otherInfo:{},
                
                // 车辆图片信息
                carImgData:{
                    merchantName : "暂无数据",
                    imgItems:[]
                },
                
                // 相似推荐列表
                similarList: [],
                // 车辆列表
                b2bCarList: [],                       
            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){

            // 获取hash 带参中的车辆ID
            this.carId = this.$router.currentRoute.query.CarId;

            // 获取车辆信息
            this.getCarDetailsInfo();
            
            // 获取车辆列表信息
            this.getCarList();

        },
        //退出的生命周期钩子
        deactivated(){
            
        },
        // 数据侦听
        watch:{

            // 侦听路由变化
            $route (to, from) {

                // if(to.path=="/b2bCar"){
                if(to.path==from.path){
                    // 获取hash 带参中的车辆ID
                    this.carId = to.query.CarId;
                    // 获取车辆信息
                    this.getCarDetailsInfo();
                    // 获取车辆列表信息
                    this.getCarList();
                }else{
                    this.$destroy();
                }
            },

            // 侦听登录状态
            loginStatus(val){
                // 获取用户信息
                this.getCarDetailsInfo();
                
            },

        },
        // 属性计算
        computed:{
            ...mapGetters(['loginStatus']),
            // 面包屑列表信息
            crumbItems(){
                if(this.basicInfo){
                    return crumbsInfo['b2bCar'](this.basicInfo.title)
                }
            },
        },
        methods:{
            ...mapActions(['getMyShoppingNumber']),

            // 判断是不是有相关的权限
            judgeHasPrivilege(){
                let bool = !this.hasLogin==""||this.hasAuth=="1"||!this.hasCredit;
                if(!bool) return;
                if(!this.hasLogin){
                    this.$notify({
                        title: '您尚未登录',
                        message: "请先登录，登录后可进行相关操作",
                        type: 'error',
                        duration: 2000,
                    });
                }else if(!this.hasAuth=='1'){
                    this.$confirm('尊贵的用户，您好！通过认证并交纳一定的保证金，方可在我司平台办理业务，谢谢！', '您尚未通过认证', {
                        confirmButtonText: '前往认证',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 前往车行认证页面
                        this.$router.push({path:'/member/applyHome'});
                    }).catch(() => {
                        
                    });
                }else if(!this.hasCredit){
                    this.$confirm('尊贵的用户，您好！您的保证金余额不足'+SYSTEM.MIN_CREDIT_GOLD+'元，我司部分业务无法为您展开，请前往充值！', '保证金不足', {
                        confirmButtonText: '前往充值',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 前往保证金充值页面
                        this.$router.push({path:'/member/recharge',query:{type:2}});
                    }).catch(() => {
                        
                    });
                }
            },

            // 格式化车辆基本信息
            _normalizeBasicInfo(data) {
                return new basicInfo(data);
            },

            // 格式化车辆文件列表
            _normalizeFileList(list) {
                let arr = [];
                list.forEach((item,index) => {
                    arr.push(new fileInfoList(item));
                })
                return arr;
            },

            // 格式化车辆其他信息
            _normalizeOtherInfo(data) {
                return new otherInfo(data);
            },

            // 获取车辆详情信息
            getCarDetailsInfo(){
                var data = {
                    CarId : this.carId,
                }
                api.getCarDetalis(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        
                        // 获取车辆详情基本信息
                        this.basicInfo = this._normalizeBasicInfo(res.data.CarInfo)
                        console.log(dataToJson(this.basicInfo))

                        // 车辆异常状态提示
                        this.abnormalStatusTips(this.basicInfo.status);

                        // 获取车辆图片列表信息
                        this.fileInfoList = this._normalizeFileList(res.data.CarFiles)
                        // 获取车辆其他相关信息
                        this.otherInfo = this._normalizeOtherInfo(res.data.OtherInfo);

                        // 获取权限相关的信息
                        this.hasLogin = res.HasLogin;
                        this.hasAuth = res.HasAuth;
                        this.hasCredit = res.HasCredit;

                        //获取车辆图片数据
                        setTimeout(() => {
                            this.carImgData = this.getCarImgsData(this.fileInfoList,this.otherInfo);
                            // 获取相似推荐数据
                            this.similarList = this._normalizeB2bCarInfo(res.data.SimilarRecommend)
                        })

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },
            
            // 车辆异常状态提示
            abnormalStatusTips(status){
                
                // 提示类型
                let tipsType = "";
                // 提示状态
                let tipsStatus = "";

                switch(status){
                    case 1:       // 在售
                        tipsType = "success";
                        break;
                    case -1:      // 已下架
                        tipsType = "1";
                        tipsStatus = "已下架"
                        break;
                    case 0:       // 审核中
                        tipsType = "1";
                        tipsStatus = "正在审核中"
                        break;
                    case 2:       // 交易中
                        tipsType = "2";
                        tipsStatus = "正在交易中"
                        break;
                    case 3:       // 交易成功
                        tipsType = "1";
                        tipsStatus = "已成功交易"
                        break;
                    case -2:      // 审核失败
                        tipsType = "1";
                        tipsStatus = "未通过审核"
                        break;
                }

                setTimeout(()=>{
                    // 如果该车辆在售，啥也不提示
                    if(tipsType=="success") return;
                    if(tipsType=="1"){
                        this.$alert('很抱歉，该车辆的信息或无效或过期，我们希望您尝试访问别的车辆信息', '此车源'+tipsStatus, {
                            confirmButtonText: '我知道了',
                            type: 'error',
                            callback: () => {
                                this.$router.go(-1);
                            }
                        });
                    }else if(tipsType=="2"){
                        this.$alert('该车源正在交易中，您可以继续查看车辆详情，但您无购买权限', '此车源'+tipsStatus, {
                            confirmButtonText: '我知道了',
                            type: 'warning',
                            callback: () => {
                                return;
                            }
                        });
                    }
                })
                
            },

            // 获取车辆图片列表
            getCarImgsData(list,otherInfo){
                let map = {
                    merchantName : "",
                    imgItems:[]
                }
                map.merchantName = otherInfo.cdgName;
                if(list.length<=0) return map;
                list.forEach((item, index) => {
                    if(item.type=="img"&&item.groupName=="车辆照片"){
                        map.imgItems.push(item)
                    }
                });
                return map;
            },

            // 关注和取消关注的事件
            setAttention(type,id){
                let act = "";
                if(type==1){
                    act="Add";
                }else{
                    act="Delete"
                }
                
                let data = {
                    ActType: act,
                    SellerId: id
                }
                
                // 关注和取消关注
                api.myFavoriteCdg(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 假刷新
                        if(type==1){
                            this.otherInfo.isInFavorite = true;
                        }else{
                            this.otherInfo.isInFavorite = false;
                        }

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '操作失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 加入购物车
            inShopingCart(id){
                let data = {
                    ActType: 'Add',
                    CarId: id,
                }
                api.manageShoppingCart(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.otherInfo.isInCart = true;
                        // 重新获取购物车内车辆数量
                        this.getMyShoppingNumber();
                        this.$notify({
                            title: '成功加入购物车',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '加入购物车失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 加入车辆收藏
            inMyCollect(id){
                let data = {
                    ActType: 'Add',
                    CarId: id,
                }
                api.myFavoriteCar(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.otherInfo.isInFavorite = 1;
                        this.$notify({
                            title: '车辆收藏成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '车辆收藏失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },
            
            // 下单
            addOrder(carId){

                this.$alert(
                        `1.点击“立即秒杀”键之前，请与卖方对接车况，谈好成交价格
                         2.一旦确认“立即秒杀”，任何一方反悔，将自动扣除信誉保证金200元给守约方`
                        , '温馨提示', {
                        confirmButtonText: '立即秒杀',
                        type: 'warning',
                    }).then(() => {
                        this.$confirm('点击“确认秒杀”后，平台将锁定双方信誉保证金，同时该车辆也将被锁定，并显示正在交易中，卖家将发送电子购车合同，请认真考虑后下单！', '秒杀下单提示', {
                                confirmButtonText: '确认秒杀',
                                cancelButtonText: '再考虑看看',
                                type: 'warning'
                            }).then(() => {
                                this.putB2BOrder(carId);
                            }).catch(() => {
                                
                            });
                    }).catch(() => {
                        return;
                    });
                
            },
            
            // 提交下单申请
            putB2BOrder(carId){
                let data = {
                    CarId: carId,
                }
                api.getAddB2BOrder(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '下单成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                        this.basicInfo.status = "2";
                        setTimeout(()=>{
                            this.$router.push({path:'/member/buyOrder'})
                        },300)
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '下单失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },
            
            // 获取车辆信息
            getCarList(){
                let data = {
                    PageIndex : '1',
                    PageSize: '4',
                }
                api.getB2BCarList(data).then((res) => {
                    this.b2bCarList = this._normalizeB2bCarInfo(res.data)
                });
            },

            //使用b2b抽象类完成carInfo
            _normalizeB2bCarInfo(list){
                let carInfo = [];
                list.forEach((item, index) => {
                    carInfo.push(new b2bCarInfo(item))
                });
                return carInfo;
            },
        }
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'b2bCar.styl'
</style>
