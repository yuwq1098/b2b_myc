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
                                <span class="u-price">￥<em class="vital">{{basicInfo.price| priceFormat(2)}}</em>万</span>
                                <span class="u-del">零售价：{{basicInfo.retailPrice| priceFormat(2)}}万</span>
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
                                            <p class="u-tit">{{basicInfo.transferTimes}}次</p>
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
                                            <p class="u-tit">{{basicInfo.inProvince | cityFn}}{{basicInfo.inCity | cityFn}}</p>
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
                                <a class="u-btn v2"
                                    v-if="!otherInfo.isInFavorite"
                                    @click="inMyCollect(basicInfo.id)"
                                    >收藏车辆</a>
                                <a href="javascript:;" class="u-btn not"
                                    v-if="otherInfo.isInFavorite">已收藏</a>
                                <a class="u-btn v3"
                                    v-if="!otherInfo.isInCart"
                                    @click="inShopingCart(basicInfo.id)"
                                    >加入购物车</a>
                                <a href="javascript:;" class="u-btn not"
                                    v-if="otherInfo.isInCart">已加入购物车</a>

                                <!-- <router-link :to="{path : '/payment'}" class="u-btn v3">立即秒杀</router-link> -->
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
                                            <span class="u-val">{{basicInfo.transferTimes}}次</span>
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
                                            <span class="u-val">{{basicInfo.plateDate | dateFn}}</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">出厂日期</span>
                                            <span class="u-val">{{basicInfo.outFactoryDate | dateFn}}</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">牌照归属</span>
                                            <span class="u-val">{{basicInfo.inProvince | cityFn}}{{basicInfo.inCity | cityFn}}</span>
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

                                        <router-link :to="{path:'/merchantDetails',query:{cid:basicInfo.mid}}" class="u-icon" tag="a">
                                            <img :src="otherInfo.faceImgUrl" :alt="otherInfo.cdgName" />
                                        </router-link><!-- 车商商头像 -->

                                        <div class="u-tit">
                                            <router-link :to="{path:'/merchantDetails',query:{cid:basicInfo.mid}}" class="name" tag="a">{{otherInfo.cdgName}}</router-link>
                                            <div class="u-prove" v-if="otherInfo.authType=='企业车行'">车商认证</div><!-- 认证标识 -->
                                           <div class="u-prove" v-else>{{otherInfo.authType}}</div><!-- 认证标识 -->
                                        </div><!-- 车商名字 -->
                                        <div class="u-tel">
                                            <span class="name">{{otherInfo.contacter}}</span>
                                            <span class="tel">{{otherInfo.tel}}</span>
                                            <span class="onSell"
                                                v-if="otherInfo.onSellCount&&otherInfo.onSellCount>0"
                                                >在售<em class="data">{{otherInfo.onSellCount}}</em>辆</span>
                                        </div><!-- 电话 -->
                                        <!-- <div class="u-attention">
                                            <template v-if="!otherInfo.isInFavorite">
                                                <i class="iconfont icon-like"
                                                    @click.stop="setAttention(1,basicInfo.mid)"></i>关注车行
                                            </template>
                                            
                                            <template v-if="otherInfo.isInFavorite">
                                                <i class="iconfont icon-like_fill"
                                                    @click.stop="setAttention(2,basicInfo.mid)"></i>取消关注
                                            </template>
                                            
                                        </div> --><!-- 关注 -->
                                        <div class="u-adss"><span class="tit">车行地址</span>{{otherInfo.address}}</div><!-- 地址 -->
                                        
                                        
                                    </div><!-- 头部 -->
                                    <div class="u-mct-txt">
                                        <span class="tit">车行描述：</span>
                                        <p class="desc">{{otherInfo.desc}}</p>
                                    </div><!-- 文本介绍 -->   
                                </div>
                                
                            </div><!-- 车商认证信息 -->
                        </div>

                    </div><!-- 车辆信息 -->

                    <div class="m-carPhoto" v-if="carImgData.imgItems>=2">
                        <div class="m-box-hd-c">
                            <h3 class="u-tit">车辆图片</h3>
                        </div>


                        <div class="u-photo-con">
                            
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
                    
                    <div class="m-remd">
                        <div class="m-box-hd">
                            <div class="u-adorn"></div><!-- 装饰物 -->
                            <h3 class="u-tit">猜你喜欢</h3>
                        </div>
                        <div class="m-lst-gp-b">
                            <ul class="m-lst f__clearfix">
                                <li class="m-item" v-for="n in 4">
                                    <a href="javascript:;" class="u-box">
                                        <div class="u-pic">
                                            <img src="../../assets/img/car_02.jpg" alt="大众朗逸 2011款 1.6L手动品悠版"/>
                                        </div>
                                        <div class="u-con">
                                            <h5 class="u-tit">
                                                大众朗逸 2011款 1.6L手动品悠版
                                            </h5>
                                            <p class="u-des">南昌/2006年/10.0万里</p>
                                            <div class="u-price">
                                                批发价:<em>5.0万</em>
                                            </div>
                                            <a href="javascript:;" class="u-lk">
                                                <p class="u-count">
                                                    <strong>215</strong>
                                                    次
                                                </p>
                                                <p>围观</p>
                                            </a>
                                        </div>
                                    </a>
                                </li>
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


	export default {
        name: "b2bCarDetails",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
            fcSlide,
        },
        // 数据
        data() {
            return{

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
                }

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
        },
        //退出的生命周期钩子
        deactivated(){
              
        },
        // 数据侦听
        watch:{

        },
        // 属性计算
        computed:{
            // 面包屑列表信息
            crumbItems(){
                if(this.basicInfo){
                    return crumbsInfo['b2bCar'](this.basicInfo.title)
                }
            } 
        },
        methods:{
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
                        // 获取车辆图片列表信息
                        this.fileInfoList = this._normalizeFileList(res.data.CarFiles)
                        // 获取车辆详情基本信息
                        this.otherInfo = this._normalizeOtherInfo(res.data.OtherInfo);

                        //获取车辆图片数据
                        setTimeout(() => {
                            this.carImgData = this.getCarImgsData(this.fileInfoList,this.otherInfo);
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
            //获取车辆图片列表
            getCarImgsData(list,otherInfo){
                let map = {
                    merchantName : "",
                    imgItems:[]
                }
                map.merchantName = otherInfo.cdgName;
                if(list.length<=0) return map;
                list.forEach((item, index) => {
                    if(item.type=="img"){
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
        }
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'b2bCar.styl'
</style>
